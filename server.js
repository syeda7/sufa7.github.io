const express = require("express");
const stripe = require("stripe")("sk_test_51R8t3n03ejpZ5k7BJPu6a9f6usppZsXniTm0BlIbYlFD6t1bQWXroLNh2gt93EPDonuhw2Dg1sBf6U4HYbsCF2yn00gdwrZSrf"); // Replace with your Secret Key
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/create-checkout-session", async (req, res) => {
    try {
        const { email, amount } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            customer_email: email,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: "Support Donation" },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "https://sufa7-github-io.onrender.com/success",
            cancel_url: "https://sufa7-github-io.onrender.com/cancel",
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
