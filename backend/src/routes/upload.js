const express = require("express");
const { userAuth } = require("../middlewares/auth");
const fs = require("fs");
const uploadRouter = express.Router();
const upload = require("../middlewares/multer");
const uploadOnCloudinary = require("../utils/clodinary");
const User = require("../models/user");
uploadRouter.post(
  "/upload/image",
  userAuth,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
      // console.log("Cloudinary Response:", cloudinaryResponse);
      // Remove local file
      fs.unlinkSync(req.file.path);
      const user = await User.findById({ _id: req.user._id });
      user.photoUrl = cloudinaryResponse.secure_url;
      await user.save();
      // console.log(user);
      res.json({
        message: "Upload Successful",
        url: cloudinaryResponse.secure_url,
      });
    } catch (error) {
      // console.error("Upload Error:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = uploadRouter;
