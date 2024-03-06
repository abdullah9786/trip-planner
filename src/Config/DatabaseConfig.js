const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB = (url) => {
  return mongoose
    .connect(url,{autoIndex: true, })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
