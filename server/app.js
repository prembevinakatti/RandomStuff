const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const AuthRoute = require("./routes/auth.route");
const AdminRoute = require("./routes/admin.route");
const OAuthRoute = require("./routes/oauth.route");
const session = require("express-session");
const passport = require("passport");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));

app.use("/api/randomstuff/auth", AuthRoute);
app.use("/api/randomstuff/admin", AdminRoute);
app.use("/api/randomstuff/oauth", OAuthRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
