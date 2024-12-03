import express from 'express';
import { body } from 'express-validator';
import { 
  createQuote,
  getQuotes,
  getQuote,
  updateQuote,
  deleteQuote
} from '../controllers/quotes';
import { auth, adminAuth } from '../middleware/auth';

const router = express.Router();

// Validation des devis
const quoteValidation = [
  body('name').notEmpty().withMessage('Le nom est requis'),
  body('email').isEmail().withMessage('Email invalide'),
  body('serviceType').isIn(['Branding', 'Web Design', 'Motion Design', 'Print Design', 'Photographie', 'Vidéo'])
    .withMessage('Type de service invalide'),
  body('budget').isNumeric().withMessage('Le budget doit être un nombre'),
  body('description').notEmpty().withMessage('La description est requise'),
];

// Routes publiques
router.post('/', quoteValidation, createQuote);

// Routes protégées (admin)
router.get('/', adminAuth, getQuotes);
router.get('/pending', adminAuth, getQuotes);
router.get('/:id', adminAuth, getQuote);
router.patch('/:id/status', adminAuth, updateQuote);
router.put('/:id/notes', adminAuth, updateQuote);
router.delete('/:id', adminAuth, deleteQuote);

export default router;
