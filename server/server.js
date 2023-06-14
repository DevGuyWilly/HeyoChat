
import express from "express"
import session from "express-session";
import cors from "cors"
import authRoute from "./router/auth.js"
import dotenv from 'dotenv'
import dbConnect from "./dbConnect.js"

import morgan from "morgan";
import helmet from "helmet"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.urlencoded({ extended: true }));

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
app.use(
  cors({
    // CLIENT SIDE ORIGIN
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials:true
  })
  
);

// LOCAL MONGO-DB DATABASE CONNECTION;
// mongoose.connect(process.env.LOCAL_DB_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// ONLINE MONGO-DB DATABSE CONNECTION
dbConnect();

// ROOT ROUTES TO ALL ENDPOINT
app.use("/auth", authRoute);

// SERVER STARTED
app.listen(8000, () => {
  console.log("Listening on port 8000");
});
