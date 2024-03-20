const User = require("../Models/Users.js");
const { StatusCodes } = require("http-status-codes");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const BadRequestError = require("../../../Errors/bad-request.js");
const NotFoundError = require("../../../Errors/not-found.js");
const { default: axios } = require("axios");
const stripe = require("stripe")("sk_test_51OpQGDSCWE6I9nltT5uinyhpTXG5nNh1e6qSNyPpVgorZxaxyOv9YD261Fx6JO9k1qIpjjMA4DKOsvFFmJNted0y007ASDMOEN")

const get = async () => {
  console.log("Working");
  let result = await User.find().populate("stripeCoupon")
  return result;
};

const create = async (data) => {
  console.log(process.env.JWT_SECRET);
  let result
  let token = jwt.sign({ email: data.email }, process.env.JWT_SECRET);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'abdullahansari9768@gmail.com',
      pass: 'vgvk fdhs ikdo ljze',
    },
  });

  const mailOptions = {
    from: 'abdullahansari9768@gmail.com',
    to: data.email,
    subject: 'Email Verification',
    html: `Click <a href="http://yourdomain.com/verify?token=${token}">here</a> to verify your email.`,
  };

  const user = await User.findOne({ email: data.email });
  console.log(user);
  if (user) {
    await transporter.sendMail(mailOptions);
  }
  else {
    let createdUser = await User.create(data);
    const customer = await stripe.customers.create({
      name: data.email,
      email: data.email,
    });
    result = await User.findByIdAndUpdate(
      createdUser._id,
      { stripeId: customer.id },
      { new: true } // Return the updated document
    );
  }


  return "Click the link you received in mail";
};

const update = async (userId, couponStatus) => {
  let result = await User.findOneAndUpdate(
    { _id: userId },
    { isPremium: couponStatus },
    { returnDocument: "after", runValidators: true }
  ).populate('stripeCoupon');
  return result;
};

const verify = async (token) => {
  console.log("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuc2h1bHRhdGVkMTk5OUBnbWFpbC5jb20iLCJpYXQiOjE3MDk4MjIwOTR9.SFCszu746Q2AGF7zA0PvJ_Q46J8QrvApQj1I0J3hsyA");
  if (!token) {
    throw new BadRequestError("Token is missing", "user service");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ email: decoded.email });

  if (!user) {
    throw new NotFoundError("Inavlid", "user service");
  }

  if (user.isValid) {
    return user;
  }

  user.isValid = true;
  await user.save();
  return user;

};

const googleLogin = async (token) => {
  if (!token) {
    throw new BadRequestError("Token is missing", "user Service");
  }
  const res = await axios.get(
    "https://www.googleapis.com/oauth2/v1/userinfo",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  let user = await User.findOne({ email: res.data.email });

  if (user) {
    user.isValid = true;
    await user.save();
  }
  else{
    let createdUser = await User.create({email:res.data.email, isValid:true});
    const customer = await stripe.customers.create({
      name: res.data.email,
      email: res.data.email,
    });
    user = await User.findByIdAndUpdate(
      createdUser._id,
      { stripeId: customer.id },
      { new: true } // Return the updated document
    );
  }

  return user;



};

module.exports = {
  create,
  get,
  update,
  verify,
  googleLogin
};
