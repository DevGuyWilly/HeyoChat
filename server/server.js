const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const authRoute = require("./auth");
const dotenv = require("dotenv");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/user");
const mongoose = require("mongoose");
dotenv.config({ path: "./.env" });

const app = express();

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

// LOCALDB-CONNECTION
const url = "mongodb://localhost:27017/heyChatDB";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  cors({
    origin: "http://localhost:8000",
    methods: "GET, POST PUT, DELETE",
    credentials: true,
  })
);

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, user);
  });
});

passport.deserializeUser((user, done) => {
  process.nextTick(() => {
    return done(null, user);
  });
});
//

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      userProfileURL: `https://www.googleapis.com/oauth2/v3/userinfo`,
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
      console.log(profile);
      User.findOne({ googleId: profile.id }).then((err, user) => {
        if (err) return done(err, null);
        if (user) return done(null, user);
        user = new User({
          googleId: profile.id,
          name: profile.displayName,
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        });
        user.save().then((err) => {
          if (err) return done(err, null);
          done(null, user);
        });
      });
    }
  )
);

app.use("/auth", authRoute);

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
