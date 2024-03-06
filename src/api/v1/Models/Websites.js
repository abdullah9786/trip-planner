const mongoose = require("mongoose");
const { Schema } = mongoose;
const WebsitesSchema = new Schema(
  {
    websiteName: {
      type: String,
      unique: true,
      required: true,
    },
    createdBy: {
      type: String,
      unique: false,
      required: true,
    },
    customFields:{
      type: Boolean,
      default: false
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Website", WebsitesSchema);
