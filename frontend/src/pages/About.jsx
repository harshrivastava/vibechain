import { Link } from "react-router-dom";

export default function About() {
    return (
        <div className="about-page" style={{ padding: "80px 40px", maxWidth: "1000px", margin: "0 auto" }}>
            <div className="fade-in">
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>About VibeChain</h1>
                <p style={{ textAlign: "center", fontSize: "1.2em", opacity: 0.8, marginBottom: "60px" }}>
                    Building trust through blockchain technology
                </p>

                <div className="glass-card" style={{ marginBottom: "40px" }}>
                    <h2>Our Mission</h2>
                    <p style={{ lineHeight: "1.8", fontSize: "1.1em" }}>
                        VibeChain is dedicated to eliminating counterfeit products and building consumer trust
                        through blockchain technology. We believe every product deserves a verifiable history,
                        and every customer deserves to know the authenticity of what they purchase.
                    </p>
                </div>

                <div className="glass-card" style={{ marginBottom: "40px" }}>
                    <h2>The Problem We Solve</h2>
                    <p style={{ lineHeight: "1.8", fontSize: "1.1em" }}>
                        Counterfeit products cost the global economy billions of dollars annually and pose
                        serious risks to consumer safety. Traditional authentication methods are easily
                        replicated, leaving brands and consumers vulnerable.
                    </p>
                    <p style={{ lineHeight: "1.8", fontSize: "1.1em", marginTop: "15px" }}>
                        VibeChain leverages the immutability and transparency of blockchain technology to
                        create unforgeable product records that anyone can verify in seconds.
                    </p>
                </div>

                <div className="glass-card" style={{ marginBottom: "40px" }}>
                    <h2>How We're Different</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "20px" }}>
                        <div>
                            <h3 style={{ color: "#00b894", marginBottom: "10px" }}>✓ Decentralized</h3>
                            <p>No single point of failure. Records stored on Ethereum blockchain.</p>
                        </div>
                        <div>
                            <h3 style={{ color: "#00b894", marginBottom: "10px" }}>✓ Transparent</h3>
                            <p>Complete supply chain visibility for all stakeholders.</p>
                        </div>
                        <div>
                            <h3 style={{ color: "#00b894", marginBottom: "10px" }}>✓ User-Friendly</h3>
                            <p>Simple QR code scanning - no technical knowledge required.</p>
                        </div>
                        <div>
                            <h3 style={{ color: "#00b894", marginBottom: "10px" }}>✓ Cost-Effective</h3>
                            <p>Affordable solution for businesses of all sizes.</p>
                        </div>
                    </div>
                </div>

                <div className="glass-card">
                    <h2>Technology Stack</h2>
                    <p style={{ lineHeight: "1.8", fontSize: "1.1em" }}>
                        Built with cutting-edge Web3 technologies:
                    </p>
                    <ul style={{ lineHeight: "2", fontSize: "1.1em", marginTop: "15px" }}>
                        <li><strong>Blockchain:</strong> Ethereum (Sepolia Testnet)</li>
                        <li><strong>Smart Contracts:</strong> Solidity</li>
                        <li><strong>Frontend:</strong> React + Vite</li>
                        <li><strong>Backend:</strong> Node.js + Express + MongoDB</li>
                        <li><strong>Web3 Integration:</strong> ethers.js</li>
                    </ul>
                </div>

                <div style={{ textAlign: "center", marginTop: "60px" }}>
                    <Link to="/dashboard" className="btn btn-primary">
                        Start Using VibeChain →
                    </Link>
                </div>
            </div>
        </div>
    );
}
