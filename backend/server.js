require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

// ----------------------------------------------------
// 1. STRIPE WEBHOOK (Must use raw body parsing)
// ----------------------------------------------------
app.post(
  "/api/webhooks/stripe",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const signature = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.error("Webhook Verification Failed:", error.message);
      return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    // Handle completed checkout session
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      
      console.log("-----------------------------------------");
      console.log("✅ Payment Successful!");
      console.log("Customer Email:", session.customer_details?.email);
      console.log("Amount Paid:", session.amount_total / 100, session.currency.toUpperCase());
      console.log("Session ID:", session.id);
      console.log("Product ID:", session.metadata?.productId);
      console.log("-----------------------------------------");

      // Place database fullfillment/order creation logic here
    }

    res.json({ received: true });
  }
);

// Standard JSON middleware for other routes
app.use(express.json());

// ----------------------------------------------------
// 2. CREATE CHECKOUT SESSION (3 Products Support)
// ----------------------------------------------------
const PRODUCTS = {
  "1": { name: "Starter Workbook", price: 299 },
  "2": { name: "Pro Workbook 2026 Edition", price: 499 },
  "3": { name: "Ultimate Developer Bundle", price: 999 },
};

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { productId } = req.body;
    const product = PRODUCTS[productId];

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: product.name,
            },
            unit_amount: product.price * 100, // Price in paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      metadata: {
        productId: productId,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Checkout Session:", error.message);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

app.get("/", (req, res) => {
  res.send("Stripe Server Running");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server listening on port ${process.env.PORT || 5000}`);
});