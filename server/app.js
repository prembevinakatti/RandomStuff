const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const AuthRoute = require("./routes/auth.route");
const AdminRoute = require("./routes/admin.route");
const OAuthRoute = require("./routes/oauth.route");
const ProfileRoute = require("./routes/userprofile.route");
const ProjectRoute = require("./routes/project.route");
const CommentRoute = require("./routes/comment.route");
const session = require("express-session");
const passport = require("passport");
const uploadRoute = require("./routes/upload.route");
const notificationRoutes = require("./routes/notification.route");

const { server, app } = require("./server");

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
app.use("/api/randomstuff/profile", ProfileRoute);
app.use("/api/randomstuff/project", ProjectRoute);
app.use("/api/randomstuff/comment", CommentRoute);
app.use("/api/randomstuff/notification", notificationRoutes);
app.use("/api/pinata/upload", uploadRoute);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
