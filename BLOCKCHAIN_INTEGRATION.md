# VibeChain Blockchain Integration Guide

## 📁 File Structure

```
frontend/src/
├── blockchain/
│   ├── contractConfig.js    # Smart contract configuration
│   ├── blockchainService.js # Blockchain interaction functions
│   └── metamask.js          # MetaMask wallet utilities
└── contract/
    └── contractABI.json     # Contract ABI (JSON format)
```

---

## 🔧 Configuration Files

### 1. `contractConfig.js`

**Purpose:** Central configuration for smart contract interaction

**Contains:**
- Contract address: `0x4e9d00e9D37a0cc2f835953aBF39c09B918C6E80`
- Network configuration (Sepolia Testnet)
- Complete ABI definition
- Helper functions to get contract instances

**Usage:**
```javascript
import { getContract, CONTRACT_ADDRESS } from './blockchain/contractConfig';

// Get contract with signer (for write operations)
const contract = getContract(signer);

// Get contract with provider (for read operations)
const contract = getContract(provider);
```

---

### 2. `metamask.js`

**Purpose:** MetaMask wallet connection and management

**Key Functions:**

#### Connect Wallet
```javascript
import { connectMetaMask } from './blockchain/metamask';

const { provider, signer, address } = await connectMetaMask();
console.log("Connected:", address);
```

#### Check if MetaMask is Installed
```javascript
import { isMetaMaskInstalled } from './blockchain/metamask';

if (!isMetaMaskInstalled()) {
  alert("Please install MetaMask!");
}
```

#### Get Current Account
```javascript
import { getCurrentAccount } from './blockchain/metamask';

const account = await getCurrentAccount();
```

#### Get Network Info
```javascript
import { getNetwork } from './blockchain/metamask';

const { chainId, networkName } = await getNetwork();
console.log("Network:", networkName);
```

#### Switch Network
```javascript
import { switchNetwork } from './blockchain/metamask';

// Switch to Sepolia (chainId in hex)
await switchNetwork("0xaa36a7");
```

#### Listen for Account Changes
```javascript
import { onAccountsChanged } from './blockchain/metamask';

onAccountsChanged((newAccount) => {
  if (newAccount) {
    console.log("Account changed to:", newAccount);
    // Update your app state
  } else {
    console.log("MetaMask locked");
  }
});
```

#### Listen for Network Changes
```javascript
import { onChainChanged } from './blockchain/metamask';

onChainChanged((chainId) => {
  console.log("Network changed:", chainId);
  // Page will reload automatically
});
```

#### Get Balance
```javascript
import { getBalance } from './blockchain/metamask';

const balance = await getBalance(address);
console.log("Balance:", balance, "ETH");
```

---

### 3. `blockchainService.js`

**Purpose:** High-level blockchain operations

**Key Functions:**

#### Add Product to Blockchain
```javascript
import { addProductOnChain } from './blockchain/blockchainService';

const result = await addProductOnChain(
  hash,      // Product hash (SHA256)
  sku,       // Product SKU/Batch
  signer     // Wallet signer from MetaMask
);

console.log("Product ID:", result.productId);
console.log("Transaction Hash:", result.txHash);
```

#### Get Product Stages
```javascript
import { getProductStagesFromChain } from './blockchain/blockchainService';

const stages = await getProductStagesFromChain(
  productId,  // Blockchain product ID
  provider    // Ethers provider
);

// Returns array of stages:
// [
//   {
//     title: "Product Registered",
//     date: "12/4/2024",
//     description: "Registered by Vendor: 0x1234..."
//   },
//   ...
// ]
```

---

### 4. `contractABI.json`

**Purpose:** Contract ABI in JSON format (for external tools)

**Usage:**
```javascript
import ABI from './contract/contractABI.json';

const contract = new ethers.Contract(address, ABI, signer);
```

---

## 🚀 Complete Integration Example

### Example: Product Registration Flow

```javascript
import { connectMetaMask, getNetwork } from './blockchain/metamask';
import { addProductOnChain } from './blockchain/blockchainService';
import { saveProduct } from './api/saveProduct';

async function registerProduct(productData) {
  try {
    // 1. Connect to MetaMask
    const { signer, address } = await connectMetaMask();
    console.log("✅ Wallet connected:", address);

    // 2. Check network
    const { networkName } = await getNetwork();
    console.log("📡 Network:", networkName);

    // 3. Generate product hash
    const hash = generateHash(productData); // Your hash function

    // 4. Add to blockchain
    const { productId, txHash } = await addProductOnChain(
      hash,
      productData.sku,
      signer
    );
    console.log("✅ Blockchain Product ID:", productId);
    console.log("📝 Transaction:", txHash);

    // 5. Save to backend
    const result = await saveProduct({
      productIdOnChain: hash,
      vendorAddress: address,
      name: productData.name,
      description: productData.description,
      metadata: {
        ...productData,
        blockchainId: productId,
        txHash: txHash
      }
    });

    return result;
  } catch (error) {
    console.error("❌ Registration failed:", error);
    throw error;
  }
}
```

