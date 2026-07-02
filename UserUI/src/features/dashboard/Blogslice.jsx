import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BLOG_API_BASE = "https://yupland.devshowcase.io/wp-json/wp/v2/posts";

// ---------- Helpers ----------

// HTML entities decode + tags strip karke clean description banata hai
const decodeHtmlEntities = (text) => {
  if (typeof document === "undefined") return text; // SSR safety
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

const transformPost = (post) => {
  const imageUrl =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

  const cleanDescription =
    decodeHtmlEntities(
      (post.excerpt?.rendered || "").replace(/<[^>]+>/g, "")
    ).trim().substring(0, 150) + "...";

  return {
    id: post.id,
    slug: post.slug,
    author: post._embedded?.author?.[0]?.name || "Architect",
    date: new Date(post.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    readTime: `${Math.ceil((post.content?.rendered?.length || 0) / 200)} min read`,
    title: decodeHtmlEntities(post.title?.rendered || ""),
    description: cleanDescription,
    image: imageUrl,
    link: post.link,
  };
};

// Detail page ke liye — poora content.rendered rakhta hai (truncate NAHI karta),
// plus categories/tags names bhi nikaal leta hai agar _embed se aaye hain.
const transformFullPost = (post) => {
  const imageUrl =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";

  const categories =
    post._embedded?.["wp:term"]?.[0]?.map((cat) => cat.name) || [];

  return {
    id: post.id,
    slug: post.slug,
    author: post._embedded?.author?.[0]?.name || "Architect",
    date: new Date(post.date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    readTime: `${Math.ceil((post.content?.rendered?.length || 0) / 200)} min read`,
    title: decodeHtmlEntities(post.title?.rendered || ""),
    content: post.content?.rendered || "", // 👈 poora HTML, truncate nahi
    image: imageUrl,
    link: post.link,
    categories,
  };
};

// ---------- Thunks ----------

// Saare blogs EK BAAR fetch karo — chahe FeaturedBlogs ho ya Contact page, dono isi
// thunk ko dispatch karenge. `condition` ki wajah se agar data pehle se fetched hai
// ya fetch already in-progress hai, to naya network call NAHI jaayega (RTK isko
// automatically skip kar deta hai aur pending/fulfilled bhi fire nahi hote).
export const fetchAllBlogs = createAsyncThunk(
  "blogs/fetchAllBlogs",
  async ({ perPage = 100 } = {}) => {
    const firstResponse = await axios.get(
      `${BLOG_API_BASE}?_embed&page=1&per_page=${perPage}&orderby=date&order=desc`
    );

    const totalPages = Number(firstResponse.headers?.["x-wp-totalpages"]) || 1;

    let allPosts = [...firstResponse.data];

    if (totalPages > 1) {
      const remainingPageRequests = [];
      for (let page = 2; page <= totalPages; page++) {
        remainingPageRequests.push(
          axios.get(
            `${BLOG_API_BASE}?_embed&page=${page}&per_page=${perPage}&orderby=date&order=desc`
          )
        );
      }
      const remainingResponses = await Promise.all(remainingPageRequests);
      remainingResponses.forEach((res) => {
        allPosts = allPosts.concat(res.data);
      });
    }

    return {
      posts: allPosts.map(transformPost),
    };
  },
  {
    // Yahi asli fix hai duplicate calls ke liye:
    // Agar already fetched hai (allFetched) ya abhi fetch chal raha hai (allLoading),
    // to is dispatch ko silently skip kar do — koi extra API hit nahi hogi.
    condition: (_arg, { getState }) => {
      const { allLoading, allFetched } = getState().blogs;
      if (allLoading || allFetched) return false;
      return true;
    },
  }
);

// Single blog detail page ke liye — slug se ek hi post fetch karta hai.
// WordPress REST API slug filter se array return karta hai (1 item), isliye
// pehla item nikaal rahe hain.
export const fetchBlogBySlug = createAsyncThunk(
  "blogs/fetchBlogBySlug",
  async (slug) => {
    const response = await axios.get(
      `${BLOG_API_BASE}?slug=${encodeURIComponent(slug)}&_embed`
    );

    if (!response.data || response.data.length === 0) {
      throw new Error("Blog not found");
    }

    return {
      slug,
      post: transformFullPost(response.data[0]),
    };
  },
  {
    // Agar ye slug already cache me hai (bySlug), to dobara fetch mat karo —
    // list se click karke aaye ya back button se, dono baar cache se hi milega.
    condition: (slug, { getState }) => {
      const { bySlug, bySlugLoading } = getState().blogs;
      if (bySlug[slug] || bySlugLoading[slug]) return false;
      return true;
    },
  }
);

// ---------- Slice ----------

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    // Saare blogs, ek hi baar fetch hoke cache ho jaate hain
    all: [],
    allLoading: false,
    allError: null,
    allFetched: false,

    // Contact page ki client-side pagination/search state
    currentPage: 1,
    searchTerm: "",

    // Single blog detail page ka cache — key = slug, value = full post data
    bySlug: {},
    bySlugLoading: {}, // key = slug, value = boolean (fetch in-progress hai ya nahi)
    bySlugError: {}, // key = slug, value = error message
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // naya search hote hi page 1 pe reset
    },
    resetBlogList: (state) => {
      state.currentPage = 1;
      state.searchTerm = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBlogs.pending, (state) => {
        state.allLoading = true;
        state.allError = null;
      })
      .addCase(fetchAllBlogs.fulfilled, (state, action) => {
        state.allLoading = false;
        state.all = action.payload.posts;
        state.allFetched = true;
      })
      .addCase(fetchAllBlogs.rejected, (state, action) => {
        state.allLoading = false;
        // condition false hone par bhi RTK ek "rejected" action fire karta hai
        // with meta.condition = true — usko error na maano.
        if (!action.meta.condition) {
          state.allError = action.error.message;
        }
      })

      // Single blog by slug
      .addCase(fetchBlogBySlug.pending, (state, action) => {
        const slug = action.meta.arg;
        state.bySlugLoading[slug] = true;
        state.bySlugError[slug] = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        const { slug, post } = action.payload;
        state.bySlugLoading[slug] = false;
        state.bySlug[slug] = post;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        const slug = action.meta.arg;
        state.bySlugLoading[slug] = false;
        if (!action.meta.condition) {
          state.bySlugError[slug] = action.error.message;
        }
      });
  },
});

