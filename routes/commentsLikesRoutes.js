import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { postComment } from "../controllers/commentsLikesControllers.js";

const commentLikeRouter = Router()

commentLikeRouter.post("/:id/like", isAuthenticated, postComment);

export default commentLikeRouter