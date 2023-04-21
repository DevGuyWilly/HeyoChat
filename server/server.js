const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const authRoute = require("./auth");
const dotenv = require("dotenv");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/user");
const mongoose = require("mongoose");
const dbConnect = require("./dbConnect");
const bodyParser = require("body-parser");
dotenv.config({ path: "./.env" });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// FOR SESSIONS
app.use(
  session({
    name: `session`,
    secret: "lamda",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // This will only work if you have https enabled!
      maxAge: 60000, // 1 min
    },
  })
);

// TO PREVENT CROSS ORIGIN ERROR
// BUT NOT NEEDED SINCE WE ARE MAKING USE OF ORIGIN
app.use(
  cors({
    // CLIENT SIDE ORIGIN
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// LOCAL MONGO-DB DATABASE CONNECTION;
mongoose.connect(process.env.LOCAL_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ONLINE MONGO-DB DATABSE CONNECTION
// dbConnect();

// GET USER ROUTE BEING CALLED FROM CLIENT SIDE,
//
app.get("/user/", (req, res) => {
  const sess = req.session;
  try {
    if (!sess.user) {
      res.status(404).json({
        message: "User not logged in",
      });
    } else {
      res.status(200).json({
        message: "User Logged In",
        user: req.session.user,
      });
    }
  } catch (error) {
    res.json({
      message: "Error!",
      error: error.message,
    });
  }
});

// ROOT ROUTES TO ALL ENDPOINT
app.use("/auth", authRoute);

// ATTACH USER'S ID AS COOKIE INTO SESSION
passport.serializeUser((user, done) => {
  process.nextTick(() => {
    console.log(`serializing--->`, user.id);
    done(null, user.id);
  });
});

//TAKES INFO ABOUT THE USER STORED IN THE SESSION TO GET COMPLETE
// USER INFORMATION AS AN OBJECT WHEN A REQUEST IS MADE 😁
passport.deserializeUser((id, done) => {
  process.nextTick(async () => {
    const result = await User.findOne({ googleId: id });
    done(null, result);
  });
});

// USING PASSPORT GOOGLE STRATEGY FOR AUTHENTICATION
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      userProfileURL: `https://www.googleapis.com/oauth2/v3/userinfo`,
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
      User.findOne({ googleId: profile.id }).then((err, user) => {
        if (err) return done(err, null);
        if (user) return done(null, user);
        const newUser = new User({
          googleId: profile.id,
          name: profile.displayName,
          firstName: profile._json.given_name,
          lastName: profile._json.family_name,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
        });
        newUser.save().then((err) => {
          if (err) return done(err, null);
          done(null, newUser);
        });
      });
    }
  )
);

//
app.use(passport.initialize());
app.use(passport.session());

// SERVER STARTED
app.listen(8000, () => {
  console.log("Listening on port 8000");
});
