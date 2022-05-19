const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

function generateAccessToken(id, username) {
  return jwt.sign({ id, username }, process.env.TOKEN_SECRET, {
    expiresIn: "3600s",
  });
}

router.route("/register").post((req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "Please fill all the feilds" });
  }
  const newUser = new User({ username, password });
  User.findOne({ username: username }, (err, user) => {
    if (user) {
      res.send({ message: "User Already Exist" });
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            const token = generateAccessToken(user.id, user.username);
            res.json({
              token,
              user,
            });
          });
        });
      });
    }
  });
});

router.route("/login").post((req, res) => {
  const { username, password } = req.body;

  if (!password || !username) {
    return res.status(400).json({ msg: "Please Fill All Fields" });
  }
  User.findOne({ username: username.toLowerCase() }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid Credentials" });

        const token = generateAccessToken(user.id, user.username);

        res.json({
          token,
          user,
        });
      });
    }
  });
});

module.exports = router;
