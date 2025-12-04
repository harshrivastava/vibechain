# ⛓️ VibeChain - Blockchain-Powered Product Authentication

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)
![Ethereum](https://img.shields.io/badge/Ethereum-Sepolia-3C3C3D?logo=ethereum)

> **Eliminate counterfeits. Build trust. Verify authenticity instantly.**

VibeChain is a decentralized product authentication platform that leverages blockchain technology and cryptographic signatures to create unforgeable product records. Vendors can register products with MetaMask signatures, and consumers can verify authenticity by scanning QR codes - all without gas fees or complex blockchain interactions.

Built for hackathons, optimized for real-world supply chain transparency.

---

## ✨ Features

- 🔐 **MetaMask Signature Authentication** - Cryptographically sign products without gas fees
- 📱 **QR Code Verification** - Instant product verification via smartphone camera
- 🎨 **Professional SaaS UI** - Clean, enterprise-level design with 8px grid system
- 💾 **MongoDB Backend** - Scalable product data storage
- 🔗 **Blockchain-Ready** - Smart contract integration for Sepolia testnet
- ⚡ **Real-time Dashboard** - Track products, signatures, and verification stats
- 🌐 **Supply Chain Transparency** - Complete product history and vendor tracking
- 📊 **Analytics & Metrics** - Visual insights into product verification trends

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/-React_19-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/-Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Ethers.js](https://img.shields.io/badge/-Ethers.js_6-2535A0?style=flat&logo=ethereum&logoColor=white)
![React Router](https://img.shields.io/badge/-React_Router-CA4245?style=flat&logo=react-router&logoColor=white)

- **React 19.2.0** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **Ethers.js 6.15.0** - Ethereum wallet integration
- **React Router DOM** - Client-side routing
- **Lucide React** - Beautiful icon library
- **QRCode.react** - QR code generation
- **html5-qrcode** - QR code scanning
- **Axios** - HTTP client

### Backend
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)

- **Node.js** - JavaScript runtime
- **Express 5.2.1** - Web framework
- **MongoDB + Mongoose** - NoSQL database
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### Blockchain
- **Sepolia Testnet** - Ethereum test network
- **MetaMask** - Web3 wallet provider
- **Smart Contracts** - Solidity-based product registry

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher)
- **MongoDB** (local or Atlas)
- **MetaMask** browser extension
- **Git**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/vibechain.git
cd vibechain
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Configure environment variables**

Create `.env` in the `backend` directory:
```env
MONGODB_URI=mongodb://localhost:27017/vibechain
PORT=4000
```

5. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

6. **Run the application**

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

7. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000

---

## 📖 Usage Examples

### 1. Connect MetaMask Wallet

```javascript
import { connectMetaMask } from './blockchain/metamask';

// Connect to MetaMask
const { signer, address } = await connectMetaMask();
console.log("Connected:", address);
```

### 2. Register a Product with Signature

```javascript
import { createSecureProductRecord } from './blockchain/blockchainService';

// Create product with MetaMask signature
const product = {
  name: "Premium Headphones",
  description: "Noise-cancelling wireless headphones",
  batch: "BATCH-2024-001",
  date: "2024-12-04"
};

const record = await createSecureProductRecord(
  product,
  vendorAddress,
  signer
);

// Returns: { hash, signature, timestamp, vendor }
```

### 3. Verify Product Authenticity

```javascript
// Scan QR code or enter product hash
const response = await axios.get(
  `http://localhost:4000/api/products/hash/${productHash}`
);

if (response.data) {
  console.log("✅ Authentic Product!");
  console.log("Vendor:", response.data.vendorAddress);
  console.log("Registered:", response.data.timestamp);
}
```

### 4. API Endpoints

**Save Product**
```bash
POST /api/products
Content-Type: application/json

