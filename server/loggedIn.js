const jwt = require("jsonwebtoken");
const User = require("./models/User");
require("dotenv").config();

const verify = async (req, res, next) => {
  try {
    //console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const users = await User.find({});
    req.verified = users.filter((user) => user.twitchId === decodedData.id);
    if (!req.verified)
      return res.status(500).json({ message: "Unauthorized action!" });

    next();
  } catch (error) {
    return res.status(500).json({ message: "Unauthorized action!" });
  }
};

module.exports = verify;
