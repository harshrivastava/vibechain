import { useState } from "react";
import { keccak256, toUtf8Bytes } from "ethers"; // hash generator

import { addProductOnChain } from "../blockchain/blockchainService";

export default function ProductForm({ wallet, onSubmit }) {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    batch: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert product data to JSON string
      const productString = JSON.stringify(product);

      // Generate hash (unique ID on blockchain)
      const hash = keccak256(toUtf8Bytes(productString));
      console.log("Generated Hash:", hash);

      // 1. Add to Blockchain (Real)
      // We use 'batch' as the SKU
      const txResult = await addProductOnChain(hash, product.batch, wallet.signer);
      console.log("Blockchain Tx:", txResult);

      // 2. Pass to parent (App.jsx) -> Saves to Backend
      // We pass the hash as the productIdOnChain (for URL lookup)
      // And we save the real numeric ID in metadata
      await onSubmit({
        ...product,
        hash,
        txHash: txResult.txHash,
        blockchainId: txResult.productId
      });

    } catch (error) {
      console.error("Error in product creation flow:", error);
      alert("Failed to create product on chain");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px", maxWidth: "400px" }}>
      <h2>Add Product</h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        onChange={handleChange}
        required
      /><br /><br />

      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        required
      /><br /><br />

      <input
        type="text"
        name="batch"
        placeholder="Batch Number"
        onChange={handleChange}
        required
      /><br /><br />

      <input
        type="date"
        name="date"
        onChange={handleChange}
        required
      /><br /><br />

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "10px 20px",
          background: loading ? "#ccc" : "#0f62fe",
          color: "#fff",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Processing on Blockchain..." : "Generate & Save"}
      </button>
    </form>
  );
}
