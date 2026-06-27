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

// ---------- Thunks ----------

// 1. Featured blogs (home section) - sirf latest 4
export const fetchFeaturedBlogs = createAsyncThunk(
  "blogs/fetchFeaturedBlogs",
  async () => {
    const response = await axios.get(
      `${BLOG_API_BASE}?_embed&per_page=4&orderby=date&order=desc`
    );

    const totalPages = Number(response.headers?.["x-wp-totalpages"]) || 1;

    return {
      posts: response.data.map(transformPost),
      totalPages,
    };
  }
);

// 2. Listing page (contact/blog page) - paginated, sare blogs
export const fetchBlogList = createAsyncThunk(
  "blogs/fetchBlogList",
  async ({ page = 1, perPage = 12, search = "" } = {}) => {
    const url = search
      ? `${BLOG_API_BASE}?_embed&page=${page}&per_page=${perPage}&search=${encodeURIComponent(search)}`
      : `${BLOG_API_BASE}?_embed&page=${page}&per_page=${perPage}`;

    const response = await axios.get(url);

    const totalPages = Number(response.headers?.["x-wp-totalpages"]) || 1;
    const totalPosts = Number(response.headers?.["x-wp-total"]) || 0;

    return {
      posts: response.data.map(transformPost),
      totalPages,
      totalPosts,
      page,
    };
  }
);

// ---------- Slice ----------

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    // Featured (home section) state
    featured: [],
    featuredLoading: false,
    featuredError: null,

    // Listing (contact page) state
    list: [],
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
    listLoading: false,
    listError: null,

    // search
    searchTerm: "",
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
      state.list = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.totalPosts = 0;
      state.listError = null;
      state.searchTerm = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Featured blogs
      .addCase(fetchFeaturedBlogs.pending, (state) => {
        state.featuredLoading = true;
        state.featuredError = null;
      })
      .addCase(fetchFeaturedBlogs.fulfilled, (state, action) => {
        state.featuredLoading = false;
        state.featured = action.payload.posts;
      })
      .addCase(fetchFeaturedBlogs.rejected, (state, action) => {
        state.featuredLoading = false;
        state.featuredError = action.error.message;
      })

      // Blog list (paginated)
      .addCase(fetchBlogList.pending, (state) => {
        state.listLoading = true;
        state.listError = null;
      })
      .addCase(fetchBlogList.fulfilled, (state, action) => {
        state.listLoading = false;
        state.list = action.payload.posts;
        state.totalPages = action.payload.totalPages;
        state.totalPosts = action.payload.totalPosts;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchBlogList.rejected, (state, action) => {
        state.listLoading = false;
        state.listError = action.error.message;
      });
  },
});

export const { setCurrentPage, setSearchTerm, resetBlogList } = blogSlice.actions;
export default blogSlice.reducer;