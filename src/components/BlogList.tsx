import React, { useEffect, useState } from 'react';
import { getRecentBlogPosts, type BlogPost } from '../lib/firestore';

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetched = await getRecentBlogPosts(10);
        setPosts(fetched);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="py-12 text-center text-slate-500">Loading new signals...</div>;
  }

  if (posts.length === 0) {
    return null; // Don't show anything if no Firestore posts
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-16">
      {posts.map((post) => (
        <article key={post.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
          {post.coverImage && (
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-6">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
              <time dateTime={post.publishedAt?.toDate().toISOString()}>
                {post.publishedAt?.toDate().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
              {post.category && (
                <>
                  <span>•</span>
                  <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded text-xs">
                    {post.category}
                  </span>
                </>
              )}
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-3 leading-tight">
              {/* Note: We need a dynamic route for these firestore posts */}
              <a href={`/blog/view?slug=${post.slug}`} className="hover:text-primary-600 transition-colors">
                {post.title}
              </a>
            </h2>
            <p className="text-slate-600 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <a 
              href={`/blog/view?slug=${post.slug}`}
              className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center gap-1"
            >
              Read Analysis <span aria-hidden="true">→</span>
            </a>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BlogList;
