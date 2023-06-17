import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const verifyUser = async (req, res, next) => {
  const accessSecret = process.env.ACCESS_TOKEN_SECRET;
  const authHeader = req.headers.authorization || req.headers.Authorization;
  try {
    
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(' ')[1]
    jwt.verify(token, accessSecret, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Unauthorized" });
      req.user = decoded.userInfo.userId;
      req.email = decoded.userInfo.email;
      console.log(req.email);
      next();
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

