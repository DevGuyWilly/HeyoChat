const router = require("express").Router();
const passport = require("passport");
const verifyUser = require("./middleware/auth");

const CLIENT_URL = "http://localhost:5173/chatPage";

// login router
router.get("/login/sucess",verifyUser, (req, res) => {
  console.log(req.user)
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
  res.redirect("http://localhost:5173/");
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile email openid"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
