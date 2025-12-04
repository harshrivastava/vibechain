import PropTypes from 'prop-types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import './StatsCard.css';

export default function StatsCard({
    title,
    value,
    icon,
    trend,
    trendValue,
    color = 'blue'
}) {
    const getTrendIcon = () => {
        if (trend === 'up') return <TrendingUp size={14} />;
        if (trend === 'down') return <TrendingDown size={14} />;
        return <Minus size={14} />;
    };

    const getTrendClass = () => {
        if (trend === 'up') return 'trend-up';
        if (trend === 'down') return 'trend-down';
        return 'trend-neutral';
    };

    return (
        <div className={`stats-card stats-card-${color}`}>
            <div className="stats-card-header">
                <div className={`stats-icon stats-icon-${color}`}>
                    {icon}
                </div>
                {trendValue && (
                    <div className={`stats-trend ${getTrendClass()}`}>
                        {getTrendIcon()}
                        <span className="trend-value">{trendValue}</span>
                    </div>
                )}
            </div>

            <div className="stats-card-content">
                <div className="stats-value">{value}</div>
                <div className="stats-title">{title}</div>
            </div>
        </div>
    );
}

StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.node.isRequired,
    trend: PropTypes.oneOf(['up', 'down', 'neutral']),
    trendValue: PropTypes.string,
    color: PropTypes.oneOf(['blue', 'green', 'amber', 'red']),
};
