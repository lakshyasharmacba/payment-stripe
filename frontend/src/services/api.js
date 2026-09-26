import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const createCheckoutSession = async (productId) => {
  const response = await API.post("/create-checkout-session", { productId });
  return response.data;
};