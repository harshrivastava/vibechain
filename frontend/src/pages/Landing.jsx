import { Link } from 'react-router-dom';
import { Shield, Check, TrendingUp, Users, Package, Zap } from 'lucide-react';
import './Landing.css';

export default function Landing() {
    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            <Shield size={16} />
                            <span>Blockchain-Powered Authentication</span>
                        </div>

                        <h1 className="hero-title">
                            Secure Your Products with VibeChain
                        </h1>

                        <p className="hero-subtitle">
                            Eliminate counterfeits and build consumer trust through immutable blockchain technology.
                            Every product deserves a verifiable history.
                        </p>

                        <div className="hero-buttons">
                            <Link to="/dashboard" className="btn btn-primary btn-lg">
                                Get Started
                            </Link>
                            <Link to="/verify" className="btn btn-secondary btn-lg">
                                Verify Product
                            </Link>
                        </div>

                        <div className="hero-stats">
                            <div className="stat-item">
                                <div className="stat-number">10,000+</div>
                                <div className="stat-label">Products Verified</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-number">99.9%</div>
                                <div className="stat-label">Accuracy Rate</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-number">500+</div>
                                <div className="stat-label">Active Vendors</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Why Choose VibeChain</h2>
                        <p>Next-generation product authentication powered by blockchain technology</p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <Shield size={24} />
                            </div>
                            <h3>Immutable Records</h3>
                            <p>
                                Every product registration is permanently stored on the Ethereum blockchain,
                                making it impossible to forge or tamper with.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <Zap size={24} />
                            </div>
                            <h3>Instant Verification</h3>
                            <p>
                                Scan QR codes with any smartphone camera to verify authenticity in seconds.
                                No app installation required.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <TrendingUp size={24} />
                            </div>
                            <h3>Full Transparency</h3>
                            <p>
                                Track complete supply chain history from manufacturing to delivery.
                                Build trust with complete visibility.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <Package size={24} />
                            </div>
                            <h3>Cost Effective</h3>
                            <p>
                                Affordable blockchain solution for businesses of all sizes.
                                Pay only for what you use.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <Check size={24} />
                            </div>
                            <h3>Easy Integration</h3>
                            <p>
                                Simple API and dashboard interface. Get started in minutes,
                                not months.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <Users size={24} />
                            </div>
                            <h3>Enterprise Security</h3>
                            <p>
                                Bank-level encryption and security. Your data and products
                                are always protected.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-card">
                        <h2>Ready to Eliminate Counterfeits?</h2>
                        <p>Join hundreds of vendors already protecting their products with VibeChain</p>
                        <div className="cta-buttons">
                            <Link to="/dashboard" className="btn btn-primary btn-lg">
                                Get Started Free
                            </Link>
                            <Link to="/how-it-works" className="btn btn-secondary btn-lg">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <h3>VibeChain</h3>
                            <p>Blockchain-powered product authentication</p>
                        </div>

                        <div className="footer-links">
                            <div className="footer-column">
                                <h4>Product</h4>
                                <Link to="/dashboard">Dashboard</Link>
                                <Link to="/verify">Verify</Link>
                                <Link to="/how-it-works">How It Works</Link>
                            </div>

                            <div className="footer-column">
                                <h4>Company</h4>
                                <Link to="/about">About</Link>
                                <a href="#contact">Contact</a>
                                <a href="#careers">Careers</a>
                            </div>

                            <div className="footer-column">
                                <h4>Resources</h4>
                                <a href="#docs">Documentation</a>
                                <a href="#api">API</a>
                                <a href="#support">Support</a>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>© 2024 VibeChain. Built on Ethereum.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
