import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <span className="brand-logo">VibeChain</span>
                </Link>

                <button
                    className="mobile-menu-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>

                <div className={`navbar-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
                    <Link
                        to="/"
                        className={isActive("/") ? "nav-link active" : "nav-link"}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        to="/how-it-works"
                        className={isActive("/how-it-works") ? "nav-link active" : "nav-link"}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        How It Works
                    </Link>
                    <Link
                        to="/about"
                        className={isActive("/about") ? "nav-link active" : "nav-link"}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        About
                    </Link>
                    <Link
                        to="/verify"
                        className={isActive("/verify") ? "nav-link active" : "nav-link"}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Verify
                    </Link>
                    <Link
                        to="/dashboard"
                        className="btn btn-primary btn-sm"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Dashboard
                    </Link>
                </div>
            </div>
        </nav>
    );
}
