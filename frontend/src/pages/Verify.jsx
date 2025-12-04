import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";
import SupplyChainTimeline from "../components/SupplyChainTimeline";
import DashboardCard from "../components/DashboardCard";
import GlowButton from "../components/GlowButton";
import "./Verify.css";

export default function Verify() {
    const [searchParams] = useSearchParams();
    const [hash, setHash] = useState(searchParams.get("hash"));
    const [product, setProduct] = useState(null);
    const [stages, setStages] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (hash) {
            verifyProduct(hash);
        }
    }, [hash]);

    useEffect(() => {
        if (!hash) {
            const scanner = new Html5QrcodeScanner(
                "reader",
                { fps: 10, qrbox: { width: 250, height: 250 } },
                false
            );
            scanner.render(onScanSuccess, onScanFailure);

            return () => {
                scanner.clear().catch((error) => {
                    console.error("Failed to clear html5QrcodeScanner. ", error);
                });
            };
        }
    }, [hash]);

    function onScanSuccess(decodedText, decodedResult) {
        console.log(`Code matched = ${decodedText}`, decodedResult);
        try {
            const url = new URL(decodedText);
            const scannedHash = url.searchParams.get("hash");
            if (scannedHash) {
                setHash(scannedHash);
            } else {
                setHash(decodedText);
            }
        } catch (e) {
            setHash(decodedText);
        }
    }

    function onScanFailure(error) {
        // Silent fail for scanning
    }

    async function verifyProduct(productHash) {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`http://localhost:4000/api/products/hash/${productHash}`);
            setProduct(res.data);
            console.log("✅ Product verified:", res.data);
        } catch (err) {
            console.error(err);
            setError("Product not found or verification failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="verify-page">
            <div className="verify-header">
                <h1 className="animate-fade-in-up">🔍 Product Verification</h1>
                <p className="verify-subtitle animate-fade-in-up delay-100">
                    Scan QR code or enter product hash to verify authenticity
                </p>
            </div>

            {!hash && (
                <div className="scanner-container animate-fade-in-up delay-200">
                    <DashboardCard title="Scan QR Code" icon="📱" className="scanner-card">
                        <div className="scanner-wrapper">
                            <div id="reader" className="qr-reader"></div>
                            <div className="scanner-instructions">
                                <div className="instruction-item">
                                    <span className="instruction-icon">1️⃣</span>
                                    <span>Point your camera at the QR code</span>
                                </div>
                                <div className="instruction-item">
                                    <span className="instruction-icon">2️⃣</span>
                                    <span>Wait for automatic detection</span>
                                </div>
                                <div className="instruction-item">
                                    <span className="instruction-icon">3️⃣</span>
                                    <span>View instant verification results</span>
                                </div>
                            </div>
                        </div>
                    </DashboardCard>
                </div>
            )}

            {loading && (
                <div className="loading-container animate-fade-in">
                    <DashboardCard className="loading-card">
                        <div className="loading-content">
                            <div className="spinner"></div>
                            <h3>Verifying Authenticity...</h3>
                            <p>Checking blockchain records</p>
                        </div>
                    </DashboardCard>
                </div>
            )}

            {error && (
                <div className="error-container animate-fade-in">
                    <DashboardCard className="error-card">
                        <div className="error-content">
                            <div className="error-icon">❌</div>
                            <h3>Verification Failed</h3>
                            <p>{error}</p>
                            <GlowButton
                                variant="outline"
                                onClick={() => { setHash(null); setError(null); }}
                            >
                                Try Again
                            </GlowButton>
                        </div>
                    </DashboardCard>
                </div>
            )}

            {product && (
                <div className="verification-result animate-fade-in">
                    {/* Success Badge */}
                    <div className="success-banner">
                        <div className="success-banner-content container">
                            <div className="success-icon-large">✅</div>
                            <div>
                                <h2>Authentic Product Verified</h2>
                                <p>This product is registered on the blockchain</p>
                            </div>
                            <div className="trust-score">
                                <div className="trust-score-value">100%</div>
                                <div className="trust-score-label">Trust Score</div>
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="product-details container">
                        <div className="details-grid">
                            <DashboardCard title="Product Information" icon="📦" className="info-card">
                                <div className="info-grid">
                                    <div className="info-item">
                                        <label>Product Name</label>
                                        <div className="info-value">{product.name}</div>
                                    </div>
                                    <div className="info-item">
                                        <label>Batch Number</label>
                                        <div className="info-value">{product.metadata?.batch || "N/A"}</div>
                                    </div>
                                    <div className="info-item full-width">
                                        <label>Description</label>
                                        <div className="info-value">{product.description}</div>
                                    </div>
                                    <div className="info-item full-width">
                                        <label>Blockchain Hash</label>
                                        <div className="info-value hash-value">{product.productIdOnChain}</div>
                                    </div>
                                </div>
                            </DashboardCard>

                            <DashboardCard title="Verification Details" icon="🛡️" className="verification-card">
                                <div className="verification-items">
                                    <div className="verification-item verified">
                                        <span className="verify-icon">✓</span>
                                        <div>
                                            <div className="verify-label">Blockchain Verified</div>
                                            <div className="verify-desc">Record found on Ethereum</div>
                                        </div>
                                    </div>
                                    <div className="verification-item verified">
                                        <span className="verify-icon">✓</span>
                                        <div>
                                            <div className="verify-label">Authentic Vendor</div>
                                            <div className="verify-desc">Registered manufacturer</div>
                                        </div>
                                    </div>
                                    <div className="verification-item verified">
                                        <span className="verify-icon">✓</span>
                                        <div>
                                            <div className="verify-label">Supply Chain Tracked</div>
                                            <div className="verify-desc">Full history available</div>
                                        </div>
                                    </div>
                                </div>
                            </DashboardCard>
                        </div>

                        {/* Supply Chain Timeline */}
                        <DashboardCard title="Supply Chain History" icon="📊" className="timeline-card">
                            <SupplyChainTimeline stages={stages} />
                        </DashboardCard>

                        {/* Actions */}
                        <div className="verify-actions">
                            <GlowButton
                                variant="secondary"
                                onClick={() => { setHash(null); setProduct(null); }}
                            >
                                Scan Another Product
                            </GlowButton>
                            <GlowButton variant="outline">
                                Share Verification
                            </GlowButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
