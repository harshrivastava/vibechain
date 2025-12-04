const axios = require("axios");

async function testBackend() {
    const url = "http://localhost:4000/api/products";
    const validData = {
        productIdOnChain: "0x123",
        vendorAddress: "0xABC",
        name: "Test Product",
        description: "This is a test product",
        metadata: { color: "red" }
    };

    const invalidData = {
        name: "Invalid Product" // Missing required fields
    };

    try {
        console.log("Testing Valid Data...");
        const res1 = await axios.post(url, validData);
        console.log("Valid Data Response:", res1.status, res1.data);
    } catch (err) {
        console.error("Valid Data Error:", err.code, err.message, err.response ? err.response.data : "No response");
    }

    try {
        console.log("\nTesting Invalid Data...");
        const res2 = await axios.post(url, invalidData);
        console.log("Invalid Data Response:", res2.status, res2.data);
    } catch (err) {
        console.error("Invalid Data Error:", err.code, err.message, err.response ? err.response.data : "No response");
    }
}

testBackend();