export const { setCurrentPage, setSearchTerm, resetBlogList } = blogSlice.actions;
export default blogSlice.reducer;

// ---------- Selectors (client-side derive — koi extra API call nahi) ----------

// Home page section: latest 4 blogs
export const selectFeaturedBlogs = (state) => state.blogs.all.slice(0, 4);

// Contact page: search se filter kiya hua list
export const selectFilteredBlogs = (state) => {
  const { all, searchTerm } = state.blogs;
  if (!searchTerm) return all;
  const term = searchTerm.toLowerCase();
  return all.filter(
    (post) =>
      post.title.toLowerCase().includes(term) ||
      post.description.toLowerCase().includes(term)
  );
};

// Contact page: filtered list ka current page ka slice
export const selectPaginatedBlogs = (perPage) => (state) => {
  const filtered = selectFilteredBlogs(state);
  const { currentPage } = state.blogs;
  const start = (currentPage - 1) * perPage;
  return filtered.slice(start, start + perPage);
};

// Contact page: filtered list ke hisaab se total pages
export const selectTotalPages = (perPage) => (state) => {
  const filtered = selectFilteredBlogs(state);
  return Math.max(1, Math.ceil(filtered.length / perPage));
};

// Detail page: ek specific slug ka poora post data
export const selectBlogBySlug = (slug) => (state) => state.blogs.bySlug[slug];
export const selectBlogBySlugLoading = (slug) => (state) =>
  Boolean(state.blogs.bySlugLoading[slug]);
export const selectBlogBySlugError = (slug) => (state) =>
  state.blogs.bySlugError[slug];