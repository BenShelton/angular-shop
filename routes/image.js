const express = require('express');
const multer = require('multer');

// file uploader
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${global.rootDir}/uploads`);
  },
  filename: (req, file, cb) => {
    cb(null, `product-${Date.now()}.jpg`);
  }
});
const upload = multer({storage});

// root is /api/image
const router = express.Router();

// special path for image uploads
router.post('/upload', upload.single('image'), (req, res) => {
  return res.json({image: req.file});
});

// special path for image uploads
router.get('/:filename', (req, res) => {
  return res.sendFile(`${global.rootDir}/uploads/${req.params.filename}`);
});

module.exports = router;
