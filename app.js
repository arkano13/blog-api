import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import passport from 'passport'
import './config/passport-local.js'
import './config/passport-jwt.js'

import authRouter from "./routes/userRoutes.js"
import commentRouter from "./routes/commentRoutes.js"
import postRouter from "./routes/postRoutes.js"
import AdminRouter from './routes/adminRoutes.js'

import postLikeRouter from "./routes/postLikesRoutes.js"
import commentLikeRouter from "./routes/commentsLikesRoutes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(passport.initialize())

app.use("/auth", authRouter);
app.use("/comments", commentRouter);
app.use("/posts", postRouter);
app.use("/posts", postLikeRouter)      
app.use("/comments", commentLikeRouter)
app.use("/admin", AdminRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})