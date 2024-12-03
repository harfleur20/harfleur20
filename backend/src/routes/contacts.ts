import express from 'express';
import { 
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact
} from '../controllers/contacts';
import { auth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/', createContact);

// Protected routes
router.get('/', auth, getContacts);
router.get('/:id', auth, getContact);
router.patch('/:id', auth, updateContact);
router.delete('/:id', auth, deleteContact);

export default router;
