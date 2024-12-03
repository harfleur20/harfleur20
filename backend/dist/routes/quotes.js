"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const quotes_1 = require("../controllers/quotes");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Validation des devis
const quoteValidation = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Le nom est requis'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Email invalide'),
    (0, express_validator_1.body)('serviceType').isIn(['Branding', 'Web Design', 'Motion Design', 'Print Design', 'Photographie', 'Vidéo'])
        .withMessage('Type de service invalide'),
    (0, express_validator_1.body)('budget').isNumeric().withMessage('Le budget doit être un nombre'),
    (0, express_validator_1.body)('description').notEmpty().withMessage('La description est requise'),
];
// Routes publiques
router.post('/', quoteValidation, quotes_1.createQuote);
// Routes protégées (admin)
router.get('/', auth_1.adminAuth, quotes_1.getQuotes);
router.get('/pending', auth_1.adminAuth, quotes_1.getQuotes);
router.get('/:id', auth_1.adminAuth, quotes_1.getQuote);
router.patch('/:id/status', auth_1.adminAuth, quotes_1.updateQuote);
router.put('/:id/notes', auth_1.adminAuth, quotes_1.updateQuote);
router.delete('/:id', auth_1.adminAuth, quotes_1.deleteQuote);
exports.default = router;
