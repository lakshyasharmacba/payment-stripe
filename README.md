# Stripe Payment Integration App

A complete full-stack Stripe payment gateway integration for **testing purposes**, built with:

* **Backend:** Node.js + Express.js
* **Frontend:** React.js + Vite
* **Payment Gateway:** Stripe
* **Environment:** Stripe Test/Sandbox Mode

This project handles Stripe Checkout creation from the backend and redirects the user to Stripe Checkout from the frontend.

---

## 📁 Project Structure

```text
stripe-payment-app/
│
├── backend/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── .env
│   ├── package.json
│   └── src/
│       ├── App.js
│       ├── Checkout.js
│       └── index.js
│
└── README.md
```

---

# 🚀 Features

* Stripe Test/Sandbox payment integration
* React frontend
* Node.js + Express backend
* Stripe Checkout Session creation
* Success and cancel handling
* CORS configuration
* Environment variable configuration
* Stripe webhook support
* Separate frontend and backend configuration
* Easy local development setup

---

# 🛠️ Requirements

Before running the project, make sure you have installed:

* Node.js
* npm
* Stripe account

Check Node.js:

```bash
node -v
```

Check npm:

```bash
npm -v
```

---

# 🔑 Stripe Test Mode

This project is intended for testing.

Use your Stripe **Test Mode** keys instead of live keys.

You will need:

* Stripe Secret Key
* Stripe Publishable Key
* Stripe Webhook Secret

Do **not** commit secret keys to GitHub.

---

# 📦 Backend Setup

Go to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` folder:

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
FRONTEND_URL=http://localhost:5173
PORT=5000
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### Backend Environment Variables

| Variable                | Description                   | Example                 |
| ----------------------- | ----------------------------- | ----------------------- |
| `STRIPE_SECRET_KEY`     | Stripe secret test key        | `sk_test_...`           |
| `FRONTEND_URL`          | Frontend URL                  | `http://localhost:5173` |
| `PORT`                  | Backend server port           | `5000`                  |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | `whsec_...`             |

---

# ▶️ Run Backend

From the `backend` directory:

```bash
npm run dev
```

If your `package.json` does not have a `dev` script, you can run:

```bash
node server.js
```

Backend should run on:

```text
http://localhost:5000
```

---

# 🎨 Frontend Setup

Open a new terminal.

Go to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
VITE_API_BASE_URL=http://localhost:5000
```

### Frontend Environment Variables

| Variable                      | Description                 | Example                 |
| ----------------------------- | --------------------------- | ----------------------- |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable test key | `pk_test_...`           |
| `VITE_API_BASE_URL`           | Backend API URL             | `http://localhost:5000` |

---

# ▶️ Run Frontend

From the `frontend` directory:

```bash
npm run dev
```

Vite will normally start the frontend at:

```text
http://localhost:5173
```

Open this URL in your browser.

---

# 🔄 Run Complete Project

You need two terminals.

### Terminal 1 — Backend

```bash
cd stripe-payment-app/backend
npm install
npm run dev
```

### Terminal 2 — Frontend

```bash
cd stripe-payment-app/frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# 💳 Payment Flow

The payment flow works like this:

```text
React Frontend
      │
      │ Create Checkout Session
      ▼
Node.js / Express Backend
      │
      │ Stripe API
      ▼
Stripe Checkout
      │
      │ Test Payment
      ▼
Success / Cancel
      │
      ▼
React Frontend
```

The Stripe **Secret Key must only be used on the backend**.

The frontend should only use:

```env
VITE_STRIPE_PUBLISHABLE_KEY
```

Never expose:

```env
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
```

to the frontend.

---

# 🧪 Stripe Test Payment

For testing, use Stripe's official test card numbers.

Example successful test card:

```text
Card Number: 4100 2800 0000 1007
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any valid ZIP/postal code
```

Example:

```text
4012 8888 8888 1881
12/30
123
```

These cards are for Stripe test mode only.

---

# 🔔 Stripe Webhook Setup

The backend supports Stripe webhook handling using:

```env
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

For local development, Stripe CLI can forward webhook events to your local server.

Install and authenticate the Stripe CLI, then run:

```bash
stripe login
```

Forward Stripe events to your backend:

```bash
stripe listen --forward-to localhost:5000/api/webhook
```

The Stripe CLI will display a webhook signing secret similar to:

```text
whsec_XXXXXXXXXXXXXXXX
```

Copy that value into:

```env
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXX
```

Then restart your backend.

---

# 📡 Webhook Endpoint

The backend webhook endpoint is:

```text
POST /api/webhook
```

Local URL:

```text
http://localhost:5000/api/webhook
```

The webhook should use Stripe's raw request body so that the Stripe signature can be verified correctly.

