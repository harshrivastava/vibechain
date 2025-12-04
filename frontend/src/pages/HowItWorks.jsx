import { Link } from "react-router-dom";

export default function HowItWorks() {
    return (
        <div className="how-it-works-page" style={{ padding: "80px 40px", maxWidth: "1000px", margin: "0 auto" }}>
            <div className="fade-in">
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>How VibeChain Works</h1>
                <p style={{ textAlign: "center", fontSize: "1.2em", opacity: 0.8, marginBottom: "60px" }}>
                    A complete guide for vendors and consumers
                </p>

                {/* For Vendors */}
                <div className="glass-card" style={{ marginBottom: "40px" }}>
                    <h2 style={{ color: "#0f62fe", marginBottom: "30px" }}>👔 For Vendors</h2>

                    <div style={{ marginBottom: "30px" }}>
                        <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ background: "#0f62fe", width: "30px", height: "30px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.9em" }}>1</span>
                            Connect Your Wallet
                        </h3>
                        <p style={{ marginLeft: "40px", lineHeight: "1.8", marginTop: "10px" }}>
                            Install MetaMask and connect to the Sepolia Testnet. Click "Connect Wallet" on the dashboard
                            to link your Ethereum address. This wallet will be your identity on the blockchain.
                        </p>
                    </div>

                    <div style={{ marginBottom: "30px" }}>
                        <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ background: "#0f62fe", width: "30px", height: "30px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.9em" }}>2</span>
                            Register Your Product
                        </h3>
                        <p style={{ marginLeft: "40px", lineHeight: "1.8", marginTop: "10px" }}>
                            Fill in product details: name, description, batch number, and manufacturing date.
                            Click "Generate & Save" to create a blockchain transaction. Confirm the transaction
                            in MetaMask (requires testnet ETH).
                        </p>
                    </div>

                    <div style={{ marginBottom: "30px" }}>
                        <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ background: "#0f62fe", width: "30px", height: "30px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.9em" }}>3</span>
                            Get Your QR Code
                        </h3>
                        <p style={{ marginLeft: "40px", lineHeight: "1.8", marginTop: "10px" }}>
                            Once the transaction is confirmed, a unique QR code is generated. This QR code
                            contains a link to your product's blockchain record. Download and print it.
                        </p>
                    </div>

                    <div>
                        <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ background: "#0f62fe", width: "30px", height: "30px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.9em" }}>4</span>
                            Attach to Product
                        </h3>
                        <p style={{ marginLeft: "40px", lineHeight: "1.8", marginTop: "10px" }}>
                            Print the QR code and attach it to your product packaging. Customers can now
                            scan it to verify authenticity.
                        </p>
                    </div>
                </div>

                {/* For Consumers */}
                <div className="glass-card" style={{ marginBottom: "40px" }}>
                    <h2 style={{ color: "#00b894", marginBottom: "30px" }}>🛍️ For Consumers</h2>

                    <div style={{ marginBottom: "30px" }}>
                        <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ background: "#00b894", width: "30px", height: "30px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.9em" }}>1</span>
                            Find the QR Code
                        </h3>
                        <p style={{ marginLeft: "40px", lineHeight: "1.8", marginTop: "10px" }}>
                            Look for the VibeChain QR code on the product packaging. It's usually placed
                            on the label or box.
                        </p>
                    </div>

                    <div style={{ marginBottom: "30px" }}>
                        <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ background: "#00b894", width: "30px", height: "30px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.9em" }}>2</span>
                            Scan with Your Phone
                        </h3>
                        <p style={{ marginLeft: "40px", lineHeight: "1.8", marginTop: "10px" }}>
                            Open your phone's camera app and point it at the QR code. Tap the notification
                            to open the verification page. No app installation needed!
                        </p>
                    </div>

                    <div>
                        <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{ background: "#00b894", width: "30px", height: "30px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.9em" }}>3</span>
                            View Verification Results
                        </h3>
                        <p style={{ marginLeft: "40px", lineHeight: "1.8", marginTop: "10px" }}>
                            See the authenticity badge, product details, and complete supply chain history.
                            All information is verified on the blockchain and cannot be faked.
                        </p>
                    </div>
                </div>

                {/* FAQ */}
                <div className="glass-card">
                    <h2 style={{ marginBottom: "30px" }}>❓ Frequently Asked Questions</h2>

                    <div style={{ marginBottom: "25px" }}>
                        <h3 style={{ color: "#0f62fe" }}>Do I need cryptocurrency to verify products?</h3>
                        <p style={{ lineHeight: "1.8", marginTop: "10px" }}>
                            No! Consumers can verify products for free without any wallet or cryptocurrency.
                            Only vendors need a wallet to register products.
                        </p>
                    </div>

                    <div style={{ marginBottom: "25px" }}>
                        <h3 style={{ color: "#0f62fe" }}>What is Sepolia Testnet?</h3>
                        <p style={{ lineHeight: "1.8", marginTop: "10px" }}>
                            Sepolia is a test version of the Ethereum blockchain. It works exactly like the
                            main Ethereum network but uses free test ETH instead of real money. Perfect for
                            development and testing!
                        </p>
                    </div>

                    <div style={{ marginBottom: "25px" }}>
                        <h3 style={{ color: "#0f62fe" }}>Can QR codes be copied or faked?</h3>
                        <p style={{ lineHeight: "1.8", marginTop: "10px" }}>
                            While QR codes can be physically copied, the blockchain record cannot be faked.
                            Each product has a unique hash that's verified against the blockchain. Counterfeiters
                            cannot create valid blockchain records.
                        </p>
                    </div>

                    <div>
                        <h3 style={{ color: "#0f62fe" }}>How do I get testnet ETH?</h3>
                        <p style={{ lineHeight: "1.8", marginTop: "10px" }}>
                            Visit a Sepolia faucet (like sepoliafaucet.com) and enter your wallet address.
                            You'll receive free test ETH within minutes. This is only for testing - it has no real value.
                        </p>
                    </div>
                </div>

                <div style={{ textAlign: "center", marginTop: "60px" }}>
                    <Link to="/dashboard" className="btn btn-primary" style={{ marginRight: "15px" }}>
                        Start as Vendor →
                    </Link>
                    <Link to="/verify" className="btn btn-secondary">
                        Verify a Product
                    </Link>
                </div>
            </div>
        </div>
    );
}
