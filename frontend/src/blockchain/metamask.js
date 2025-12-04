import { BrowserProvider } from "ethers";

/**
 * MetaMask Connection Utility
 * Handles wallet connection and network management
 */

/**
 * Check if MetaMask is installed
 * @returns {boolean}
 */
export function isMetaMaskInstalled() {
    return typeof window !== "undefined" && typeof window.ethereum !== "undefined";
}

/**
 * Connect to MetaMask wallet
 * @returns {Promise<{provider: BrowserProvider, signer: Signer, address: string}>}
 */
export async function connectMetaMask() {
    if (!isMetaMaskInstalled()) {
        throw new Error("MetaMask is not installed. Please install MetaMask extension.");
    }

    try {
        // Request account access
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        // Create provider and signer
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = accounts[0];

        console.log("✅ Connected to MetaMask:", address);

        return {
            provider,
            signer,
            address
        };
    } catch (error) {
        console.error("MetaMask connection error:", error);
        throw new Error("Failed to connect to MetaMask. Please try again.");
    }
}

/**
 * Get current connected account
 * @returns {Promise<string | null>}
 */
export async function getCurrentAccount() {
    if (!isMetaMaskInstalled()) {
        return null;
    }

    try {
        const accounts = await window.ethereum.request({
            method: "eth_accounts"
        });
        return accounts[0] || null;
    } catch (error) {
        console.error("Error getting current account:", error);
        return null;
    }
}

/**
 * Get network information
 * @returns {Promise<{chainId: string, networkName: string}>}
 */
export async function getNetwork() {
    if (!isMetaMaskInstalled()) {
        throw new Error("MetaMask is not installed");
    }

    try {
        const provider = new BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();

        const networkNames = {
            1: "Ethereum Mainnet",
            11155111: "Sepolia Testnet",
            5: "Goerli Testnet",
            137: "Polygon Mainnet",
            80001: "Mumbai Testnet"
        };

        return {
            chainId: network.chainId.toString(),
            networkName: networkNames[Number(network.chainId)] || "Unknown Network"
        };
    } catch (error) {
        console.error("Error getting network:", error);
        throw error;
    }
}

/**
 * Switch to specific network
 * @param {string} chainId - Chain ID in hex format (e.g., "0xaa36a7" for Sepolia)
 */
export async function switchNetwork(chainId) {
    if (!isMetaMaskInstalled()) {
        throw new Error("MetaMask is not installed");
    }

    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId }]
        });
    } catch (error) {
        // If network doesn't exist, add it
        if (error.code === 4902) {
            throw new Error("Network not found in MetaMask. Please add it manually.");
        }
        throw error;
    }
}

/**
 * Add Sepolia network to MetaMask
 */
export async function addSepoliaNetwork() {
    if (!isMetaMaskInstalled()) {
        throw new Error("MetaMask is not installed");
    }

    try {
        await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
                chainId: "0xaa36a7", // 11155111 in hex
                chainName: "Sepolia Testnet",
                nativeCurrency: {
                    name: "Sepolia ETH",
                    symbol: "ETH",
                    decimals: 18
                },
                rpcUrls: ["https://sepolia.infura.io/v3/0bf9c4dd17ec41aabdd6791f6c856066"],
                blockExplorerUrls: ["https://sepolia.etherscan.io"]
            }]
        });
    } catch (error) {
        console.error("Error adding Sepolia network:", error);
        throw error;
    }
}

/**
 * Listen for account changes
 * @param {Function} callback - Function to call when account changes
 */
export function onAccountsChanged(callback) {
    if (!isMetaMaskInstalled()) {
        return;
    }

    window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
            console.log("MetaMask is locked or no accounts available");
            callback(null);
        } else {
            console.log("Account changed to:", accounts[0]);
            callback(accounts[0]);
        }
    });
}

/**
 * Listen for network changes
 * @param {Function} callback - Function to call when network changes
 */
export function onChainChanged(callback) {
    if (!isMetaMaskInstalled()) {
        return;
    }

    window.ethereum.on("chainChanged", (chainId) => {
        console.log("Network changed to:", chainId);
        callback(chainId);
        // Reload page on network change (recommended by MetaMask)
        window.location.reload();
    });
}

/**
 * Disconnect MetaMask (clear listeners)
 */
export function disconnectMetaMask() {
    if (!isMetaMaskInstalled()) {
        return;
    }

    // Remove all listeners
    window.ethereum.removeAllListeners("accountsChanged");
    window.ethereum.removeAllListeners("chainChanged");

    console.log("MetaMask listeners removed");
}

/**
 * Get account balance
 * @param {string} address - Wallet address
 * @returns {Promise<string>} Balance in ETH
 */
export async function getBalance(address) {
    if (!isMetaMaskInstalled()) {
        throw new Error("MetaMask is not installed");
    }

    try {
        const provider = new BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(address);
        // Convert from wei to ETH
        return (Number(balance) / 1e18).toFixed(4);
    } catch (error) {
        console.error("Error getting balance:", error);
        throw error;
    }
}
