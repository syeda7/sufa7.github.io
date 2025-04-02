require("dotenv").config();
const stripe = require("stripe")(process.env.sk_test_51R8t3n03ejpZ5k7BJPu6a9f6usppZsXniTm0BlIbYlFD6t1bQWXroLNh2gt93EPDonuhw2Dg1sBf6U4HYbsCF2yn00gdwrZSrf);

exports.handler = async function(event, context) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Support Donation" },
            unit_amount: 5000, // $50.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://syeda7.github.io/sufa7.github.io//success",
      cancel_url: "https://syeda7.github.io/sufa7.github.io//cancel",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
