const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });

    if (!user) {
      return res.status(404).json({ error: "User not found!!!" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid Inputs!!!" });
    }

    const accessToken = sign(
      { username: user.username, id: user.id },
      "important"
    );
    return res.json({ token: accessToken, username: username, id: user.id });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findOne({ where: { username: req.user.username } });
  const match = await bcrypt.compare(oldPassword, user.password);

  if (!match) {
    return res.status(401).json({ error: "Wrong Password!!!" });
  }

  try {
    const hash = await bcrypt.hash(newPassword, 10);
    await User.update({ password: hash }, { where: { username: req.user.username } });
    res.json("SUCCESS");
  } catch (error) {
    // Handle any errors that might occur during the password update process
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/info/:id", async (req, res) => {
  const id = req.params.id;
  const info = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(info);
});

module.exports = router;
