import { Router } from "express";
import { validatePost, validateComment } from "../middlewares/validate.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";
import {
  postsGet,
  postGetById,
  postUpdate,
  postDelete,
  togglePublicPost,
} from "../controllers/adminControllers.js";

const AdminRouter = Router();

AdminRouter.get("/", isAuthenticated, isAdmin, postsGet);
AdminRouter.get("/:id", isAuthenticated, isAdmin, postGetById);
AdminRouter.put("/:id", isAuthenticated, isAdmin, validatePost, postUpdate);
AdminRouter.delete("/:id", isAuthenticated, isAdmin, postDelete);
AdminRouter.put("/:id/publish", isAuthenticated, isAdmin, togglePublicPost);

export default AdminRouter;
