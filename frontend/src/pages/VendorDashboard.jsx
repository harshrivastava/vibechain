import { useState } from "react";
import { Package, CheckCircle, QrCode, Activity } from "lucide-react";
import ConnectWallet from "../components/ConnectWallet";
import ProductForm from "../components/ProductForm";
import StatsCard from "../components/StatsCard";
import DashboardCard from "../components/DashboardCard";
import { saveProduct } from "../api/saveProduct";
import { QRCodeCanvas } from "qrcode.react";
import "./VendorDashboard.css";

export default function VendorDashboard() {
    const [wallet, setWallet] = useState(null);
    const [productData, setProductData] = useState(null);
    const [savedProduct, setSavedProduct] = useState(null);

    return (
        <div className="vendor-dashboard">
            <div className="dashboard-header">
                <div>
                    <h1>Vendor Dashboard</h1>
                    <p className="dashboard-subtitle">
                        Register and manage your products on the blockchain
                    </p>
                </div>
                {wallet && (
                    <div className="wallet-badge">
                        <span className="wallet-label">Connected Wallet</span>
                        <span className="wallet-address">
                            {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                        </span>
                    </div>
                )}
            </div>

            {!wallet ? (
                <div className="connect-wallet-container">
                    <DashboardCard title="Connect Your Wallet" icon={<Package size={20} />}>
                        <div className="connect-content">
                            <p>Please connect your Web3 wallet to start registering products on the blockchain.</p>
                            <ConnectWallet onConnected={(data) => setWallet(data)} />
                        </div>
                    </DashboardCard>
                </div>
            ) : (
                <>
                    <div className="stats-row">
                        <StatsCard
                            title="Total Products"
                            value={42}
                            icon={<Package size={24} />}
                            trend="up"
                            trendValue="+12%"
                            color="blue"
                        />
                        <StatsCard
                            title="Verified Today"
                            value={127}
                            icon={<CheckCircle size={24} />}
                            trend="up"
                            trendValue="+8%"
                            color="green"
                        />
                        <StatsCard
                            title="Active QR Codes"
                            value={38}
                            icon={<QrCode size={24} />}
                            color="blue"
                        />
                        <StatsCard
                            title="Transactions"
                            value={156}
                            icon={<Activity size={24} />}
                            trend="up"
                            trendValue="+15%"
                            color="blue"
                        />
                    </div>

                    <div className="dashboard-grid">
                        <DashboardCard title="Register New Product" icon={<Package size={20} />}>
                            <ProductForm
                                wallet={wallet}
                                onSubmit={async (data) => {
                                    setProductData(data);
                                    try {
                                        const result = await saveProduct({
                                            productIdOnChain: data.hash,
                                            vendorAddress: wallet.address,
                                            name: data.name,
                                            description: data.description,
                                            metadata: data,
                                        });
                                        setSavedProduct(result);
                                    } catch (error) {
                                        console.error(error);
                                        alert("Error saving product to backend!");
                                    }
                                }}
                            />
                        </DashboardCard>

                        <div className="right-column">
                            {productData ? (
                                <DashboardCard title="Product Registered" icon={<CheckCircle size={20} />}>
                                    <div className="success-content">
                                        <div className="success-badge">
                                            <CheckCircle size={16} />
                                            <span>On Blockchain</span>
                                        </div>

                                        <div className="product-hash">
                                            <label>Product Hash</label>
                                            <div className="hash-value">{productData.hash}</div>
                                        </div>

                                        <div className="qr-container">
                                            <QRCodeCanvas
                                                value={`http://localhost:5173/verify?hash=${productData.hash}`}
                                                size={200}
                                            />
                                        </div>

                                        <div className="action-buttons">
                                            <button className="btn btn-primary">Download QR</button>
                                            <button className="btn btn-secondary">Print</button>
                                        </div>
                                    </div>
                                </DashboardCard>
                            ) : (
                                <DashboardCard title="Product Preview">
                                    <div className="empty-state">
                                        <Package size={48} className="empty-icon" />
                                        <p>Product details will appear here after registration</p>
                                    </div>
                                </DashboardCard>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
