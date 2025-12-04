import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    const navItems = [
        { path: '/', icon: '🏠', label: 'Home' },
        { path: '/dashboard', icon: '📊', label: 'Dashboard' },
        { path: '/verify', icon: '🔍', label: 'Verify' },
        { path: '/how-it-works', icon: '❓', label: 'How It Works' },
        { path: '/about', icon: 'ℹ️', label: 'About' },
    ];

    return (
        <>
            <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header">
                    <Link to="/" className="sidebar-brand">
                        <span className="brand-icon">⛓️</span>
                        {!isCollapsed && <span className="brand-text">VibeChain</span>}
                    </Link>
                    <button
                        className="sidebar-toggle"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        aria-label="Toggle sidebar"
                    >
                        {isCollapsed ? '→' : '←'}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`sidebar-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                            title={isCollapsed ? item.label : ''}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            {!isCollapsed && <span className="nav-label">{item.label}</span>}
                            {location.pathname === item.path && <span className="active-indicator"></span>}
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="sidebar-user">
                        <div className="user-avatar">
                            <span>👤</span>
                        </div>
                        {!isCollapsed && (
                            <div className="user-info">
                                <div className="user-name">Vendor</div>
                                <div className="user-status">Connected</div>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Mobile overlay */}
            {!isCollapsed && (
                <div
                    className="sidebar-overlay"
                    onClick={() => setIsCollapsed(true)}
                ></div>
            )}
        </>
    );
}
