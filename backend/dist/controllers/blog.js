"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlogStats = exports.deletePost = exports.toggleFeatured = exports.updatePostStatus = exports.updatePost = exports.getPost = exports.getPostsByTag = exports.getPostsByCategory = exports.getFeaturedPosts = exports.getPosts = exports.createPost = exports.getPostBySlug = exports.getAllPosts = void 0;
const BlogPost_1 = require("../models/BlogPost");
const slugify_1 = __importDefault(require("slugify"));
// Get all blog posts
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, tag, status } = req.query;
        let query = {};
        if (category)
            query.category = category;
        if (tag)
            query.tags = tag;
        if (status)
            query.status = status;
        const posts = yield BlogPost_1.BlogPost.find(query)
            .sort({ createdAt: -1 })
            .populate('author', 'name avatar');
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des articles' });
    }
});
exports.getAllPosts = getAllPosts;
// Get post by slug
const getPostBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield BlogPost_1.BlogPost.findOne({ slug: req.params.slug })
            .populate('author', 'name avatar');
        if (!post) {
            return res.status(404).json({ error: 'Article non trouvé' });
        }
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'article' });
    }
});
exports.getPostBySlug = getPostBySlug;
// Create new post
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const post = new BlogPost_1.BlogPost(Object.assign(Object.assign({}, req.body), { slug: (0, slugify_1.default)(req.body.title, { lower: true }), author: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }));
        yield post.save();
        res.status(201).json(post);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating blog post', error });
    }
});
exports.createPost = createPost;
// Get posts
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield BlogPost_1.BlogPost.find()
            .populate('author', 'name')
            .sort({ createdAt: -1 });
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching blog posts', error });
    }
});
exports.getPosts = getPosts;
// Get featured posts
const getFeaturedPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield BlogPost_1.BlogPost.find({ featured: true })
            .populate('author', 'name')
            .sort({ createdAt: -1 });
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching featured posts', error });
    }
});
exports.getFeaturedPosts = getFeaturedPosts;
// Get posts by category
const getPostsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.params;
        const posts = yield BlogPost_1.BlogPost.find({ category })
            .populate('author', 'name')
            .sort({ createdAt: -1 });
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching posts by category', error });
    }
});
exports.getPostsByCategory = getPostsByCategory;
// Get posts by tag
const getPostsByTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tag } = req.params;
        const posts = yield BlogPost_1.BlogPost.find({ tags: tag })
            .populate('author', 'name')
            .sort({ createdAt: -1 });
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching posts by tag', error });
    }
});
exports.getPostsByTag = getPostsByTag;
// Get post
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield BlogPost_1.BlogPost.findOne({ slug: req.params.slug })
            .populate('author', 'name');
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching blog post', error });
    }
});
exports.getPost = getPost;
// Update post
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield BlogPost_1.BlogPost.findByIdAndUpdate(req.params.id, Object.assign(Object.assign({}, req.body), { slug: (0, slugify_1.default)(req.body.title, { lower: true }) }), { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating blog post', error });
    }
});
exports.updatePost = updatePost;
// Update post status
const updatePostStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const post = yield BlogPost_1.BlogPost.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating post status', error });
    }
});
exports.updatePostStatus = updatePostStatus;
// Toggle featured
const toggleFeatured = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield BlogPost_1.BlogPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        post.featured = !post.featured;
        yield post.save();
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ message: 'Error toggling featured status', error });
    }
});
exports.toggleFeatured = toggleFeatured;
// Delete post
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield BlogPost_1.BlogPost.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Blog post not found' });
        }
        res.json({ message: 'Blog post deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting blog post', error });
    }
});
exports.deletePost = deletePost;
// Get blog statistics
const getBlogStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalPosts = yield BlogPost_1.BlogPost.countDocuments();
        const publishedPosts = yield BlogPost_1.BlogPost.countDocuments({ status: 'published' });
        const draftPosts = yield BlogPost_1.BlogPost.countDocuments({ status: 'draft' });
        const postsByCategory = yield BlogPost_1.BlogPost.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            }
        ]);
        const popularTags = yield BlogPost_1.BlogPost.aggregate([
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
        const monthlyPosts = yield BlogPost_1.BlogPost.aggregate([
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
    }
    catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des statistiques' });
    }
});
exports.getBlogStats = getBlogStats;
