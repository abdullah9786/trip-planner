const mongoose = require("mongoose");
const { Schema } = mongoose;
const iternarySchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    response: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Iternary", iternarySchema);
