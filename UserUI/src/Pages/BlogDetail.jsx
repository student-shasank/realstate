import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogBySlug,
  selectBlogBySlug,
  selectBlogBySlugLoading,
  selectBlogBySlugError,
} from "../features/dashboard/Blogslice.jsx";
import Seo from "../Components/Seo.jsx";

function BlogDetail() {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const post = useSelector(selectBlogBySlug(slug));
  const loading = useSelector(selectBlogBySlugLoading(slug));
  const error = useSelector(selectBlogBySlugError(slug));

  // `fetchBlogBySlug` ke andar condition guard hai — agar ye slug pehle se
  // cache me hai (list se click karke aaye the), to dobara fetch nahi hoga.
  useEffect(() => {
    dispatch(fetchBlogBySlug(slug));
  }, [dispatch, slug]);

  if (loading && !post) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-5 mt-20 text-center text-xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-5 mt-20 text-center text-xl text-red-500">
        Blog nahi mila. {error}
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="max-w-3xl mx-auto py-16 px-5 mt-20">
      <Seo
        title={`${post.title} | Yupland`}
        description={post.title}
        canonicalPath={`/MarketInsigts/${post.slug}`}
      />

      <Link to="/MarketInsigts" className="text-[#01155E] font-medium mb-6 inline-block">
        ← Back to blogs
      </Link>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-[320px] sm:h-[420px] object-cover rounded-2xl mb-8"
        />
      )}

      <h1 className="text-3xl sm:text-4xl font-bold text-[#01155E] mb-4">
        {post.title}
      </h1>

      <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
        {post.author && <span>{post.author}</span>}
        <span>•</span>
        <span>{post.date}</span>
        <span>•</span>
        <span>{post.readTime}</span>
      </div>

      {post.categories?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.categories.map((cat) => (
            <span
              key={cat}
              className="text-xs bg-gray-100 text-[#01155E] px-3 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>
      )}

      {/* WordPress se aaya trusted HTML hai, isliye dangerouslySetInnerHTML use ho raha hai */}
      <div
        className="prose max-w-none text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}

export default BlogDetail;