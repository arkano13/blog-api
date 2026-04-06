import { Router } from "express";
import { validateRegister, validateLogin } from "../middlewares/validate.js";
import { registerPost, loginPost } from "../controllers/userControllers.js";
import passport from "passport";

const authRouter = Router();

authRouter.post("/register", validateRegister, registerPost);

authRouter.post(
  "/login",
  validateLogin,
  (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) return next(err)
      if (!user) return res.status(401).json({ message: "Invalid username or password" })
      req.user = user
      next()
    })(req, res, next)
  },
  loginPost
);

export default authRouter;
