const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");
require("dotenv").config();
const token_secret = process.env.TOKEN_SECRET;

// authenticate user with jwt token (verify)
const auth = async (req, res, next) => {
  try {
    let user_token = req.header("Authorization");
    const token = user_token.replace("Bearer ", "");
    const decoded = jwt.verify(token, token_secret);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("User not found");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("Please authenticate");
  }
};

module.exports = auth;
