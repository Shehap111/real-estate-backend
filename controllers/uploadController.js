import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path; // المسار الكامل للملف الأصلي
    const fieldName = req.file.fieldname;
    const ext = path.extname(filePath); // امتداد الملف الأصلي
    const baseName = path.basename(filePath, ext); // اسم الملف بدون الامتداد
    const dirName = path.dirname(filePath); // مجلد الحفظ

    // ✅ دايمًا نحط الامتداد .webp حتى لو الأصل كان webp
    let compressedPath = path.join(dirName, `${baseName}-compressed.webp`);

    // ✅ تأكد إننا مش هنكتب فوق نفس الملف
    if (compressedPath === filePath) {
      compressedPath = path.join(dirName, `${baseName}-${Date.now()}.webp`);
    }

    // ✅ ضغط الصورة وحفظها في ملف مختلف
    await sharp(filePath)
      .webp({
        quality: 85,
        effort: 4,
      })
      .toFile(compressedPath);

    // ✅ حذف النسخة الأصلية
    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.warn('Warning: Failed to delete original image:', err.message);
    }

    // ✅ بناء الرابط النهائي
    const relativePath = compressedPath.replace(/\\/g, '/').split('uploads')[1]; // "/image360/..."
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads${relativePath}`;

    res.status(200).json({ url: fileUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Failed to process image' });
  }
};

export default uploadImage;
