import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BLOG_API_BASE = "https://yupland.devshowcase.io/wp-json/wp/v2/posts";

// Race-condition guard: sirf latest request ka result state mein aaye,
// purani (slow) response agar late aaye to usse ignore kar do.
let latestRequestId = 0;

const decodeHtmlEntities = (text) => {
  if (typeof document === "undefined") return text;
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
    content: post.content?.rendered || "",
    image: imageUrl,
    link: post.link,
    categories,
  };
};

// ---------- Thunks ----------

// NAYA: ab ye sirf EK PAGE fetch karta hai, WordPress ke apne
// page/per_page/search params ke saath. Poora dataset kabhi download nahi hota.
export const fetchBlogsPage = createAsyncThunk(
  "blogs/fetchBlogsPage",
  async ({ page = 1, perPage = 6, search = "" } = {}) => {
    const requestId = ++latestRequestId;

    const params = new URLSearchParams({
      _embed: "",
      page: String(page),
      per_page: String(perPage),
      orderby: "date",
      order: "desc",
    });
    if (search) params.set("search", search);

    const response = await axios.get(`${BLOG_API_BASE}?${params.toString()}`);
    const totalPages = Number(response.headers?.["x-wp-totalpages"]) || 1;
    const totalItems = Number(response.headers?.["x-wp-total"]) || response.data.length;

    return {
      requestId,
      page,
      posts: response.data.map(transformPost),
      totalPages,
      totalItems,
    };
  }
);

// Home page ke liye — sirf latest 4, alag se, kabhi bhi search/pagination se affect nahi hota
export const fetchFeaturedBlogs = createAsyncThunk(
  "blogs/fetchFeaturedBlogs",
  async (_arg, { getState }) => {
    const response = await axios.get(
      `${BLOG_API_BASE}?_embed&page=1&per_page=4&orderby=date&order=desc`
    );
    return { posts: response.data.map(transformPost) };
  },
  {
    condition: (_arg, { getState }) => {
      const { featuredFetched, featuredLoading } = getState().blogs;
      if (featuredFetched || featuredLoading) return false;
      return true;
    },
  }
);

export const fetchBlogBySlug = createAsyncThunk(
  "blogs/fetchBlogBySlug",
  async (slug) => {
    const response = await axios.get(
      `${BLOG_API_BASE}?slug=${encodeURIComponent(slug)}&_embed`
    );
    if (!response.data || response.data.length === 0) {
      throw new Error("Blog not found");
    }
    return { slug, post: transformFullPost(response.data[0]) };
  },
  {
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
    // Current page ke posts (server-side paginated + searched)
    items: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    searchTerm: "",

    // Home page ke liye alag chhota cache
    featured: [],
    featuredLoading: false,
    featuredError: null,
    featuredFetched: false,

    bySlug: {},
    bySlugLoading: {},
    bySlugError: {},
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1; // naya search => page 1
    },
    resetBlogList: (state) => {
      state.currentPage = 1;
      state.searchTerm = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogsPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogsPage.fulfilled, (state, action) => {
        // Stale response? ignore karo
        if (action.payload.requestId !== latestRequestId) return;
        state.loading = false;
        state.items = action.payload.posts;
        state.totalPages = action.payload.totalPages;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBlogsPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchFeaturedBlogs.pending, (state) => {
        state.featuredLoading = true;
        state.featuredError = null;
      })
      .addCase(fetchFeaturedBlogs.fulfilled, (state, action) => {
        state.featuredLoading = false;
        state.featured = action.payload.posts;
        state.featuredFetched = true;
      })
      .addCase(fetchFeaturedBlogs.rejected, (state, action) => {
        state.featuredLoading = false;
        if (!action.meta.condition) {
          state.featuredError = action.error.message;
        }
      })

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

// ---------- Selectors ----------
export const selectFeaturedBlogs = (state) => state.blogs.featured;
export const selectBlogBySlug = (slug) => (state) => state.blogs.bySlug[slug];
export const selectBlogBySlugLoading = (slug) => (state) =>
  Boolean(state.blogs.bySlugLoading[slug]);
export const selectBlogBySlugError = (slug) => (state) =>
  state.blogs.bySlugError[slug];