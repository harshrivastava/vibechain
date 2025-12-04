import PropTypes from 'prop-types';
import './DashboardCard.css';

export default function DashboardCard({
    title,
    icon,
    children,
    footer,
    className = '',
    loading = false
}) {
    return (
        <div className={`dashboard-card ${className}`}>
            {loading ? (
                <div className="dashboard-card-loading">
                    <div className="spinner"></div>
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    {(title || icon) && (
                        <div className="dashboard-card-header">
                            {icon && <span className="card-icon">{icon}</span>}
                            {title && <h3 className="card-title">{title}</h3>}
                        </div>
                    )}

                    <div className="dashboard-card-content">
                        {children}
                    </div>

                    {footer && (
                        <div className="dashboard-card-footer">
                            {footer}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

DashboardCard.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.node,
    children: PropTypes.node.isRequired,
    footer: PropTypes.node,
    className: PropTypes.string,
    loading: PropTypes.bool,
};
