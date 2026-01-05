import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'accent' | 'danger';
    children: React.ReactNode;
    fullWidth?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    children,
    fullWidth = false,
    size = 'md',
    className = '',
    ...props
}) => {
    const baseStyles = "font-bold rounded-xl transition-all duration-300 tracking-wide inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

    const sizes = {
        sm: "py-1.5 px-4 text-xs",
        md: "py-2.5 px-6 text-sm",
        lg: "py-3.5 px-8 text-base",
    };

    const variants = {
        primary: "bg-decode-primary text-white hover:bg-decode-primary-hover shadow-lg hover:shadow-decode-primary/20",
        accent: "bg-decode-accent/10 text-decode-accent border border-decode-accent/20 hover:bg-decode-accent/20 hover:shadow-glow",
        secondary: "bg-decode-surface hover:bg-decode-surface-hover text-decode-text-primary border border-white/5",
        ghost: "text-decode-text-secondary hover:text-white hover:bg-white/5",
        danger: "bg-decode-error/10 text-decode-error hover:bg-decode-error/20 border border-decode-error/20"
    };

    return (
        <button
            className={`
                ${baseStyles} 
                ${variants[variant]} 
                ${sizes[size]}
                ${fullWidth ? 'w-full' : ''} 
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
