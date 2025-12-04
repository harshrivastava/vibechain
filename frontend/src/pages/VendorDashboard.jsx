import { useState } from "react";
import ConnectWallet from "../components/ConnectWallet";
import ProductForm from "../components/ProductForm";
import { saveProduct } from "../api/saveProduct";
import { QRCodeCanvas } from "qrcode.react";



export default function VendorDashboard() {
    const [wallet, setWallet] = useState(null);
    const [productData, setProductData] = useState(null);
    const [savedProduct, setSavedProduct] = useState(null);

    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }} className="fade-in">
            <h1 style={{ textAlign: "center", marginBottom: "40px" }}>VibeChain | Vendor Dashboard</h1>

            {!wallet && (
                <div className="glass-card" style={{ textAlign: "center", padding: "50px" }}>
                    <h3>🔌 Connect Wallet</h3>
                    <p style={{ marginBottom: "20px", opacity: 0.8 }}>Please connect your wallet to start registering products.</p>
                    <ConnectWallet
                        onConnected={(data) => {
                            setWallet(data);
                        }}
                    />
                </div>
            )}

            {wallet && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
                    {/* Left Column: Form */}
                    <div className="glass-card">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                            <h3>📝 Register Product</h3>
                            <span style={{ fontSize: "0.8em", background: "rgba(15, 98, 254, 0.2)", padding: "5px 10px", borderRadius: "20px", color: "#0f62fe" }}>
                                {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                            </span>
                        </div>

                        <ProductForm
                            wallet={wallet}
                            onSubmit={async (data) => {
                                console.log("Product Data Received:", data);
                                setProductData(data);

                                // SAVE TO BACKEND
                                try {
                                    const result = await saveProduct({
                                        productIdOnChain: data.hash, // TEMP using hash
                                        vendorAddress: wallet.address,
                                        name: data.name,
                                        description: data.description,
                                        metadata: data,
                                    });

                                    console.log("Backend Save Result:", result);
                                    setSavedProduct(result);
                                    // alert("Product saved to backend!"); 
                                } catch (error) {
                                    console.error(error);
                                    alert("Error saving product to backend!");
                                }
                            }}
                        />
                    </div>

                    {/* Right Column: Result */}
                    <div>
                        {productData ? (
                            <div className="glass-card fade-in">
                                <h3>🎉 Product Registered!</h3>
                                <p style={{ fontSize: "0.9em", opacity: 0.7 }}>Your product is now on the blockchain.</p>

                                <div style={{ background: "rgba(0,0,0,0.2)", padding: "15px", borderRadius: "8px", margin: "20px 0", wordBreak: "break-all" }}>
                                    <label style={{ fontSize: "0.7em", opacity: 0.6, textTransform: "uppercase" }}>Product Hash</label>
                                    <p style={{ fontFamily: "monospace", margin: "5px 0 0 0", fontSize: "0.85em", color: "#00b894" }}>{productData.hash}</p>
                                </div>

                                <div style={{ textAlign: "center", background: "white", padding: "20px", borderRadius: "12px" }}>
                                    <QRCodeCanvas
                                        value={`http://localhost:5173/verify?hash=${productData.hash}`}
                                        size={180}
                                    />
                                </div>
                                <p style={{ textAlign: "center", marginTop: "15px", fontSize: "0.9em" }}>Scan to Verify</p>
                            </div>
                        ) : (
                            <div className="glass-card" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.5 }}>
                                <p>Product details will appear here after registration.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
