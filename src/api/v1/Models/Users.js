const mongoose = require("mongoose");
const { Schema } = mongoose;
const UsersSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    isValid: {
      type: Boolean,
      required: false,
      default:false
    },
    isIternaryAllowed: {
      type: Boolean,
      required: false,
      default:true
    },
    isPremium: {
      type: Boolean,
      required: false,
      default:false
    },
    stripeId: {
      type: String,
    },
    stripeCoupon:{
      type: mongoose.Types.ObjectId,
      ref: "Coupon",
    },
    paymentInfo: {
      type: Object,
    },
    firstLogin: {
      type: Boolean,
      required: false,
      default:true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UsersSchema);
