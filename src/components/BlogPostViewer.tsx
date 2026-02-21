import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db, type BlogPost } from '../lib/firestore';
import ReactMarkdown from 'react-markdown';

const BlogPostViewer: React.FC = () => {
  const [post, setPost] = useState<BlogPost & { content?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('slug');

        if (!slug) {
          setError('No post specified.');
          setLoading(false);
          return;
        }

        const blogRef = collection(db, 'blogPosts');
        const q = query(
          blogRef, 
          where('slug', '==', slug), 
          where('status', '==', 'published'),
          limit(1)
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setError('Post not found.');
        } else {
          const doc = snapshot.docs[0];
          const data = doc.data();
          setPost({ 
            id: doc.id, 
            ...data,
            coverImage: data.image, // Map image -> coverImage
            excerpt: data.description // Map description -> excerpt
          } as BlogPost & { content?: string });
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load post.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  if (loading) return (
    <div className="container py-20 text-center animate-pulse">
      <div className="h-8 bg-slate-200 w-1/3 mx-auto mb-4 rounded"></div>
      <div className="h-4 bg-slate-100 w-1/2 mx-auto rounded"></div>
    </div>
  );

  if (error || !post) return (
    <div className="container py-20 text-center">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Signal Lost</h1>
      <p className="text-slate-600">{error || "This post doesn't exist."}</p>
      <a href="/blog" className="mt-6 inline-block text-primary-600 hover:underline">← Return to Signal Feed</a>
    </div>
  );

  return (
    <article className="max-w-4xl mx-auto px-4 py-16 md:py-24">
      <header className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-6">
          <time dateTime={post.publishedAt?.toDate().toISOString()}>
            {post.publishedAt?.toDate().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          {post.category && (
            <>
              <span className="text-slate-300">•</span>
              <span className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                {post.category}
              </span>
            </>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </header>

      {post.coverImage && (
        <div className="mb-12 rounded-2xl overflow-hidden shadow-lg border border-slate-100">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg prose-slate mx-auto prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-primary-600 hover:prose-a:text-primary-700 prose-img:rounded-xl">
        {post.content ? (
          <ReactMarkdown>{post.content}</ReactMarkdown>
        ) : (
          <p className="italic text-slate-500 text-center">No content content available.</p>
        )}
      </div>

      <div className="mt-16 pt-8 border-t border-slate-200 text-center">
        <a href="/blog" className="text-slate-600 font-medium hover:text-primary-600 transition-colors">
          ← Back to Engineering Logs
        </a>
      </div>
    </article>
  );
};

export default BlogPostViewer;
