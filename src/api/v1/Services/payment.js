const { StatusCodes } = require("http-status-codes");
const axios = require('axios');
const stripe = require("stripe")("sk_test_51OpQGDSCWE6I9nltT5uinyhpTXG5nNh1e6qSNyPpVgorZxaxyOv9YD261Fx6JO9k1qIpjjMA4DKOsvFFmJNted0y007ASDMOEN")
const checkoutSession = async () => {
  console.log("session");
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
    cancel_url: "https://hello.com"
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
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(event.type, "eventtype");
  // Handle the payment_intent.succeeded event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    console.log(paymentIntent);

    res.status(200).end();
    return "webhook working"
  }
}
  module.exports = {
    checkoutSession,
    webhook
  };
