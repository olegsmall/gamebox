/**
 * File uploader middleware that uses file stystem storage
 *
 * file: imageUploader.js
 * Created by: Oleg Smolovyk.
 * Date: 10/14/2018
 * Time: 15:20
 */

import multer from 'multer';

// Creating multer middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

//File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Creating uploader
const fileUploader = multer({
  storage: storage,
  limits: {fileSize: 1024 * 1024 * 4,},
  fileFilter: fileFilter
});

export default fileUploader;
