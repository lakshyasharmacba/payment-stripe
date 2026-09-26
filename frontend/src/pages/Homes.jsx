import React from "react";
import { useNavigate } from "react-router-dom";

export default function Homes() {
  const navigate = useNavigate();

  const products = [
    { id: "1", title: "Starter Workbook", price: 299 },
    { id: "2", title: "Pro Workbook 2026 Edition", price: 499 },
    { id: "3", title: "Ultimate Developer Bundle", price: 999 },
  ];

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>Available Products</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap", marginTop: "30px" }}>
        {products.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              padding: "25px",
              borderRadius: "10px",
              width: "220px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <h3>{item.title}</h3>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>₹{item.price}</p>
            <button
              onClick={() => navigate("/checkout", { state: { product: item } })}
              style={{
                background: "#28a745",
                color: "white",
                padding: "10px 18px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}