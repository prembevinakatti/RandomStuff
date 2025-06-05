const mongoose = require("mongoose");

const oauthShcema = new mongoose.Schema({
  oauthId: {
    type: String,
  },
  provider: {
    type: String,
  },
  displayName: {
    type: String,
  },
  email: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
});

module.exports = mongoose.model("OAuth", oauthShcema);
