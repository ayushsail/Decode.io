import React from 'react';

interface CardProps {
    title?: string; // made optional
    children: React.ReactNode;
    color?: string; // strictly for overriding background
    className?: string;
    noPadding?: boolean;
}

const Card: React.FC<CardProps> = ({
    title,
    children,
    color,
    className = '',
    noPadding = false
}) => {
    return (
        <div className={`
            relative overflow-hidden rounded-[2rem] 
            ${color ? color : 'glass-panel'}
            flex flex-col
            shadow-premium
            group
            ${className}
        `}>
            {/* Soft inner glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

            {title && (
                <div className="p-8 pb-4 relative z-10 border-b border-white/5">
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white drop-shadow-sm">{title}</h3>
                </div>
            )}

            <div className={`relative z-10 h-full ${noPadding ? '' : 'p-6 md:p-8'}`}>
                {children}
            </div>
        </div>
    );
};

export default Card;
