const User = require("../Models/Users.js");
const { StatusCodes } = require("http-status-codes");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const BadRequestError = require("../../../Errors/bad-request.js");
const NotFoundError = require("../../../Errors/not-found.js");
const stripe = require("stripe")("sk_test_51OpQGDSCWE6I9nltT5uinyhpTXG5nNh1e6qSNyPpVgorZxaxyOv9YD261Fx6JO9k1qIpjjMA4DKOsvFFmJNted0y007ASDMOEN")

const get = async () => {
  let result = await User.find()
  return result;
};

const create = async (data) => {
  console.log(process.env.JWT_SECRET);
  console.log(data);
  let createdUser = await User.create(data);
  const customer = await stripe.customers.create({
    name: data.email,
    email: data.email,
  });
  console.log(customer.id, "asdsad");

  let result = await User.findByIdAndUpdate(
    createdUser._id,
    { stripeId: customer.id },
    { new: true } // Return the updated document
  );
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
    to: 'abdullahansari9768@gmail.com',
    subject: 'Email Verification',
    html: `Click <a href="http://yourdomain.com/verify?token=${token}">here</a> to verify your email.`,
  };
  console.log(token);
  // await transporter.sendMail(mailOptions);
  return result;
};

const update = async (userId, couponStatus) => {
  let result = await User.findOneAndUpdate(
    { _id: userId },
    { isPremium: couponStatus},
    { returnDocument: "after", runValidators: true }
  );
  return result;
};

const verify = async (token) => {
  if (!token) {
    throw new BadRequestError("Token is missing", "Validator Middleware");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ email: decoded.email });

  if (!user) {
    throw new NotFoundError("Token is missing", "Validator Middleware");
  }

  if (user.isValid) {
    return { isValid: true };
  }

  user.isValid = true;
  await user.save();
  return { isValid: true };

};

const verifyGoogleUser = async (token) => {
  if (!token) {
    // return res.status(400).json({ error: 'Token is missing.' });
    throw new BadRequestError("Token is missing", "Validator Middleware");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ email: decoded.email });

  if (!user) {
    throw new NotFoundError("Token is missing", "Validator Middleware");
  }

  if (user.isValid) {
    return { isValid: true };
  }

  user.isValid = true;
  await user.save();
  return { isValid: true };

};

module.exports = {
  create,
  get,
  update,
  verify,
  verifyGoogleUser
};
