import { Request, Response } from 'express';
import { Project } from '../models/Project';
import { upload } from '../utils/storage';
import slugify from 'slugify';

// Get all projects
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
};

// Get featured projects
export const getFeaturedProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({ featured: true })
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching featured projects', error });
  }
};

// Get projects by category
export const getProjectsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const projects = await Project.find({ category })
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects by category', error });
  }
};

// Get project by slug
export const getProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error });
  }
};

// Create new project
export const createProject = async (req: Request, res: Response) => {
  try {
    const project = new Project({
      ...req.body,
      slug: slugify(req.body.title, { lower: true })
    });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
};

// Update project
export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        slug: slugify(req.body.title, { lower: true })
      },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error });
  }
};

// Toggle featured status
export const toggleFeatured = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    project.featured = !project.featured;
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error toggling featured status', error });
  }
};

// Delete project
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
};
