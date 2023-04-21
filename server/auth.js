const router = require("express").Router();
const passport = require("passport");
// const verifyUser = require("./middleware/auth");
const bodyParser = require("body-parser");

const CLIENT_URL = "http://localhost:5173/chatPage";

router.use(bodyParser.urlencoded({ extended: true }));

// google intitialization route for sign-up
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile email"] })
);

// GOOGLE CALL BACK ROUTE
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login/failed",
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect(CLIENT_URL);
  }
);

// VERIFY MIDDLE-WARE
const verifyUser = (req, res, next) => {
  try {
    const sess = req.session;
    if (!sess.user) {
      return res.status(403).send("Access Denied");
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN SUCEES ROUTE AFTER AUTH
router.get("/login/sucess", verifyUser, (req, res) => {
  const sess = req.session;
  // console.log(sess.id);
  res.status(200).json({
    success: true,
    mesaage: "Success",
    user: sess.user,
  });
});

// LOGIN FAILED ROUTE AFTER FAILED AUTH
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    mesaage: "Failure",
  });
});

// LOGOUT ROUTE
router.get("/logout", (req, res) => {
  res.redirect("http://localhost:5173");
});

module.exports = router;
