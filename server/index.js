const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
const authRoute = require("./routes/auth.js");
const path = require("path");
const passportSetup = require("./passport.js");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const gameRoute = require("./routes/gamesroute");
require("dotenv").config();

//DB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
//Middleware

app.use(
  cookieSession({
    name: process.env.SESSION_NAME,
    keys: [process.env.SESSION_KEY],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://quin-sheet.herokuapp.com"],
    credentials: true,
  })
);

app.use("/api/game", gameRoute);
app.use("/auth", authRoute);

app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
