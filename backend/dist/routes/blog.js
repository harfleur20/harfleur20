"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const blogController = __importStar(require("../controllers/blog"));
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const router = express_1.default.Router();
// Validation des articles
const postValidation = [
    (0, express_validator_1.body)('title').notEmpty().withMessage('Le titre est requis'),
    (0, express_validator_1.body)('content').notEmpty().withMessage('Le contenu est requis'),
    (0, express_validator_1.body)('excerpt').notEmpty().withMessage('L\'extrait est requis'),
    (0, express_validator_1.body)('category').isIn(['Design Graphique', 'Web Design', 'Motion Design', 'Branding', 'Tendances', 'Tutoriels'])
        .withMessage('Catégorie invalide'),
];
// Routes publiques
router.get('/', blogController.getAllPosts);
router.get('/featured', blogController.getFeaturedPosts);
router.get('/category/:category', blogController.getPostsByCategory);
router.get('/tag/:tag', blogController.getPostsByTag);
router.get('/:slug', blogController.getPostBySlug);
// Routes protégées (admin/editor)
router.post('/', auth_1.auth, upload_1.upload.single('image'), postValidation, blogController.createPost);
router.put('/:id', auth_1.auth, upload_1.upload.single('image'), postValidation, blogController.updatePost);
router.delete('/:id', auth_1.auth, blogController.deletePost);
// Routes admin uniquement
router.patch('/:id/status', auth_1.adminAuth, blogController.updatePostStatus);
router.patch('/:id/featured', auth_1.adminAuth, blogController.toggleFeatured);
exports.default = router;
