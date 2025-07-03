import multer from 'multer';
import path from 'path';
import fs from 'fs';

const baseUploadDir = 'uploads';
const subDirs = ['default', 'image360'];

subDirs.forEach((dir) => {
  const fullPath = path.join(baseUploadDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Custom storage based on field name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const field = file.fieldname;
    let targetDir = path.join(baseUploadDir, 'default');
    if (field === 'image360') targetDir = path.join(baseUploadDir, 'image360');
    cb(null, targetDir);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueName + ext);
  },
});

export const upload = multer({ storage });
