import express from 'express';
import { 
  createProject,
  getProjects,
  getFeaturedProjects,
  getProjectsByCategory,
  getProject,
  updateProject,
  toggleFeatured,
  deleteProject
} from '../controllers/projects';
import { auth } from '../middleware/auth';
import { upload } from '../utils/storage';

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/featured', getFeaturedProjects);
router.get('/category/:category', getProjectsByCategory);
router.get('/:slug', getProject);

// Protected routes
router.post('/', auth, upload.single('thumbnail'), createProject);
router.patch('/:id', auth, upload.single('thumbnail'), updateProject);
router.patch('/:id/featured', auth, toggleFeatured);
router.delete('/:id', auth, deleteProject);

export default router;
