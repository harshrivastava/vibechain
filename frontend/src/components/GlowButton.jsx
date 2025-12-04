import PropTypes from 'prop-types';
import './GlowButton.css';

export default function GlowButton({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    loading = false,
    disabled = false,
    className = '',
    type = 'button'
}) {
    const buttonClass = `glow-button glow-button-${variant} glow-button-${size} ${className}`;

    return (
        <button
            type={type}
            className={buttonClass}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? (
                <>
                    <span className="spinner spinner-sm"></span>
                    <span>Loading...</span>
                </>
            ) : (
                <>
                    {icon && iconPosition === 'left' && <span className="button-icon">{icon}</span>}
                    <span>{children}</span>
                    {icon && iconPosition === 'right' && <span className="button-icon">{icon}</span>}
                </>
            )}
        </button>
    );
}

GlowButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['primary', 'outline', 'secondary', 'ghost']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    icon: PropTypes.node,
    iconPosition: PropTypes.oneOf(['left', 'right']),
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
};
