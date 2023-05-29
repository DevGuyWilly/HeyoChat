const express = require("express");
const session = require("express-session");
const cors = require("cors");
const authRoute = require("./router/auth");
const dotenv = require("dotenv");
const User = require("./models/user");
const mongoose = require("mongoose");
const dbConnect = require("./dbConnect");
const morgan = require("morgan")
const helmet= require("helmet")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());
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
app.use(cookieParser())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));

// LOCAL MONGO-DB DATABASE CONNECTION;
// mongoose.connect(process.env.LOCAL_DB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// ONLINE MONGO-DB DATABSE CONNECTION
dbConnect();

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




// SERVER STARTED
app.listen(8000, () => {
  console.log("Listening on port 8000");
});
