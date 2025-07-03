import Blog from '../models/blog.js';

// 1. Create Blog
export const createBlog = async (req, res) => {
  try {
    let { slug } = req.body;

    // Check if slug already exists
    let existing = await Blog.findOne({ slug });
    let counter = 1;
    while (existing) {
      const newSlug = `${slug}-${counter}`;
      existing = await Blog.findOne({ slug: newSlug });
      if (!existing) {
        slug = newSlug;
        break;
      }
      counter++;
    }

    const newBlog = new Blog({ ...req.body, slug });
    await newBlog.save();

    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create blog', error });
  }
};

// 2. Get all active blogs (for public)
export const getAllActiveBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get blogs', error });
  }
};

// 3. Get all blogs (for admin)
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get blogs', error });
  }
};

// 4. Update blog by ID
export const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedBlog) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update blog', error });
  }
};

// 5. Toggle blog status
export const toggleBlogStatus = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.isActive = !blog.isActive;
    await blog.save();

    res.status(200).json({
      message: `Blog ${blog.isActive ? 'activated' : 'deactivated'} successfully`,
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle blog status', error });
  }
};

// 6. Get blog by slug
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isActive: true });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get blog', error });
  }
};
