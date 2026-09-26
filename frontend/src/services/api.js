import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const createCheckoutSession = async (productId) => {
  const response = await API.post("/create-checkout-session", { productId });
  return response.data;
};