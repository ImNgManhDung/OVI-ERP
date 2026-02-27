import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  label?: string;
  title?: string;
  value: string | number;
  color?: 'blue' | 'green' | 'purple' | 'gray' | 'orange' | 'red';
  icon?: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: number;
  trendLabel?: string;
  subtitle?: string;
  /** Legacy props for backward compat */
  bgColor?: string;
  iconBgColor?: string;
}

export function StatsCard({ 
  label, 
  title,
  value, 
  color = 'gray',
  icon: Icon,
  iconColor,
  iconBg,
  trend,
  trendLabel,
  subtitle,
  bgColor,
  iconBgColor,
}: StatsCardProps) {
  const displayTitle = title || label;

  // If icon is provided, use KPICard-style layout
  if (Icon) {
    // Backward-compat: derive color from bgColor string (e.g. "text-red-500")
    const derivedIconColor = iconColor || (
      bgColor?.includes('red') ? '#dc2626' :
      bgColor?.includes('orange') ? '#d97706' :
      bgColor?.includes('yellow') ? '#ca8a04' :
      bgColor?.includes('green') ? '#16a34a' :
      bgColor?.includes('blue') ? '#1d4ed8' :
      '#64748b'
    );
    const derivedIconBg = iconBg || iconBgColor || '#f1f5f9';

    const trendPositive = trend !== undefined && trend >= 0;

    return (
      <div className="erp-card p-4 flex items-start justify-between hover:shadow-md transition-shadow cursor-default">
        <div className="flex-1">
          <p className="text-xs font-medium mb-1" style={{ color: '#64748b' }}>{displayTitle}</p>
          <p className="text-2xl font-bold" style={{ color: '#1e293b', lineHeight: 1.2 }}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {trend !== undefined && (
            <div className="flex items-center gap-1 mt-1.5">
              {trendPositive ? (
                <TrendingUp className="w-3 h-3 text-green-500" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-400" />
              )}
              <span className={`text-xs font-medium ${trendPositive ? 'text-green-600' : 'text-red-500'}`}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
              {trendLabel && <span className="text-xs text-gray-400">{trendLabel}</span>}
            </div>
          )}
          {subtitle && !trend && (
            <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>{subtitle}</p>
          )}
        </div>
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ml-3"
          style={{ backgroundColor: derivedIconBg }}
        >
          <Icon className="w-5 h-5" style={{ color: derivedIconColor }} />
        </div>
      </div>
    );
  }

  // Original simple card layout
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-100',
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-100',
    },
    orange: {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-100',
    },
    red: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      border: 'border-red-100',
    },
    gray: {
      bg: 'bg-gray-50',
      text: 'text-gray-700',
      border: 'border-gray-100',
    },
  };

  const classes = colorClasses[color];

  return (
    <div className={`${classes.bg} ${classes.border} border rounded-lg px-6 py-4 text-center min-w-[160px]`}>
      <div className={`text-xs font-semibold uppercase mb-1 ${classes.text}`}>
        {displayTitle}
      </div>
      <div className={`text-3xl font-bold ${classes.text}`}>
        {value}
      </div>
    </div>
  );
}

// Default export for backward compatibility
export default StatsCard;
