import { Request, Response } from 'express';
import { BlogPost } from '../models/BlogPost';
import { upload } from '../utils/storage';
import slugify from 'slugify';

// Get all blog posts
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { category, tag, status } = req.query;
    let query: any = {};

    if (category) query.category = category;
    if (tag) query.tags = tag;
    if (status) query.status = status;

    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .populate('author', 'name avatar');

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des articles' });
  }
};

// Get post by slug
export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug })
      .populate('author', 'name avatar');
    
    if (!post) {
      return res.status(404).json({ error: 'Article non trouvé' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'article' });
  }
};

// Create new post
export const createPost = async (req: Request, res: Response) => {
  try {
    const post = new BlogPost({
      ...req.body,
      slug: slugify(req.body.title, { lower: true }),
      author: req.user?.id
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog post', error });
  }
};

// Get posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await BlogPost.find()
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog posts', error });
  }
};

// Get featured posts
export const getFeaturedPosts = async (req: Request, res: Response) => {
  try {
    const posts = await BlogPost.find({ featured: true })
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching featured posts', error });
  }
};

// Get posts by category
export const getPostsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const posts = await BlogPost.find({ category })
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts by category', error });
  }
};

// Get posts by tag
export const getPostsByTag = async (req: Request, res: Response) => {
  try {
    const { tag } = req.params;
    const posts = await BlogPost.find({ tags: tag })
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts by tag', error });
  }
};

// Get post
export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug })
      .populate('author', 'name');
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog post', error });
  }
};

// Update post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        slug: slugify(req.body.title, { lower: true })
      },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog post', error });
  }
};

// Update post status
export const updatePostStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post status', error });
  }
};

// Toggle featured
export const toggleFeatured = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    post.featured = !post.featured;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling featured status', error });
  }
};

// Delete post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog post', error });
  }
};

// Get blog statistics
export const getBlogStats = async (req: Request, res: Response) => {
  try {
    const totalPosts = await BlogPost.countDocuments();
    const publishedPosts = await BlogPost.countDocuments({ status: 'published' });
    const draftPosts = await BlogPost.countDocuments({ status: 'draft' });

    const postsByCategory = await BlogPost.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    const popularTags = await BlogPost.aggregate([
      { $unwind: '$tags' },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const monthlyPosts = await BlogPost.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 }
    ]);

    res.json({
      total: totalPosts,
      published: publishedPosts,
      drafts: draftPosts,
      byCategory: postsByCategory,
      popularTags,
      monthly: monthlyPosts
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
  }
};
