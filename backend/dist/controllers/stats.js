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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = exports.getActivityStats = exports.getRevenueStats = exports.getOverallStats = void 0;
const Project_1 = require("../models/Project");
const Quote_1 = require("../models/Quote");
const Contact_1 = require("../models/Contact");
const BlogPost_1 = require("../models/BlogPost");
// Get overall statistics
const getOverallStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Projects stats
        const totalProjects = yield Project_1.Project.countDocuments();
        const activeProjects = yield Project_1.Project.countDocuments({ status: 'in_progress' });
        const completedProjects = yield Project_1.Project.countDocuments({ status: 'completed' });
        // Quotes stats
        const totalQuotes = yield Quote_1.Quote.countDocuments();
        const pendingQuotes = yield Quote_1.Quote.countDocuments({ status: 'pending' });
        const acceptedQuotes = yield Quote_1.Quote.countDocuments({ status: 'accepted' });
        // Calculate conversion rate
        const conversionRate = totalQuotes > 0
            ? (acceptedQuotes / totalQuotes * 100).toFixed(2)
            : 0;
        // Messages stats
        const totalMessages = yield Contact_1.Contact.countDocuments();
        const unreadMessages = yield Contact_1.Contact.countDocuments({ status: 'new' });
        // Blog stats
        const totalPosts = yield BlogPost_1.BlogPost.countDocuments();
        const publishedPosts = yield BlogPost_1.BlogPost.countDocuments({ status: 'published' });
        res.json({
            projects: {
                total: totalProjects,
                active: activeProjects,
                completed: completedProjects,
            },
            quotes: {
                total: totalQuotes,
                pending: pendingQuotes,
                accepted: acceptedQuotes,
                conversionRate,
            },
            messages: {
                total: totalMessages,
                unread: unreadMessages,
            },
            blog: {
                total: totalPosts,
                published: publishedPosts,
            },
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des statistiques générales' });
    }
});
exports.getOverallStats = getOverallStats;
// Get revenue statistics
const getRevenueStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const monthlyRevenue = yield Quote_1.Quote.aggregate([
            {
                $match: {
                    status: 'accepted',
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' }
                    },
                    revenue: { $sum: '$budget' }
                }
            },
            { $sort: { '_id.year': -1, '_id.month': -1 } },
            { $limit: 12 }
        ]);
        const revenueByService = yield Quote_1.Quote.aggregate([
            {
                $match: {
                    status: 'accepted',
                }
            },
            {
                $group: {
                    _id: '$serviceType',
                    revenue: { $sum: '$budget' },
                    count: { $sum: 1 }
                }
            }
        ]);
        const totalRevenue = yield Quote_1.Quote.aggregate([
            {
                $match: {
                    status: 'accepted',
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$budget' }
                }
            }
        ]);
        res.json({
            monthly: monthlyRevenue,
            byService: revenueByService,
            total: ((_a = totalRevenue[0]) === null || _a === void 0 ? void 0 : _a.total) || 0,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des statistiques de revenus' });
    }
});
exports.getRevenueStats = getRevenueStats;
// Get activity statistics
const getActivityStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const monthlyActivity = yield Promise.all([
            // Projects created per month
            Project_1.Project.aggregate([
                {
                    $group: {
                        _id: {
                            year: { $year: '$createdAt' },
                            month: { $month: '$createdAt' }
                        },
                        projects: { $sum: 1 }
                    }
                },
                { $sort: { '_id.year': -1, '_id.month': -1 } },
                { $limit: 12 }
            ]),
            // Quotes received per month
            Quote_1.Quote.aggregate([
                {
                    $group: {
                        _id: {
                            year: { $year: '$createdAt' },
                            month: { $month: '$createdAt' }
                        },
                        quotes: { $sum: 1 }
                    }
                },
                { $sort: { '_id.year': -1, '_id.month': -1 } },
                { $limit: 12 }
            ]),
            // Messages received per month
            Contact_1.Contact.aggregate([
                {
                    $group: {
                        _id: {
                            year: { $year: '$createdAt' },
                            month: { $month: '$createdAt' }
                        },
                        messages: { $sum: 1 }
                    }
                },
                { $sort: { '_id.year': -1, '_id.month': -1 } },
                { $limit: 12 }
            ]),
        ]);
        // Combine monthly data
        const [projectsData, quotesData, messagesData] = monthlyActivity;
        // Create a map of all months
        const monthlyStats = new Map();
        // Helper function to create month key
        const getMonthKey = (year, month) => `${year}-${month.toString().padStart(2, '0')}`;
        // Initialize with projects data
        projectsData.forEach((item) => {
            const key = getMonthKey(item._id.year, item._id.month);
            monthlyStats.set(key, { projects: item.projects, quotes: 0, messages: 0 });
        });
        // Add quotes data
        quotesData.forEach((item) => {
            const key = getMonthKey(item._id.year, item._id.month);
            if (monthlyStats.has(key)) {
                monthlyStats.get(key).quotes = item.quotes;
            }
            else {
                monthlyStats.set(key, { projects: 0, quotes: item.quotes, messages: 0 });
            }
        });
        // Add messages data
        messagesData.forEach((item) => {
            const key = getMonthKey(item._id.year, item._id.month);
            if (monthlyStats.has(key)) {
                monthlyStats.get(key).messages = item.messages;
            }
            else {
                monthlyStats.set(key, { projects: 0, quotes: 0, messages: item.messages });
            }
        });
        // Convert map to array and sort by date
        const monthlyStatsArray = Array.from(monthlyStats.entries())
            .map(([key, value]) => (Object.assign({ date: key }, value)))
            .sort((a, b) => b.date.localeCompare(a.date));
        res.json({
            monthly: monthlyStatsArray,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des statistiques d\'activité' });
    }
});
exports.getActivityStats = getActivityStats;
// Get comprehensive statistics
const getStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Projects stats
        const totalProjects = yield Project_1.Project.countDocuments();
        const featuredProjects = yield Project_1.Project.countDocuments({ featured: true });
        const projectsByStatus = yield Project_1.Project.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);
        // Quotes stats
        const totalQuotes = yield Quote_1.Quote.countDocuments();
        const pendingQuotes = yield Quote_1.Quote.countDocuments({ status: 'pending' });
        const approvedQuotes = yield Quote_1.Quote.countDocuments({ status: 'approved' });
        // Contacts stats
        const totalContacts = yield Contact_1.Contact.countDocuments();
        const newContacts = yield Contact_1.Contact.countDocuments({ status: 'new' });
        const repliedContacts = yield Contact_1.Contact.countDocuments({ status: 'replied' });
        // Blog stats
        const totalPosts = yield BlogPost_1.BlogPost.countDocuments();
        const publishedPosts = yield BlogPost_1.BlogPost.countDocuments({ status: 'published' });
        const featuredPosts = yield BlogPost_1.BlogPost.countDocuments({ featured: true });
        // Recent activity
        const recentProjects = yield Project_1.Project.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('title status createdAt');
        const recentQuotes = yield Quote_1.Quote.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name projectType status createdAt');
        const recentContacts = yield Contact_1.Contact.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name email status createdAt');
        res.json({
            projects: {
                total: totalProjects,
                featured: featuredProjects,
                byStatus: projectsByStatus
            },
            quotes: {
                total: totalQuotes,
                pending: pendingQuotes,
                approved: approvedQuotes
            },
            contacts: {
                total: totalContacts,
                new: newContacts,
                replied: repliedContacts
            },
            blog: {
                total: totalPosts,
                published: publishedPosts,
                featured: featuredPosts
            },
            recentActivity: {
                projects: recentProjects,
                quotes: recentQuotes,
                contacts: recentContacts
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching statistics', error });
    }
});
exports.getStats = getStats;
