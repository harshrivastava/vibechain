import { useState } from "react";
import { createSecureProductRecord } from "../blockchain/blockchainService";

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
      // Generate secure product record with MetaMask signature
      console.log("🔐 Creating secure product record with MetaMask signature...");
      const record = await createSecureProductRecord(product, wallet.address, wallet.signer);
      console.log("✅ Product Signed:", record);

      // Pass to parent (App.jsx) -> Saves to Backend
      await onSubmit({
        ...product,
        hash: record.hash,
        signature: record.signature,
        timestamp: record.timestamp,
        vendorAddress: record.vendor
      });

    } catch (error) {
      console.error("❌ Error in product creation:", error);

      // Better error messages
      let errorMessage = "Failed to create product";

      if (error.code === 4001 || error.code === "ACTION_REJECTED") {
        errorMessage = "Signature rejected by user";
      } else if (error.message?.includes("user rejected")) {
        errorMessage = "Signature rejected by user";
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }

      alert(`❌ ${errorMessage}\n\nCheck console for details.`);
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
        {loading ? "Requesting Signature..." : "Sign & Save Product"}
      </button>
    </form>
  );
}
