const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "backend/public/temp");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, bytes) {
      const fileName = bytes.toString("hex") + path.extname(file.originalname);
      cb(null, fileName);
    });
  },
});
const upload = multer({
  storage,
});

module.exports = upload;
