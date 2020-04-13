const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

//models
const User = require("../models/User");

//@route GET api/auth
//@desc auth user & get token
//@access Private
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please include a valid password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ ok: false, msg: "invalid credentials" });
      }
      //compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(404).json({ ok: false, msg: "invalid credentials" });
      }

      // require jwt token
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("SecretKey"),
        {
          expiresIn: 3600000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

//@route POST api/auth
//@desc get logged in user
//@access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
