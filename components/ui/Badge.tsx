import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'outline' | 'success' | 'warning' | 'error' | 'accent';
    className?: string;
}

const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => {
    const variants = {
        default: 'bg-white/10 text-decode-text-primary border-white/5',
        outline: 'bg-transparent border-white/20 text-decode-text-secondary',
        success: 'bg-decode-success/10 text-decode-success border-decode-success/20',
        warning: 'bg-decode-warning/10 text-decode-warning border-decode-warning/20',
        error: 'bg-decode-error/10 text-decode-error border-decode-error/20',
        accent: 'bg-decode-accent/10 text-decode-accent border-decode-accent/20',
    };

    return (
        <span className={`
            inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium border
            ${variants[variant]}
            ${className}
        `}>
            {children}
        </span>
    );
};

export default Badge;
