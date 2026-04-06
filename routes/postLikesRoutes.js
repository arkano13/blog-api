import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import {postLike} from "../controllers/postLikesControllers.js";

const postLikeRouter = Router()

postLikeRouter.post("/:id/like", isAuthenticated, postLike);


export default postLikeRouter