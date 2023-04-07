var User = require("../models/User.js");
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcryptjs");
var flash = require("connect-flash");

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err || !user) return done(err, null);
    done(null, user);
  });
});

module.exports = function (app) {
  return {
    init: function () {
      passport.use(
        new LocalStrategy(
          {
            usernameField: "email",
            passwordField: "password",
          },
          function (email, password, done) {
            User.findOne({ email: email })
              .then(function (user) {
                if (!user) {
                  return done(null, false, {
                    message: "That user is not registered",
                  });
                }
                bcrypt.compare(
                  password,
                  user.password,
                  function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                      return done(null, user);
                    } else {
                      return done(null, false, {
                        message: "Password incorrect",
                      });
                    }
                  }
                );
              })
              .catch(function (err) {
                console.log(err);
                throw err;
              });
          }
        )
      );
      passport.use(
        new GoogleStrategy(
          {
            clientID: process.env.clientID,
            clientSecret: process.env.clientSecret,
            callbackURL: "http://localhost:8080/auth/google/callback",
          },
          function (_accessToken, _refereshToken, profile, done) {
            User.findOne({ authId: profile.id }, function (err, user) {
              if (err) return done(err, null);
              if (user) return done(null, user);
              user = new User({
                authId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                img: profile.photos[0].value,
                created: Date.now(),
                role: "customer",
              });
              user.save(function (err) {
                if (err) return done(err, null);
                done(null, user);
              });
            });
          }
        )
      );
      app.use(passport.initialize());
      app.use(passport.session());
    },
    registerRoute: function () {
      app.post("/login", function (req, res, next) {
        passport.authenticate("local", {
          successRedirect: "/",
          failureRedirect: "/unauthorized",
          failureFlash: true,
        })(req, res, next);
      });
      app.get(
        "/auth/google",
        passport.authenticate("google", { scope: ["profile", "email"] })
      );
      app.get(
        "/auth/google/callback",
        passport.authenticate("google", { failureRedirect: "/unauthorized" }),
        function (req, res) {
          res.redirect("/");
        }
      );
    },
  };
};
