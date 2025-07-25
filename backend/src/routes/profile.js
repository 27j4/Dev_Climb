const express = require("express");
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();
const User = require("../models/user");
const { validEditProfileData } = require("../utils/validation");
bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const chk = await validEditProfileData(req);
    if (!chk) {
      throw new Error(":Invalid Edit Request");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach(
      (field) => (loggedInUser[field] = req.body[field])
    );
    await loggedInUser.save();
    res.status(200).json({
      message: "updates successfully",
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error" + err.message);
  }
});

profileRouter.patch("/profile/forgetPassword", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const inputoldPassword = req.body.password;

    if (!inputoldPassword) {
      throw new Error("Enter old password");
    }
    const isgivenPasswordValid = await loggedInUser.validatePassword(
      req.body.password
    );
    if (!isgivenPasswordValid) {
      throw new Error("Wrong Password!!");
    }
    const inputnewPassword = req.body.newPassword;
    if (!inputnewPassword) {
      throw new Error("InGive valid input password!!");
    }
    const hashPassword = await bcrypt.hash(inputnewPassword, 10);
    loggedInUser["password"] = hashPassword;
    await loggedInUser.save();
    res.status(200).json({ meassage: "Password updata successful!!" });
  } catch (error) {
    res.status(400).json({ message: "Something Went Wrong:" + error.message });
  }
});

profileRouter.get("/user", async (req, res) => {
  const { firstName } = req.body;
  //     const myUser = await User.find({firstName: UserName})
  try {
    const myUsers = await User.findOne({ firstName });
    if (!myUsers) {
      res.status(400).send("User not found!");
    } else {
      res.send(myUsers);
    }
  } catch (err) {
    res.status(400).send("Something went wrong:" + err.message);
  }
});

module.exports = profileRouter;
