const { StatusCodes } = require("http-status-codes");
const axios = require('axios');
const { BadRequestError } = require("../../../Errors");
const Users = require("../Models/Users");
const { purchasedTemplate } = require("../Helpers/mail-templates/plan-purchased");
const { sendMail } = require("../Helpers/mail-sender");
const stripe = require("stripe")(process.env.stripe_secret_key)
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
        currency: 'usd',
        product_data: {
          name: 'Tourplanner Pro',
          description:"Generate Itineraries in Seconds using AI"
        },
        unit_amount: 1*100,
      },
      quantity: 1,
    }],
    success_url: "https://www.tourplanner.ai/plans?payment=success",
    cancel_url: "https://www.tourplanner.ai/plans?payment=failure",
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
    await sendMail('Payment Success', purchasedTemplate,user.email)
    // res.status(200).end();
    return "webhook working"
  }
}
  module.exports = {
    checkoutSession,
    webhook
  };
