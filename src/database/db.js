const mongoose = require("mongoose");

const uri = process.env.URI;

const connectDb = async () => {
  try {
    mongoose.connect(uri).then(() => console.log("connected!"));
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb