const googlePassportLogin= ()=>{
  
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

} 
module.exports= googlePassportLogin


