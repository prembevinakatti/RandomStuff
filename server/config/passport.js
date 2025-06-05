const passport = require("passport");
const oauthModel = require("../models/oauth.model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/randomstuff/oauth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // find user by oauth id and provider
        let user = await oauthModel.findOne({
          oauthId: profile.id,
          provider: "google",
        });

        if (!user) {
          // create new user
          user = new oauthModel({
            oauthId: profile.id,
            provider: "google",
            displayName: profile.displayName,
            email: profile.emails?.[0]?.value,
            photo: profile.photos?.[0]?.value,
          });
          await user.save();
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await oauthModel.findOne({
          oauthId: profile.id,
          provider: "github",
        });

        if (!user) {
          user = new oauthModel({
            oauthId: profile.id,
            provider: "github",
            displayName: profile.displayName || profile.username,
            email: profile.emails?.[0]?.value,
            photo: profile.photos?.[0]?.value,
          });
          await user.save();
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
