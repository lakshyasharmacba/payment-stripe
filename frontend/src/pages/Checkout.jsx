import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createCheckoutSession } from "../services/api";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "50px", fontFamily: "sans-serif" }}>
        <h2>No product selected.</h2>
        <button onClick={() => navigate("/")} style={{ padding: "10px 20px", cursor: "pointer" }}>
          Go to Store
        </button>
      </div>
    );
  }

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await createCheckoutSession(product.id);
      if (data.url) {
        window.location.href = data.url; // Redirects to Stripe Checkout
      }
    } catch (err) {
      setError(err.response?.data?.error || "Payment initiation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "450px", margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Checkout Summary</h2>
      <div style={{ background: "#f9f9f9", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <p><strong>Item:</strong> {product.title}</p>
        <p><strong>Total Amount:</strong> ₹{product.price}</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          width: "100%",
          background: "#6772e5",
          color: "white",
          padding: "12px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        {loading ? "Redirecting to Stripe..." : "Proceed to Payment"}
      </button>
    </div>
  );
}