import axios from "axios";

export async function saveProduct(data) {
  try {
    const res = await axios.post("http://localhost:4000/api/products", data);
    return res.data;
  } catch (err) {
    console.error("Error saving product:", err);
    throw err;
  }
}
