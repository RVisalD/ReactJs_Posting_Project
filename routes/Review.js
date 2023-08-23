const express = require('express');
const router = express.Router()
const {Review} = require("../models")
const {validateToken} = require("../middlewares/AuthMiddleware")

router.get("/:postId", async (req,res) => {
    const postId = req.params.postId
    const review = await Review.findAll({where: {PostId : postId}});
    res.json(review);
});

router.post("/", validateToken,async (req,res)=>{
    const review = req.body
    const username = req.user.username
    review.username = username
    await Review.create(review)
    res.json(review)
})

router.delete("/:reviewId", validateToken, async(req,res)=>{
    const reviewId = req.params.reviewId
    await Review.destroy({
        where:{
            id: reviewId
        }
    })
    res.json("Successfully Deleted")
})

module.exports = router