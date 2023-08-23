const express = require('express')
const router = express.Router()
const {Post, Like} = require("../models")
const {validateToken} = require("../middlewares/AuthMiddleware")

router.get("/", validateToken, async (req,res) => {
    const all = await Post.findAll({ include: [Like]})
    const likedPost = await Like.findAll({where: {UserId: req.user.id}})
    res.json({all:all, likedPost:likedPost})
});
//  backend to navigate and display data by id
router.get("/byId/:id", async (req,res) => {
    const id = req.params.id
    const post = await Post.findByPk(id)
    res.json(post)
});

router.get("/byuserId/:id", async (req,res) => {
    const id = req.params.id
    const post = await Post.findAll({where: {UserId : id}})
    res.json(post)
});

router.put("/title", validateToken, async(req, res)=>{
    const {newTitle, id} = req.body
    await Post.update({title:newTitle},{where:{id:id}})
    res.json(newTitle)
})

router.put("/description", validateToken, async(req, res)=>{
    const {newDescription, id} = req.body
    await Post.update({description:newDescription},{where:{id:id}})
    res.json(newDescription)
})

router.post("/",validateToken, async (req,res)=>{
    const post = req.body
    post.username = req.user.username
    post.UserId = req.user.id
    await Post.create(post)
    res.json(post)
});

router.delete("/:postId", validateToken, async (req,res)=>{
    const postId = req.params.postId
    await Post.destroy({
        where:{
            id: postId
        }
    })
    res.json("Successfully Deleted")
})

module.exports = router