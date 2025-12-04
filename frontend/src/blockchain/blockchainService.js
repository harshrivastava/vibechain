import { getContract } from "./contractConfig";

/**
 * Adds a product to the blockchain
 * @param {string} hash - The product's SHA256 hash
 * @param {string} sku - The product's SKU/Batch
 * @param {ethers.Signer} signer - The wallet signer
 * @returns {Promise<{productId: number, txHash: string}>}
 */
export async function addProductOnChain(hash, sku, signer) {
    console.log("🔗 Connecting to Blockchain...");
    const contract = getContract(signer);

    try {
        const tx = await contract.addProduct(sku, hash);
        console.log("⏳ Transaction sent:", tx.hash);

        const receipt = await tx.wait();
        console.log("✅ Transaction mined:", receipt.hash);

        // Find ProductAdded event
        const event = receipt.logs
            .map(log => {
                try { return contract.interface.parseLog(log); }
                catch (e) { return null; }
            })
            .find(parsed => parsed && parsed.name === "ProductAdded");

        const productId = event ? Number(event.args.productId) : null;

        return {
            productId: productId,
            txHash: receipt.hash
        };
    } catch (error) {
        console.error("Blockchain Error:", error);
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
    if (!productId) return [];

    const contract = getContract(provider);
    const stages = [];

    try {
        // 1. Get Basic Info (Creation Stage)
        const basicInfo = await contract.getProductBasic(productId);
        stages.push({
            title: "Product Registered",
            date: new Date(Number(basicInfo.createdAt) * 1000).toLocaleDateString(),
            description: `Registered by Vendor: ${basicInfo.vendor.slice(0, 6)}...`
        });

        // 2. Get Updates
        const updatesCount = Number(basicInfo.updatesCount);
        for (let i = 0; i < updatesCount; i++) {
            const update = await contract.getProductUpdate(productId, i);
            stages.push({
                title: "Product Updated",
                date: new Date(Number(update.timestamp) * 1000).toLocaleDateString(),
                description: update.note || "Supply Chain Update"
            });
        }

        return stages;
    } catch (error) {
        console.error("Error fetching stages:", error);
        return [];
    }
}
