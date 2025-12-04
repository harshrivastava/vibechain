const axios = require("axios");
const { keccak256, toUtf8Bytes } = require("ethers");

async function testVerification() {
    const baseUrl = "http://localhost:4000/api/products";

    // 1. Create Product Data
    const productData = {
        name: "Verify Test Product",
        description: "Testing verification logic",
        batch: "BATCH-001",
        date: "2023-10-27"
    };

    // Generate Hash (simulating frontend logic)
    const productString = JSON.stringify(productData);
    const hash = keccak256(toUtf8Bytes(productString));

    const payload = {
        productIdOnChain: hash,
        vendorAddress: "0xTestVendorAddress",
        name: productData.name,
        description: productData.description,
        metadata: productData
    };

    try {
        // 2. Save to Backend
        console.log("Saving product...");
        const createRes = await axios.post(baseUrl, payload);
        console.log("Save Status:", createRes.status);

        if (createRes.status !== 201) {
            throw new Error("Failed to save product");
        }

        // 3. Fetch by Hash
        console.log(`Fetching product by hash: ${hash}...`);
        const verifyUrl = `${baseUrl}/hash/${hash}`;
        const verifyRes = await axios.get(verifyUrl);

        console.log("Fetch Status:", verifyRes.status);
        console.log("Fetched Product Name:", verifyRes.data.name);

        if (verifyRes.data.productIdOnChain === hash) {
            console.log("✅ Verification SUCCESS: Hash matches!");
        } else {
            console.error("❌ Verification FAILED: Hash mismatch!");
        }

    } catch (err) {
        console.error("Test Failed:", err.message);
        if (err.response) {
            console.error("Response Data:", err.response.data);
        }
    }
}

testVerification();
