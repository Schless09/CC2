// BlogCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  link: string;
}

interface BlogCardProps {
  post: BlogPost;
  isHovered: boolean;
  onHover: (id: number | null) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, isHovered, onHover }) => (
  <Card
    className={`overflow-hidden transition-all duration-300 ${
      isHovered ? 'border-magenta border-2 shadow-2xl scale-105' : 'hover:shadow-lg'
    }`}
    onMouseEnter={() => onHover(post.id)}
    onMouseLeave={() => onHover(null)}
  >
    <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
    <CardHeader>
      <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 mb-4">{post.excerpt}</p>
      <div className="flex items-center text-sm text-gray-500">
        <Calendar className="w-4 h-4 mr-2" />
        <span>{post.date}</span>
        <Clock className="w-4 h-4 ml-4 mr-2" />
        <span>{post.readTime}</span>
      </div>
    </CardContent>
    <CardFooter>
      <Link href={post.link} className="w-full">
        <Button
          variant="outline"
          className={`w-full transition-all duration-300 ${
            isHovered
              ? 'bg-magenta text-white'
              : 'bg-white text-magenta border-magenta'
          } hover:bg-magenta hover:text-white`}
        >
          Read More
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </Link>
    </CardFooter>
  </Card>
);