const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const authRoute = require("./auth");
const dotenv = require("dotenv");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
dotenv.config({ path: "./.env" });

const app = express();
app.use("/auth", authRoute);

const CLIENT_URL = "/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: CLIENT_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

//
app.use(
  cors({
    origin: "http://localhost:8000",
    methods: "GET, POST PUT, DELETE",
    credentials: true,
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
//

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
