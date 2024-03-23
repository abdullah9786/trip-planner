const { StatusCodes } = require("http-status-codes");
const axios = require('axios');
const { BadRequestError } = require("../../../Errors");
const Users = require("../Models/Users");
const { purchasedTemplate } = require("../Helpers/mail-templates/plan-purchased");
const stripe = require("stripe")("sk_test_51OpQGDSCWE6I9nltT5uinyhpTXG5nNh1e6qSNyPpVgorZxaxyOv9YD261Fx6JO9k1qIpjjMA4DKOsvFFmJNted0y007ASDMOEN")
const checkoutSession = async (userId) => {
  console.log("session",userId);
  // Make a request to the OpenAI API
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [{
      price_data: {
        // The currency parameter determines which
        // payment methods are used in the Checkout Session.
        currency: 'inr',
        product_data: {
          name: 'Iternary',
        },
        unit_amount: 1000,
      },
      quantity: 1,
    }],
    success_url: "https://hello.com",
    cancel_url: "https://hello.com",
    metadata: {
      userId: userId,
  },
  })
  console.log('session');
  let result = session
  return result;
};

const webhook = async (req,res) => {
  console.log("webhook");
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, 'whsec_N1T72pagRcQIoqUq8TRyyqSBwCtVLf0B');
  } catch (err) {
    throw new BadRequestError(`Webhook Error: ${err.message}`, "payement service");
  }

  // console.log(event, "eventtype");
  // Handle the payment_intent.succeeded event
  if (event.type === 'checkout.session.completed') {
    const paymentIntent = event.data.object;

    let user = await Users.findOne({ _id: paymentIntent.metadata.userId });
    user.isPremium = true
    user.isIternaryAllowed = true
    user.paymentInfo = paymentIntent
    await user.save()
    console.log(paymentIntent);
    await sendMail(purchasedTemplate,user.email)
    // res.status(200).end();
    return "webhook working"
  }
}
  module.exports = {
    checkoutSession,
    webhook
  };
