import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge">🔗 Powered by Blockchain</div>
                    <h1 className="hero-title">
                        Verify Product Authenticity
                        <br />
                        <span className="gradient-text">With Blockchain Technology</span>
                    </h1>
                    <p className="hero-subtitle">
                        VibeChain uses Ethereum blockchain to create immutable records of product authenticity.
                        Scan QR codes to instantly verify genuine products and track their supply chain journey.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/dashboard" className="btn btn-primary">
                            Get Started →
                        </Link>
                        <Link to="/how-it-works" className="btn btn-secondary">
                            Learn More
                        </Link>
                    </div>
                    <div className="hero-stats">
                        <div className="stat">
                            <div className="stat-number">100%</div>
                            <div className="stat-label">Secure</div>
                        </div>
                        <div className="stat">
                            <div className="stat-number">∞</div>
                            <div className="stat-label">Immutable</div>
                        </div>
                        <div className="stat">
                            <div className="stat-number">⚡</div>
                            <div className="stat-label">Instant</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="section-header">
                    <h2>Why Choose VibeChain?</h2>
                    <p>Cutting-edge technology meets simplicity</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card glass-card">
                        <div className="feature-icon">🔒</div>
                        <h3>Blockchain Security</h3>
                        <p>
                            Every product is registered on the Ethereum blockchain, creating an
                            immutable and tamper-proof record of authenticity.
                        </p>
                    </div>
                    <div className="feature-card glass-card">
                        <div className="feature-icon">📱</div>
                        <h3>QR Code Verification</h3>
                        <p>
                            Customers can instantly verify products by scanning QR codes with
                            their smartphones. No app installation required.
                        </p>
                    </div>
                    <div className="feature-card glass-card">
                        <div className="feature-icon">🚚</div>
                        <h3>Supply Chain Tracking</h3>
                        <p>
                            Track the complete journey of your products from manufacturing to
                            delivery with transparent blockchain records.
                        </p>
                    </div>
                    <div className="feature-card glass-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Real-Time Updates</h3>
                        <p>
                            Add supply chain updates instantly. Every change is recorded on the
                            blockchain with timestamps and verifiable proof.
                        </p>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">
                <div className="section-header">
                    <h2>How It Works</h2>
                    <p>Three simple steps to secure your products</p>
                </div>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-number">1</div>
                        <div className="step-content glass-card">
                            <h3>Register Product</h3>
                            <p>
                                Connect your wallet and register your product on the blockchain.
                                Add details like name, batch number, and description.
                            </p>
                        </div>
                    </div>
                    <div className="step-arrow">→</div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <div className="step-content glass-card">
                            <h3>Generate QR Code</h3>
                            <p>
                                Receive a unique QR code linked to your product's blockchain record.
                                Print and attach it to your product packaging.
                            </p>
                        </div>
                    </div>
                    <div className="step-arrow">→</div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <div className="step-content glass-card">
                            <h3>Verify Authenticity</h3>
                            <p>
                                Customers scan the QR code to instantly verify authenticity and
                                view the complete supply chain history.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-content glass-card">
                    <h2>Ready to Secure Your Products?</h2>
                    <p>Join the blockchain revolution and protect your brand from counterfeits</p>
                    <Link to="/dashboard" className="btn btn-primary btn-large">
                        Start Now - It's Free →
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>VibeChain</h3>
                        <p>Blockchain-powered product authentication</p>
                    </div>
                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Product</h4>
                            <Link to="/how-it-works">How It Works</Link>
                            <Link to="/about">About Us</Link>
                            <Link to="/verify">Verify Product</Link>
                        </div>
                        <div className="footer-column">
                            <h4>Resources</h4>
                            <a href="#docs">Documentation</a>
                            <a href="#support">Support</a>
                            <a href="#faq">FAQ</a>
                        </div>
                        <div className="footer-column">
                            <h4>Connect</h4>
                            <a href="#twitter">Twitter</a>
                            <a href="#github">GitHub</a>
                            <a href="#discord">Discord</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2024 VibeChain. Built on Ethereum Sepolia Testnet.</p>
                </div>
            </footer>
        </div>
    );
}
