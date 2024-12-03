import { Request, Response } from 'express';
import { Project } from '../models/Project';
import { Quote } from '../models/Quote';
import { Contact } from '../models/Contact';
import { BlogPost } from '../models/BlogPost';

// Get overall statistics
export const getOverallStats = async (req: Request, res: Response) => {
  try {
    // Projects stats
    const totalProjects = await Project.countDocuments();
    const activeProjects = await Project.countDocuments({ status: 'in_progress' });
    const completedProjects = await Project.countDocuments({ status: 'completed' });

    // Quotes stats
    const totalQuotes = await Quote.countDocuments();
    const pendingQuotes = await Quote.countDocuments({ status: 'pending' });
    const acceptedQuotes = await Quote.countDocuments({ status: 'accepted' });
    
    // Calculate conversion rate
    const conversionRate = totalQuotes > 0 
      ? (acceptedQuotes / totalQuotes * 100).toFixed(2)
      : 0;

    // Messages stats
    const totalMessages = await Contact.countDocuments();
    const unreadMessages = await Contact.countDocuments({ status: 'new' });

    // Blog stats
    const totalPosts = await BlogPost.countDocuments();
    const publishedPosts = await BlogPost.countDocuments({ status: 'published' });

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
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques générales' });
  }
};

// Get revenue statistics
export const getRevenueStats = async (req: Request, res: Response) => {
  try {
    const monthlyRevenue = await Quote.aggregate([
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

    const revenueByService = await Quote.aggregate([
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

    const totalRevenue = await Quote.aggregate([
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
      total: totalRevenue[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques de revenus' });
  }
};

// Get activity statistics
export const getActivityStats = async (req: Request, res: Response) => {
  try {
    const monthlyActivity = await Promise.all([
      // Projects created per month
      Project.aggregate([
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
      Quote.aggregate([
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
      Contact.aggregate([
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
    const getMonthKey = (year: number, month: number) => `${year}-${month.toString().padStart(2, '0')}`;
    
    // Initialize with projects data
    projectsData.forEach((item: any) => {
      const key = getMonthKey(item._id.year, item._id.month);
      monthlyStats.set(key, { projects: item.projects, quotes: 0, messages: 0 });
    });

    // Add quotes data
    quotesData.forEach((item: any) => {
      const key = getMonthKey(item._id.year, item._id.month);
      if (monthlyStats.has(key)) {
        monthlyStats.get(key).quotes = item.quotes;
      } else {
        monthlyStats.set(key, { projects: 0, quotes: item.quotes, messages: 0 });
      }
    });

    // Add messages data
    messagesData.forEach((item: any) => {
      const key = getMonthKey(item._id.year, item._id.month);
      if (monthlyStats.has(key)) {
        monthlyStats.get(key).messages = item.messages;
      } else {
        monthlyStats.set(key, { projects: 0, quotes: 0, messages: item.messages });
      }
    });

    // Convert map to array and sort by date
    const monthlyStatsArray = Array.from(monthlyStats.entries())
      .map(([key, value]) => ({
        date: key,
        ...value
      }))
      .sort((a, b) => b.date.localeCompare(a.date));

    res.json({
      monthly: monthlyStatsArray,
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des statistiques d\'activité' });
  }
};

// Get comprehensive statistics
export const getStats = async (req: Request, res: Response) => {
  try {
    // Projects stats
    const totalProjects = await Project.countDocuments();
    const featuredProjects = await Project.countDocuments({ featured: true });
    const projectsByStatus = await Project.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Quotes stats
    const totalQuotes = await Quote.countDocuments();
    const pendingQuotes = await Quote.countDocuments({ status: 'pending' });
    const approvedQuotes = await Quote.countDocuments({ status: 'approved' });

    // Contacts stats
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const repliedContacts = await Contact.countDocuments({ status: 'replied' });

    // Blog stats
    const totalPosts = await BlogPost.countDocuments();
    const publishedPosts = await BlogPost.countDocuments({ status: 'published' });
    const featuredPosts = await BlogPost.countDocuments({ featured: true });

    // Recent activity
    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title status createdAt');

    const recentQuotes = await Quote.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name projectType status createdAt');

    const recentContacts = await Contact.find()
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
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error });
  }
};
