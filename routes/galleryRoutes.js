// routes/galleryRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const { uploadImage, getImages } = require('../controllers/galleryController');

router.post('/upload', upload.single('image'), uploadImage);
router.get('/', getImages);

module.exports = router;