Do not parse the webhook body with normal JSON middleware before Stripe verifies the signature.

---

# 🔐 Environment Files

## Backend `.env`

Location:

```text
backend/.env
```

Example:

```env
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxx
FRONTEND_URL=http://localhost:5173
PORT=5000
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxx
```

## Frontend `.env`

Location:

```text
frontend/.env
```

Example:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxx
VITE_API_BASE_URL=http://localhost:5000
```

---

# ⚠️ Important Security Rules

Never commit `.env` files to GitHub.

Add this to your `.gitignore`:

```gitignore
node_modules/
.env
.env.local
dist/
```

The following values are secret and must stay on the backend:

```env
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
```

The frontend can contain:

```env
VITE_STRIPE_PUBLISHABLE_KEY
VITE_API_BASE_URL
```

Remember that Vite variables prefixed with `VITE_` are exposed to the browser.

---

# 🧩 Backend API

The backend should expose an endpoint for creating a Stripe Checkout Session.

Example:

```text
POST /api/create-checkout-session
```

The frontend sends the product/payment information to this endpoint.

The backend then:

1. Validates the request.
2. Creates a Stripe Checkout Session.
3. Uses the Stripe Secret Key.
4. Returns the Checkout Session information.
5. Frontend redirects the customer to Stripe Checkout.

---

# 🏁 Success and Cancel URLs

The backend should use the configured frontend URL:

```env
FRONTEND_URL=http://localhost:5173
```

For example:

```text
http://localhost:5173/success
```

and:

```text
http://localhost:5173/cancel
```

This keeps the frontend URL configurable between local development, staging, and production.

---

# 📋 Complete Environment Configuration

### Backend

```env
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxx
FRONTEND_URL=http://localhost:5173
PORT=5000
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxx
```

### Frontend

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxx
VITE_API_BASE_URL=http://localhost:5000
```

---

# 🧪 Testing Checklist

Before testing a payment, make sure:

* [ ] Backend dependencies are installed.
* [ ] Frontend dependencies are installed.
* [ ] Backend `.env` is configured.
* [ ] Frontend `.env` is configured.
* [ ] Stripe is in Test Mode.
* [ ] Backend is running.
* [ ] Frontend is running.
* [ ] CORS allows the frontend URL.
* [ ] Stripe Secret Key is configured correctly.
* [ ] Stripe Publishable Key is configured correctly.
* [ ] Webhook secret is configured if webhook testing is enabled.

---

# 🐛 Common Problems

## Backend cannot start

Run:

```bash
cd backend
npm install
npm run dev
```

Or:

```bash
node server.js
```

Check that the `.env` file exists.

---

## Frontend cannot start

Run:

```bash
cd frontend
npm install
npm run dev
```

Make sure the frontend `.env` contains:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_API_BASE_URL=http://localhost:5000
```

After changing a Vite `.env` file, restart the frontend development server.

---

## CORS Error

Make sure:

```env
FRONTEND_URL=http://localhost:5173
```

matches the actual frontend URL.

If Vite is running on another port, update the value accordingly.

---

## Webhook Signature Error

Make sure:

```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

contains the webhook secret generated for the endpoint you're forwarding to.

When using Stripe CLI:

```bash
stripe listen --forward-to localhost:5000/api/webhook
```

copy the `whsec_...` secret shown by the CLI.

Also make sure the webhook route receives the raw request body for Stripe signature verification.

---

# 📂 Final Folder Structure

```text
stripe-payment-app/
│
├── backend/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── .env
│   ├── package.json
│   └── src/
│       ├── App.js
│       ├── Checkout.js
│       └── index.js
│
├── .gitignore
│
└── README.md
```

---

# 🚀 Quick Start

### 1. Clone/open the project

```bash
cd stripe-payment-app
```

### 2. Setup backend

```bash
cd backend
npm install
```

Create:

```text
backend/.env
```

Add:

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key
FRONTEND_URL=http://localhost:5173
PORT=5000
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

Start:

```bash
npm run dev
```

---

### 3. Setup frontend

Open another terminal:

```bash
cd stripe-payment-app/frontend
npm install
```

Create:

```text
frontend/.env
```

Add:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
VITE_API_BASE_URL=http://localhost:5000
```

Start:

```bash
npm run dev
```

---

### 4. Open the application

```text
http://localhost:5173
```

---

# ✅ Done

The complete testing setup is now:

```text
Frontend
http://localhost:5173
        │
        ▼
Backend API
http://localhost:5000
        │
        ▼
Stripe Test Mode
        │
        ▼
Checkout
        │
        ▼
Webhook
http://localhost:5000/api/webhook
```

Use **Stripe Test Mode** while developing and testing. Never put live Stripe secret keys in the frontend or commit them to source control.
