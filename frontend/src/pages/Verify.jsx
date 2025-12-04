import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";
import { BrowserProvider } from "ethers";
import SupplyChainTimeline from "../components/SupplyChainTimeline";
import { getProductStagesFromChain } from "../blockchain/blockchainService";

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
        /* verbose= */ false
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
        // console.warn(`Code scan error = ${error}`);
    }

    async function verifyProduct(productHash) {
        setLoading(true);
        setError(null);
        try {
            // 1. Fetch from Backend
            const res = await axios.get(`http://localhost:4000/api/products/hash/${productHash}`);
            setProduct(res.data);

            // 2. Fetch from Blockchain
            if (res.data.metadata && res.data.metadata.blockchainId) {
                // Use a read-only provider (Metamask or Default)
                let provider;
                if (window.ethereum) {
                    provider = new BrowserProvider(window.ethereum);
                } else {
                    console.warn("No crypto wallet found. Blockchain verification might fail.");
                }

                if (provider) {
                    const chainStages = await getProductStagesFromChain(res.data.metadata.blockchainId, provider);
                    setStages(chainStages);
                }
            } else {
                // Fallback or Mock if no blockchain ID (e.g. legacy products)
                console.log("No blockchain ID found in metadata.");
            }

        } catch (err) {
            console.error(err);
            setError("Product not found or verification failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }} className="fade-in">
            <h1 style={{ textAlign: "center", marginBottom: "30px" }}>🔍 Product Verification</h1>

            {!hash && (
                <div className="glass-card" style={{ textAlign: "center" }}>
                    <h3>Scan QR Code</h3>
                    <div id="reader" style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}></div>
                    <p style={{ marginTop: "15px", opacity: 0.7 }}>Point your camera at a VibeChain QR code</p>
                </div>
            )}

            {loading && (
                <div className="glass-card" style={{ textAlign: "center" }}>
                    <p>Verifying authenticity...</p>
                </div>
            )}

            {error && (
                <div className="glass-card" style={{ borderColor: "#ff4d4d", background: "rgba(255, 77, 77, 0.1)" }}>
                    <h3 style={{ color: "#ff4d4d", display: "flex", alignItems: "center", gap: "10px" }}>
                        ❌ Verification Failed
                    </h3>
                    <p>{error}</p>
                    <button
                        onClick={() => setHash(null)}
                        style={{ marginTop: "15px", background: "#ff4d4d", color: "white", padding: "10px 20px", borderRadius: "8px" }}
                    >
                        Try Again
                    </button>
                </div>
            )}

            {product && (
                <div className="glass-card fade-in">
                    <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "20px" }}>
                        <div style={{ background: "#00b894", width: "50px", height: "50px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>
                            ✅
                        </div>
                        <div>
                            <h2 style={{ margin: 0 }}>Authentic Product</h2>
                            <span style={{ fontSize: "0.9em", opacity: 0.8 }}>Verified on Blockchain</span>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                        <div>
                            <label style={{ fontSize: "0.8em", opacity: 0.6, textTransform: "uppercase" }}>Product Name</label>
                            <p style={{ fontSize: "1.2em", fontWeight: "bold", margin: "5px 0 15px 0" }}>{product.name}</p>
                        </div>
                        <div>
                            <label style={{ fontSize: "0.8em", opacity: 0.6, textTransform: "uppercase" }}>Batch Number</label>
                            <p style={{ fontSize: "1.2em", fontWeight: "bold", margin: "5px 0 15px 0" }}>{product.metadata?.batch || "N/A"}</p>
                        </div>
                    </div>

                    <div style={{ marginTop: "10px" }}>
                        <label style={{ fontSize: "0.8em", opacity: 0.6, textTransform: "uppercase" }}>Description</label>
                        <p style={{ margin: "5px 0 15px 0", lineHeight: "1.5" }}>{product.description}</p>
                    </div>

                    <div style={{ background: "rgba(0,0,0,0.2)", padding: "15px", borderRadius: "8px", marginTop: "10px", wordBreak: "break-all" }}>
                        <label style={{ fontSize: "0.8em", opacity: 0.6, textTransform: "uppercase" }}>Blockchain Hash</label>
                        <p style={{ fontFamily: "monospace", margin: "5px 0 0 0", fontSize: "0.9em", color: "#00b894" }}>{product.productIdOnChain}</p>
                    </div>

                    <SupplyChainTimeline stages={stages} />

                    <button
                        onClick={() => { setHash(null); setProduct(null); }}
                        style={{ marginTop: "30px", width: "100%", padding: "12px", background: "rgba(255,255,255,0.1)", color: "white", borderRadius: "8px" }}
                    >
                        Scan Another Product
                    </button>
                </div>
            )}
        </div>
    );
}
