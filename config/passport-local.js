import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcryptjs'
import { getUsername } from '../db/usersQueries.js'

const verifyCallback = async (username, password, done) => {
  try {
    const user = await getUsername(username);
    if (!user) return done(null, false);
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    console.log("error en : ", err);
    done(err);
  }
};

const strategy = new LocalStrategy(
  { usernameField: "username", passwordField: "password" },
  verifyCallback,
);

passport.use(strategy);

