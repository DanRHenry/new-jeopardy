const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

const validateSession = async (req, res, next) => {
  try {
    // console.log("req.url: ", req.url)
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.JWT);
    const user = await User.findById(decodedToken.id);
    if (!user) throw Error("User not found.");
    req.user = user;

    return next();
  } catch (err) {
    res.json({ message: err.message });
  }
};
module.exports = validateSession;
