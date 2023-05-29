const authRouter = require("express").Router();
const passport = require("passport");
// const verifyUser = require("./middleware/auth");
const bodyParser = require("body-parser");
const { testing, signUp, signIn, refresh } = require("../controllers/auth");

const CLIENT_URL = "http://localhost:5173/chatPage";

authRouter.use(bodyParser.urlencoded({ extended: true }));

authRouter.post("/",testing)
authRouter.post("/register",signUp)
authRouter.post("/login",signIn)
authRouter.get("/refresh",refresh)
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




// LOGOUT ROUTE
authRouter.get("/logout", (req, res) => {
  res.redirect("http://localhost:5173");
});

module.exports = authRouter;
