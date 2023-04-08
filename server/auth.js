const router = require("express").Router();
const passport = require("passport");
const verifyUser = require("./middleware/auth");
const bodyParser = require("body-parser");

const CLIENT_URL = "http://localhost:5173/chatPage";

router.use(bodyParser.urlencoded({ extended: true }));
// login router
router.get("/login/sucess", verifyUser, (req, res) => {
  // console.log(req.user);
  if (req.user) {
    res.status(200).json({
      success: true,
      mesaage: "Success",
      user: req.user,
      cookies: req.cookies,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    mesaage: "Failure",
  });
});

router.get("/logout", (req, res) => {
  // req.logout();
  req.logOut();
  req.session = null;
  res.clearCookie("session");
  res.redirect("http://localhost:5173");
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile email openid"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/login/sucess",
    failureRedirect: "/auth/login/failed",
  })
);

module.exports = router;
