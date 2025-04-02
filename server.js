const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
const stripe = Stripe("sk_test_51R8t3n03ejpZ5k7BJPu6a9f6usppZsXniTm0BlIbYlFD6t1bQWXroLNh2gt93EPDonuhw2Dg1sBf6U4HYbsCF2yn00gdwrZSrf"); // Replace with your actual secret key

app.use(express.json());
app.use(cors());

app.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: "Support My Work" },
                        unit_amount: 500, // $5.00 donation
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "https://syeda7.github.io/sufa7.github.io/success.html",
            cancel_url: "https://syeda7.github.io/sufa7.github.io/cancel.html",
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
