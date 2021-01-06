const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
require('dotenv/config');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
//   }
// };

const upload = multer({
  // fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const fileExtension = path.extname(file.originalname);
      const name = `${file.fieldname}-${Date.now()}${fileExtension}`;
      cb(null, name);
    }
  })
});

module.exports = upload;

// const imagesDirectory = path.join(__dirname, 'public/images');

// const storage = multer.diskStorage({
//   destination(req, file, callback) {
//     callback(null, imagesDirectory);
//   },
//   filename(req, file, callback) {
//     const fileExtension = path.extname(file.originalname);
//     const name = `${file.fieldname}-${Date.now()}${fileExtension}`;
//     callback(null, name);
//   }
// });

// const uploadsMiddleware = multer({ storage }).single('profilePhoto');

// module.exports = uploadsMiddleware;
