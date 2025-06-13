const Image = require('../models/Image');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (req, res) => {
  try {
    const streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload(req);
    const newImage = new Image({
      url: result.secure_url,
      uploadedBy: req.body.uploadedBy,
    });

    await newImage.save();
    res.status(200).json(newImage);
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error });
  }
};

const getImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ uploadedAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch images' });
  }
};

module.exports = { uploadImage, getImages };
