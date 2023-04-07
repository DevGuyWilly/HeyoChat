const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:5173/chatPage";

// login router
router.get("/login/sucess", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      mesaage: "Success",
      user: req.user,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(400).json({
    success: false,
    mesaage: "Failure",
  });
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect();
});
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
