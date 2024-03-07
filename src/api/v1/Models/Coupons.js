const mongoose = require("mongoose");
const { Schema } = mongoose;
const CouponsSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    percent_off: {
      type: Number,
      required: false,
      default:100
    },
    stripeCouponId: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", CouponsSchema);
