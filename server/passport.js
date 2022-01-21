const TwitchStrategy = require("@d-fischer/passport-twitch").Strategy;
const jwt = require("jsonwebtoken");
const User = require("./models/User");
require("dotenv").config();
const passport = require("passport");

passport.use(
  new TwitchStrategy(
    {
      clientID: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
      callbackURL:
        process.env.TWITCH_CALLBACK_URL ||
        "http://localhost:8080/auth/twitch/callback",

      scope: "user_read",
    },
    async function (accessToken, refreshToken, profile, done) {
      const token = jwt.sign(
        { name: profile.display_name, id: profile.id },
        process.env.JWT_SECRET
      );
      profile.token = token;
      try {
        const user = await User.findOne({ twitchId: profile.id });
        if (!user) {
          const newUser = new User({
            display_name: profile.display_name,
            twitchId: profile.id,
            email: profile.email,
          });

          await newUser.save();
        }
      } catch (error) {
        console.log(error.message);
      }

      console.log(`User ${profile.display_name} has logged in`);
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
