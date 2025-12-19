import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    children: React.ReactNode;
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, fullWidth = false, className = '', ...props }) => {
    const baseStyles = "font-bold rounded-xl transition-all duration-300 tracking-wide inline-flex items-center justify-center";

    const variants = {
        primary: "bg-white text-decode-blue-2 hover:bg-cyan-50 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10 py-3 px-8 text-lg shadow-premium",
        secondary: "bg-decode-blue-3 text-white hover:bg-white hover:text-decode-blue-1 py-2 px-6 shadow-md hover:shadow-lg",
        ghost: "text-blue-200 hover:text-white uppercase tracking-widest text-sm py-4"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
