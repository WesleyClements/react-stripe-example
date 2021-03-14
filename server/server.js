import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";

dotenv.config();

const PORT = 3001

const stripe = Stripe(process.env.STRIPE_API_KEY);

const app = express();

app.use(express.static("."));
app.use(express.json());

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/api/payment-intent", async (req, res, next) => {
  try {
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd"
    });
    res.status(201).json({
      clientSecret: paymentIntent.client_secret
    });
  } catch(err) {
    next(err);
  }
})

app.post("/api/checkout-session", async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://example.com/success.html',
      cancel_url: 'https://example.com/cancel.html',
    });

    res.status(201).json({ id: session.id });
  } catch(err) {
    next(err);
  }
});

app.listen(PORT, () => console.log("Listening on %s", PORT))