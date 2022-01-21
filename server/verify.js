const jwt = require("jsonwebtoken");
require("dotenv").config();

const verify = (req, res, next) => {
  try {
    //console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    const REAPEAH = "31120920";
    const INSTABILITY = "53771040";
    const QUIN = "56649026";
    const ALLOWED_IDS = [REAPEAH, INSTABILITY, QUIN];
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    if (ALLOWED_IDS.includes(decodedData.id)) req.verified = true;
    else return res.status(500).json({ message: "Unauthorized action!" });

    next();
  } catch (error) {
    return res.status(500).json({ message: "Unauthorized action!" });
  }
};

module.exports = verify;
