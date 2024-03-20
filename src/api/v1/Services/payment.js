const { StatusCodes } = require("http-status-codes");
const axios = require('axios');
const stripe = require("stripe")("sk_test_51OpQGDSCWE6I9nltT5uinyhpTXG5nNh1e6qSNyPpVgorZxaxyOv9YD261Fx6JO9k1qIpjjMA4DKOsvFFmJNted0y007ASDMOEN")
const pay = async () => {
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
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      }],
    success_url:"https://hello.com",
    cancel_url:"https://hello.com"
    })
  console.log(session);
  let result = { a: "123" }
  return result;
};

const webhook = async (req) => {
  console.log("webhook");
  return "webhook working"
}
module.exports = {
  pay,
  webhook
};
