const User = require("../models/user");
const axios = require("axios");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const saltRounds = parseInt(process.env.SALT_ROUNDS);

module.exports = {
  signUp: async (req, res) => {
    try {
      if (req.body.googleAccessToken) {
        //google 0Auth sign up
        const response = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${req.body.googleAccessToken}`,
            },
          }
        );

        const firstName = response.data.given_name;
        const lastName = response.data.family_name;
        const email = response.data.email;
        const picture = response.data.picture;
        const googleId = response.data.sub;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return res.status(200).json({ existingUser });
        }
        const newUser = await User.create({
          firstName,
          lastName,
          email,
          picture,
          googleId,
        });
        const token = jwt.sign(
          {
            email: newUser.email,
            id: newUser._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );
        console.log("finished");
        return res.status(200).json({ token, newUser });
      } else {
        
        const { email,password,phonenumber,username,confirmPassword} = req.body;
        if(password!== confirmPassword)return res.status(400).json({ err: "password and confirm password should match" });
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
          const newUser = await User.create({
            email,
            password: passwordHash,
            phonenumber,
            username,
          });

          return res.status(200).json({ message: "Registration Successful" });
        }
        return res.status(200).json({ message: "user has already exists" });
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  },

  signIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ err: "user not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch);
      if (!isMatch)
        return res.status(401).json({ err: "password does not match" });

      const formattedUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      const accessToken = jwt.sign(
        { userInfo: { userId: user._id, email: user.email } },
        accessTokenSecret,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign({ userId: user._id }, refreshTokenSecret, {
        expiresIn: "10h",
      });
      res.cookie("Jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({ formattedUser, accessToken });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  },
  refresh: async (req, res) => {
    try {
      const { Jwt } = req.cookies;

      if (!Jwt) return res.status(401).json({ message: "Unauthorized" });

      const refreshToken = Jwt;
      jwt.verify(refreshToken, refreshTokenSecret, async (err, decoded) => {
        try {
          console.log(decoded);
          if (err) return res.status(403).json({ message: "Forbidden" });
          const foundUser = await User.findOne({ _id: decoded.userId });
          console.log(foundUser);
          if (!foundUser)
            return res.status(401).json({ message: "Unauthorized" });

          const accessToken = jwt.sign(
            { userInfo: { userId: foundUser._id, email: foundUser.email } },
            accessTokenSecret,
            {
              expiresIn: "10m",
            }
          );
          res.status(200).json({ accessToken });
        } catch (err) {
          res.status(500).json({ err: err.message });
        }
      });
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  },
  logOut: async (req, res) => {
    try {
      res.redirect("http://localhost:5173");
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  },
  testing: (req, res) => {
    const { name } = req.body;
    console.log("fdkjf");
    res.status(200).json({ message: `its working ${name}` });
  },
};