### Example: Product Verification Flow

```javascript
import { BrowserProvider } from 'ethers';
import { getProductStagesFromChain } from './blockchain/blockchainService';
import axios from 'axios';

async function verifyProduct(productHash) {
  try {
    // 1. Get product from backend
    const response = await axios.get(
      `http://localhost:4000/api/products/hash/${productHash}`
    );
    const product = response.data;

    // 2. Get blockchain stages
    let provider;
    if (window.ethereum) {
      provider = new BrowserProvider(window.ethereum);
    }

    const stages = await getProductStagesFromChain(
      product.metadata.blockchainId,
      provider
    );

    return {
      product,
      stages,
      verified: true
    };
  } catch (error) {
    console.error("❌ Verification failed:", error);
    return {
      verified: false,
      error: error.message
    };
  }
}
```

---

## 🔐 Smart Contract Functions

### Available Functions

#### 1. `addProduct(sku, initialHash)`
- **Type:** Write (requires gas)
- **Parameters:**
  - `sku` (string): Product SKU/Batch number
  - `initialHash` (string): SHA256 hash of product data
- **Returns:** `productId` (uint256)
- **Event:** Emits `ProductAdded`

#### 2. `updateProduct(productId, metadataHash, note)`
- **Type:** Write (requires gas)
- **Parameters:**
  - `productId` (uint256): Product ID
  - `metadataHash` (string): New metadata hash
  - `note` (string): Update description
- **Event:** Emits `ProductUpdated`

#### 3. `getProductBasic(productId)`
- **Type:** Read (free)
- **Parameters:**
  - `productId` (uint256): Product ID
- **Returns:** Product details (id, vendor, sku, hash, timestamp, updates count)

#### 4. `getProductUpdate(productId, index)`
- **Type:** Read (free)
- **Parameters:**
  - `productId` (uint256): Product ID
  - `index` (uint256): Update index
- **Returns:** Update details (timestamp, hash, updater, note)

---

## 🌐 Network Configuration

**Current Network:** Sepolia Testnet

**Details:**
- Chain ID: `11155111` (hex: `0xaa36a7`)
- RPC URL: `https://sepolia.infura.io/v3/YOUR_KEY`
- Block Explorer: `https://sepolia.etherscan.io`
- Contract: `0x4e9d00e9D37a0cc2f835953aBF39c09B918C6E80`

**Get Testnet ETH:**
- Sepolia Faucet: https://sepoliafaucet.com/
- Alchemy Faucet: https://sepoliafaucet.com/

---

## ⚠️ Error Handling

### Common Errors

**1. MetaMask Not Installed**
```javascript
if (!isMetaMaskInstalled()) {
  alert("Please install MetaMask: https://metamask.io/");
}
```

**2. Wrong Network**
```javascript
const { chainId } = await getNetwork();
if (chainId !== "11155111") {
  await switchNetwork("0xaa36a7"); // Switch to Sepolia
}
```

**3. User Rejected Transaction**
```javascript
try {
  await contract.addProduct(sku, hash);
} catch (error) {
  if (error.code === 4001) {
    alert("Transaction rejected by user");
  }
}
```

**4. Insufficient Funds**
```javascript
const balance = await getBalance(address);
if (parseFloat(balance) < 0.01) {
  alert("Insufficient ETH for gas fees");
}
```

---

## 📝 Best Practices

1. **Always check MetaMask installation** before attempting connection
2. **Verify network** before transactions
3. **Handle user rejections** gracefully
4. **Show transaction progress** to users
5. **Store blockchain IDs** in your backend
6. **Use try-catch blocks** for all blockchain operations
7. **Listen for account/network changes** and update UI accordingly
8. **Clean up listeners** when component unmounts

---

## 🔄 Component Integration Example

```javascript
import { useState, useEffect } from 'react';
import { connectMetaMask, onAccountsChanged } from './blockchain/metamask';

function MyComponent() {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    // Listen for account changes
    onAccountsChanged((account) => {
      if (account) {
        setWallet({ address: account });
      } else {
        setWallet(null);
      }
    });
  }, []);

  const handleConnect = async () => {
    try {
      const { address, signer } = await connectMetaMask();
      setWallet({ address, signer });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      {wallet ? (
        <p>Connected: {wallet.address}</p>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  );
}
```

---

## 📚 Additional Resources

- [Ethers.js Documentation](https://docs.ethers.org/)
- [MetaMask Documentation](https://docs.metamask.io/)
- [Sepolia Testnet Info](https://sepolia.dev/)
- [Ethereum JSON-RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/)
