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
exports.deleteProject = exports.toggleFeatured = exports.updateProject = exports.createProject = exports.getProject = exports.getProjectsByCategory = exports.getFeaturedProjects = exports.getProjects = void 0;
const Project_1 = require("../models/Project");
const slugify_1 = __importDefault(require("slugify"));
// Get all projects
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield Project_1.Project.find().sort({ createdAt: -1 });
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching projects', error });
    }
});
exports.getProjects = getProjects;
// Get featured projects
const getFeaturedProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield Project_1.Project.find({ featured: true })
            .sort({ createdAt: -1 });
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching featured projects', error });
    }
});
exports.getFeaturedProjects = getFeaturedProjects;
// Get projects by category
const getProjectsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.params;
        const projects = yield Project_1.Project.find({ category })
            .sort({ createdAt: -1 });
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching projects by category', error });
    }
});
exports.getProjectsByCategory = getProjectsByCategory;
// Get project by slug
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project_1.Project.findOne({ slug: req.params.slug });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching project', error });
    }
});
exports.getProject = getProject;
// Create new project
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = new Project_1.Project(Object.assign(Object.assign({}, req.body), { slug: (0, slugify_1.default)(req.body.title, { lower: true }) }));
        yield project.save();
        res.status(201).json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating project', error });
    }
});
exports.createProject = createProject;
// Update project
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project_1.Project.findByIdAndUpdate(req.params.id, Object.assign(Object.assign({}, req.body), { slug: (0, slugify_1.default)(req.body.title, { lower: true }) }), { new: true });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating project', error });
    }
});
exports.updateProject = updateProject;
// Toggle featured status
const toggleFeatured = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project_1.Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        project.featured = !project.featured;
        yield project.save();
        res.json(project);
    }
    catch (error) {
        res.status(500).json({ message: 'Error toggling featured status', error });
    }
});
exports.toggleFeatured = toggleFeatured;
// Delete project
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield Project_1.Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting project', error });
    }
});
exports.deleteProject = deleteProject;
