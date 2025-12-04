import { ethers } from "ethers";

// ----------------------------------------------------------------
// ⚠️ PLACEHOLDER CONFIGURATION
// When the real Smart Contract is ready:
// 1. Paste the Contract Address below.
// 2. Paste the ABI Array below.
// ----------------------------------------------------------------

export const CONTRACT_ADDRESS = "0x4e9d00e9D37a0cc2f835953aBF39c09B918C6E80";

export const CONTRACT_ABI = [
    {
        "inputs": [
            { "internalType": "string", "name": "_sku", "type": "string" },
            { "internalType": "string", "name": "_initialHash", "type": "string" }
        ],
        "name": "addProduct",
        "outputs": [{ "internalType": "uint256", "name": "productId", "type": "uint256" }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_productId", "type": "uint256" }],
        "name": "getProductBasic",
        "outputs": [
            { "internalType": "uint256", "name": "id", "type": "uint256" },
            { "internalType": "address", "name": "vendor", "type": "address" },
            { "internalType": "string", "name": "sku", "type": "string" },
            { "internalType": "string", "name": "initialHash", "type": "string" },
            { "internalType": "uint256", "name": "createdAt", "type": "uint256" },
            { "internalType": "uint256", "name": "updatesCount", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_productId", "type": "uint256" },
            { "internalType": "uint256", "name": "_index", "type": "uint256" }
        ],
        "name": "getProductUpdate",
        "outputs": [
            { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
            { "internalType": "string", "name": "metadataHash", "type": "string" },
            { "internalType": "address", "name": "updater", "type": "address" },
            { "internalType": "string", "name": "note", "type": "string" }
        ],
        "stateMutability": "view", "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "uint256", "name": "productId", "type": "uint256" },
            { "indexed": true, "internalType": "address", "name": "vendor", "type": "address" },
            { "indexed": false, "internalType": "string", "name": "sku", "type": "string" },
            { "indexed": false, "internalType": "string", "name": "initialHash", "type": "string" }
        ],
        "name": "ProductAdded",
        "type": "event"
    }
];

/**
 * Helper to get Contract Instance
 * @param {ethers.Signer | ethers.Provider} signerOrProvider 
 * @returns {ethers.Contract}
 */
export function getContract(signerOrProvider) {
    return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signerOrProvider);
}
