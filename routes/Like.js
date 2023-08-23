const express = require("express");
const router = express.Router();
const { Like } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body;
  const UserId = req.user.id;

  const found = await Like.findOne({
    where: { PostId: PostId, UserId: UserId },
  });
  if (!found) {
    await Like.create({
      PostId: PostId,
      UserId: UserId,
    });
    res.json({liked: true})
  } else {
    await Like.destroy({
      where: { PostId: PostId, UserId: UserId },
    });
    res.json({liked: false});
  }
});

module.exports = router;
