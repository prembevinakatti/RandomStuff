const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Database Connected Successfully");
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  } catch (error) {
    console.log("error", error.message);
  }
};

module.exports = connectDB;
