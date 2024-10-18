// BlogLandingPage.tsx
'use client';
import React from 'react';
import { blogPosts } from '../constants';
import { FeaturedPosts } from '@/components/cards/FeaturedPosts';
import { BlogCard } from '@/components/cards/BlogCard';
import { BlogPost } from '@/components/cards/BlogCard';

const BlogSection: React.FC<{ title: string; posts: BlogPost[]; isFeatured?: boolean }> = ({
  title,
  posts,
  isFeatured,
}) => (
  <section className={isFeatured ? 'mb-16' : ''}>
    <h2 className="text-3xl font-semibold text-magenta mb-8">{title}</h2>
    {isFeatured ? (
      <FeaturedPosts posts={posts} />
    ) : (
      <div className="space-y-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} isHovered={false} onHover={() => {}} />
        ))}
      </div>
    )}
  </section>
);

const BlogLandingPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-magenta text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover insights on the job market, tips on how to advance your career, and the latest
            updates to our referrals platform.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <BlogSection title="Featured Posts" posts={blogPosts} isFeatured />
        <BlogSection title="Recent Posts" posts={blogPosts} />
      </main>

      <footer className="bg-magenta py-8 mt-16">
        <div className="container mx-auto px-6 text-center text-white">
          <p>&copy; 2024 Your Company Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogLandingPage;