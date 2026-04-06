import passport from 'passport'

const isAuthenticated = passport.authenticate("jwt", { session: false });

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  res.status(403).json({ message: "Access denied" });
};

const optionalAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (user) req.user = user  // si hay token válido, agrega el usuario
    next()                      // siempre continúa aunque no haya token
  })(req, res, next)
}

export { isAuthenticated, isAdmin, optionalAuth};


//router.delete('/posts/:id', isAuthenticated, isAdmin, deletePost)