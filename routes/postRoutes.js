import { Router } from "express";
import { validatePost, validateComment } from "../middlewares/validate.js";
import { isAuthenticated, isAdmin, optionalAuth } from "../middlewares/authMiddleware.js";
import {
  postsGet,
  postGetById,
  postPost,
  postUpdate,
  postDelete,
  togglePublicPost
} from "../controllers/postControllers.js";
import { commentPost } from "../controllers/commentsControllers.js";

const postRouter = Router();

postRouter.get("/", optionalAuth, postsGet);
postRouter.get("/:id", optionalAuth, postGetById);
postRouter.post("/", isAuthenticated, validatePost, postPost);
postRouter.put("/:id", isAuthenticated, isAdmin, validatePost, postUpdate);
postRouter.delete("/:id", isAuthenticated, isAdmin, postDelete);
postRouter.put("/:id/publish", isAuthenticated, isAdmin, togglePublicPost);
postRouter.post("/:id/comments", isAuthenticated, validateComment, commentPost);

export default postRouter