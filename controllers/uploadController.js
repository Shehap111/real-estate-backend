const uploadImage = async (req, res) => {
  try {
    // تعطل رفع الصور بالرد برد ثابت مثلاً
    return res.status(200).json({
      url: 'https://placehold.co/600x400/png?text=Upload+disabled+temporarily'
    });

    // لو عايز ترجع رسالة مختلفة بدل الصورة، ممكن مثلاً:
    // return res.status(200).json({ message: 'Image upload temporarily disabled' });

    // لو حبيت ترجع خطأ بس متأكد من عدم توقف الراوت بالكامل
    // return res.status(503).json({ message: 'Service unavailable' });

    // الكود الأصلي تحت هنا لو حبيت ترجعه بعدين
    /*
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // باقي الكود...
    */
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Failed to process image' });
  }
};
