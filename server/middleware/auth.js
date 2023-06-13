

const verifyUser = async (req, res, next) => {
  try {
    const user = await req.user;
    if (!user) {
      return res.status(403).send("Access Denied");
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = verifyUser;
