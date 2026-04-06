import { Router } from "express";
import { validateComment } from "../middlewares/validate.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";
import {
  commentsGet,
  commentGetById,
  commentPost,
  commentUpdate,
  commentDelete,
} from "../controllers/commentsControllers.js";

const commentRouter = Router();

commentRouter.get("/", commentsGet);
commentRouter.get("/:id", isAuthenticated, commentGetById);
commentRouter.post("/", isAuthenticated, validateComment,commentPost);
commentRouter.put("/:id", isAuthenticated,isAdmin,validateComment, commentUpdate);
commentRouter.delete("/:id", isAuthenticated, isAdmin, commentDelete);

export default commentRouter
