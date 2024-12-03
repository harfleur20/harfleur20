"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projects_1 = require("../controllers/projects");
const auth_1 = require("../middleware/auth");
const storage_1 = require("../utils/storage");
const router = express_1.default.Router();
// Public routes
router.get('/', projects_1.getProjects);
router.get('/featured', projects_1.getFeaturedProjects);
router.get('/category/:category', projects_1.getProjectsByCategory);
router.get('/:slug', projects_1.getProject);
// Protected routes
router.post('/', auth_1.auth, storage_1.upload.single('thumbnail'), projects_1.createProject);
router.patch('/:id', auth_1.auth, storage_1.upload.single('thumbnail'), projects_1.updateProject);
router.patch('/:id/featured', auth_1.auth, projects_1.toggleFeatured);
router.delete('/:id', auth_1.auth, projects_1.deleteProject);
exports.default = router;