{
  "productIdOnChain": "0x1234...",
  "vendorAddress": "0x5678...",
  "name": "Product Name",
  "description": "Description",
  "metadata": {
    "hash": "0x...",
    "signature": "0x...",
    "timestamp": 1733307311000
  }
}
```

**Get Product by Hash**
```bash
GET /api/products/hash/:hash
```

**Get All Products**
```bash
GET /api/products
```

---

## 📁 Project Structure

```
vibechain/
├── 📂 backend/
│   ├── 📂 controllers/
│   │   └── productController.js    # Product CRUD operations
│   ├── 📂 models/
│   │   └── Product.js              # MongoDB schema
│   ├── 📂 routes/
│   │   └── products.js             # API routes
│   ├── .env                        # Environment variables
│   ├── index.js                    # Express server entry
│   └── package.json                # Backend dependencies
│
├── 📂 frontend/
│   ├── 📂 src/
│   │   ├── 📂 api/
│   │   │   └── saveProduct.js      # Backend API calls
│   │   ├── 📂 blockchain/
│   │   │   ├── blockchainService.js  # MetaMask signature logic
│   │   │   ├── contractConfig.js     # Smart contract config
│   │   │   └── metamask.js           # Wallet connection utils
│   │   ├── 📂 components/
│   │   │   ├── ConnectWallet.jsx     # Wallet connection UI
│   │   │   ├── ProductForm.jsx       # Product registration form
│   │   │   ├── DashboardCard.jsx     # Reusable card component
│   │   │   ├── StatsCard.jsx         # Metrics display
│   │   │   ├── Navbar.jsx            # Top navigation
│   │   │   └── SupplyChainTimeline.jsx
│   │   ├── 📂 pages/
│   │   │   ├── Landing.jsx           # Home page
│   │   │   ├── VendorDashboard.jsx   # Vendor portal
│   │   │   ├── Verify.jsx            # QR verification page
│   │   │   ├── About.jsx
│   │   │   └── HowItWorks.jsx
│   │   ├── App.jsx                   # Main app component
│   │   ├── main.jsx                  # React entry point
│   │   ├── index.css                 # Global styles
│   │   └── design-tokens.css         # Design system
│   ├── index.html
│   ├── vite.config.js
│   └── package.json                  # Frontend dependencies
│
├── BLOCKCHAIN_INTEGRATION.md          # Blockchain setup guide
├── .gitignore
└── README.md
```

---

## 🎯 Key Features Explained

### MetaMask Signature Authentication

Instead of expensive blockchain transactions, VibeChain uses **cryptographic signatures**:

1. **Vendor registers product** → MetaMask signs product data
2. **Signature stored** → Saved to MongoDB with product hash
3. **Consumer verifies** → Scans QR code to check signature
4. **Instant validation** → No gas fees, no waiting

**Benefits:**
- ✅ Free (no gas costs)
- ✅ Instant (no blockchain delay)
- ✅ Secure (cryptographically verified)
- ✅ Scalable (works offline)

### Supply Chain Transparency

Track complete product journey:
- **Registration** - Vendor signs product
- **Distribution** - Track movement
- **Verification** - Consumer validates
- **History** - Full audit trail

### Professional SaaS UI

- **8px Grid System** - Consistent spacing
- **Clean Design** - No gradients, no glow
- **Responsive** - Mobile-friendly
- **Accessible** - WCAG compliant

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 🔧 Configuration

### MetaMask Setup

1. Install [MetaMask](https://metamask.io/)
2. Switch to **Sepolia Testnet**
3. Get free testnet ETH from [Sepolia Faucet](https://sepoliafaucet.com/)

### MongoDB Setup

**Local:**
```bash
mongod --dbpath /path/to/data
```

**MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vibechain
```

---

## 📊 API Documentation

### Product Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/products` | Create new product |
| `GET` | `/api/products` | Get all products |
| `GET` | `/api/products/:id` | Get product by ID |
| `GET` | `/api/products/hash/:hash` | Get product by hash |

### Request/Response Examples

**Create Product:**
```json
{
  "productIdOnChain": "0xabc123...",
  "vendorAddress": "0xdef456...",
  "name": "Laptop",
  "description": "Gaming laptop",
  "metadata": {
    "hash": "0x789...",
    "signature": "0x012...",
    "batch": "BATCH-001"
  }
}
```

---

## 🐛 Troubleshooting

### Common Issues

**MetaMask not connecting?**
- Ensure MetaMask is installed
- Check you're on Sepolia testnet
- Refresh the page

**Backend not starting?**
- Verify MongoDB is running
- Check `.env` configuration
- Ensure port 4000 is available

**QR Scanner not working?**
- Allow camera permissions
- Use HTTPS or localhost
- Try different browser

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgments

- **Ethereum Foundation** - Blockchain infrastructure
- **MetaMask** - Web3 wallet integration
- **MongoDB** - Database solution
- **React Team** - Frontend framework
- **Vite** - Build tooling

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/yourusername/vibechain/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/vibechain/discussions)
- **Email**: your.email@example.com

---

## 🚀 Roadmap

- [ ] Mobile app (React Native)
- [ ] Blockchain transaction support
- [ ] Multi-chain compatibility
- [ ] Advanced analytics dashboard
- [ ] Vendor verification system
- [ ] API rate limiting
- [ ] Docker containerization

---

<div align="center">

**Built with ❤️ for hackathons and supply chain transparency**

⭐ Star this repo if you find it useful!

[Report Bug](https://github.com/yourusername/vibechain/issues) · [Request Feature](https://github.com/yourusername/vibechain/issues)

</div>
