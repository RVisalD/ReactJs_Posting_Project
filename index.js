const express = require("express");
const cors = require("cors")
const app = express();

app.use(express.json())
app.use(cors())

const db = require("./models");

//  Routers
const postRouter = require('./routes/Post')
app.use("/post", postRouter)

const reviewRouter = require('./routes/Review')
app.use("/review", reviewRouter)

const userRouter = require('./routes/User')
app.use("/auth", userRouter)

const likeRouter = require('./routes/Like')
app.use("/like", likeRouter)

db.sequelize.sync().then(() => {
  app.listen(4000, () => {
    console.log("Running on port 4000");
  });
});
