// FeaturedPosts.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BlogPost } from './BlogCard';
import { BlogCard } from './BlogCard';

interface FeaturedPostsProps {
  posts: BlogPost[];
}

export const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.slice(0, 3).map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <BlogCard
            post={post}
            isHovered={hoveredPost === post.id}
            onHover={(id) => setHoveredPost(id)}
          />
        </motion.div>
      ))}
    </div>
  );
};