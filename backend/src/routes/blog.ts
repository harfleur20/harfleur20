import express from 'express';
import { body } from 'express-validator';
import * as blogController from '../controllers/blog';
import { auth, adminAuth } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = express.Router();

// Validation des articles
const postValidation = [
  body('title').notEmpty().withMessage('Le titre est requis'),
  body('content').notEmpty().withMessage('Le contenu est requis'),
  body('excerpt').notEmpty().withMessage('L\'extrait est requis'),
  body('category').isIn(['Design Graphique', 'Web Design', 'Motion Design', 'Branding', 'Tendances', 'Tutoriels'])
    .withMessage('Catégorie invalide'),
];

// Routes publiques
router.get('/', blogController.getAllPosts);
router.get('/featured', blogController.getFeaturedPosts);
router.get('/category/:category', blogController.getPostsByCategory);
router.get('/tag/:tag', blogController.getPostsByTag);
router.get('/:slug', blogController.getPostBySlug);

// Routes protégées (admin/editor)
router.post('/',
  auth,
  upload.single('image'),
  postValidation,
  blogController.createPost
);

router.put('/:id',
  auth,
  upload.single('image'),
  postValidation,
  blogController.updatePost
);

router.delete('/:id', auth, blogController.deletePost);

// Routes admin uniquement
router.patch('/:id/status', adminAuth, blogController.updatePostStatus);
router.patch('/:id/featured', adminAuth, blogController.toggleFeatured);

export default router;
