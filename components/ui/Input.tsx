import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-decode-text-secondary mb-1.5 ml-1">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-decode-text-muted group-focus-within:text-decode-accent transition-colors">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={`
                            w-full bg-decode-surface/50 border border-white/10 rounded-xl px-4 py-3 
                            text-decode-text-primary placeholder:text-decode-text-muted/50
                            focus:outline-none focus:border-decode-accent/50 focus:ring-1 focus:ring-decode-accent/50 focus:bg-decode-surface
                            transition-all duration-200
                            ${icon ? 'pl-10' : ''}
                            ${error ? 'border-decode-error/50 focus:border-decode-error' : ''}
                            ${className}
                        `}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-1 text-xs text-decode-error ml-1">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;
