// src/utils/api.js

const BASE_URL = "https://your-api-id.execute-api.region.amazonaws.com/devamp/cart"; // Replace with your actual API URL

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}