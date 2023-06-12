const authRouter = require("express").Router();
const bodyParser = require("body-parser");
const {
  testing,
  signUp,
  signIn,
  refresh,
  logOut,
} = require("../controllers/auth");

authRouter.use(bodyParser.urlencoded({ extended: true }));

authRouter.post("/", testing);
authRouter.post("/register", signUp);
authRouter.post("/login", signIn);
authRouter.get("/refresh", refresh);
authRouter.get("/logout", logOut);

module.exports = authRouter;
