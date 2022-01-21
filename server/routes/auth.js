const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = process.env.CLIENT_URL;
//const CLIENT_URL = `http://localhost:3000`;
// ON SUCCESFULL LOGIN
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } else {
    res.status(500).json({ message: "No user found" });
  }
});

// ON FAILED LOGIN
router.get("/login/failed", (req, res) => {
  console.log("Login failed");
  res.setStatus(401).send("Failed to login");
});

// LOGOUT
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

// LOG IN VIA TWITCH
router.get("/twitch", passport.authenticate("twitch"));

router.get(
  "/twitch/callback",
  passport.authenticate("twitch", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
module.exports = router;
