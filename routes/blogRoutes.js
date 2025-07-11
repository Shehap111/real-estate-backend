import express from 'express';
import {
  createBlog,
  getAllActiveBlogs,
  getAllBlogsAdmin,
  updateBlog,
  toggleBlogStatus,
  getBlogBySlug,
} from '../controllers/blogController.js';
import { verifyAdmin } from '../middleware/verifyAdmin.js';
import  {checkActiveBySlug}  from '../middleware/checkActive.js';
import Blog from '../models/blog.js';

const router = express.Router();


// ==================== PUBLIC ROUTES ====================

// @desc    Get all active blogs (for public users)
// @route   GET /api/blog
// @access  Public
router.get('/', getAllActiveBlogs);

// @desc    Get single blog by slug (must be active)
// @route   GET /api/blog/:slug
// @access  Public
router.get('/:slug', checkActiveBySlug(Blog), getBlogBySlug);


// ==================== ADMIN ROUTES ====================

// @desc    Create new blog
// @route   POST /api/blog
// @access  Admin only
router.post('/', verifyAdmin, createBlog);

// @desc    Get all blogs (active + inactive)
// @route   GET /api/blog/admin
// @access  Admin only
router.get('/admin/all', verifyAdmin, getAllBlogsAdmin);

// @desc    Update blog by ID
// @route   PUT /api/blog/:id
// @access  Admin only
router.put('/:id', verifyAdmin, updateBlog);

// @desc    Toggle blog status (activate/deactivate)
// @route   PATCH /api/blog/:id/toggle
// @access  Admin only
router.patch('/:id/toggle', verifyAdmin, toggleBlogStatus);
// ✅ Get blog meta by slug
router.get('/:slug/meta', async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug, isActive: true }).select(
      'metaTitle metaDescription title description'
    );

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog meta:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


export default router;
