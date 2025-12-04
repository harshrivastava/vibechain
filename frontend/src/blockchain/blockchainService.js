import { keccak256, toUtf8Bytes } from "ethers";

/**
 * Create a secure product record with MetaMask signature
 * @param {Object} productData - Product information
 * @param {string} vendorAddress - Vendor's wallet address
 * @param {ethers.Signer} signer - MetaMask signer
 * @returns {Promise<{hash: string, signature: string, timestamp: number, vendor: string}>}
 */
export async function createSecureProductRecord(productData, vendorAddress, signer) {
    console.log("🔐 Generating product hash...");

    // Generate unique hash from product data
    const productString = JSON.stringify(productData);
    const hash = keccak256(toUtf8Bytes(productString));

    console.log("✍️ Requesting MetaMask signature...");

    // Create message to sign
    const message = `VibeChain Product Registration\n\nProduct Hash: ${hash}\nVendor: ${vendorAddress}\nTimestamp: ${Date.now()}`;

    try {
        // Request signature from MetaMask
        const signature = await signer.signMessage(message);

        console.log("✅ Product signed successfully!");

        return {
            hash,
            signature,
            timestamp: Date.now(),
            vendor: vendorAddress,
            message
        };
    } catch (error) {
        console.error("❌ Signature error:", error);
        throw error;
    }
}

/**
 * Fetches product stages from blockchain
 * @param {number} productId 
 * @param {ethers.Provider} provider
 * @returns {Promise<Array>}
 */
export async function getProductStagesFromChain(productId, provider) {
    // This function can be implemented later for blockchain integration
    return [];
}
