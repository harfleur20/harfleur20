import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  tags: string[];
}

interface BlogCardProps {
  post: BlogPost;
  delay?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <Link to={`/blog/${post.id}`}>
          <div className="relative">
            <CardMedia
              component="img"
              height="200"
              image={post.image}
              alt={post.title}
              className="h-48 object-cover"
            />
            <Chip
              label={post.category}
              className="absolute top-4 left-4 bg-white"
              size="small"
            />
          </div>
          
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-grow">
                <Typography variant="subtitle2" className="font-medium">
                  {post.author.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {post.date} · {post.readTime} min de lecture
                </Typography>
              </div>
            </div>

            <Typography 
              variant="h6" 
              className="font-bold mb-2 line-clamp-2 hover:text-primary transition-colors"
            >
              {post.title}
            </Typography>
            
            <Typography 
              variant="body2" 
              color="textSecondary"
              className="mb-4 line-clamp-3"
            >
              {post.excerpt}
            </Typography>

            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                  className="text-xs"
                />
              ))}
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
};

export default BlogCard;
