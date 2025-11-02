import Project from '../models/Project.js';

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    console.log('📡 GET /api/projects - Fetching all projects');
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    console.log(`✅ Found ${projects.length} projects`);
    res.json({ success: true, data: projects });
  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to fetch projects',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Get single project
export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create project (admin only)
export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update project (admin only)
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete project (admin only)
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
