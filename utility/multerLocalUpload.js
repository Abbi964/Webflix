const multer = require('multer');

// specifying where to store files 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// // specifying that only mp4 files are allowed
// const fileFilter = function (req, file, cb) {
//   if (file.mimetype === 'video/mp4') {
//     // Accepting the file
//     cb(null, true); 
//   } else {
//     // Rejecting the file
//     cb(new Error('Only MP4 files are allowed'), false); 
//   }
// };

const upload = multer({ storage: storage});

module.exports = upload;
