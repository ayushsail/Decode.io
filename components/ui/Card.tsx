import React from 'react';

interface CardProps {
    title: string;
    children: React.ReactNode;
    color?: string;
    accent?: string;
    className?: string; // Allow custom classes
}

const Card: React.FC<CardProps> = ({ title, children, color = 'bg-decode-blue-2', accent = 'from-cyan-400/20 to-transparent', className = '' }) => {
    return (
        <div className={`relative ${color} rounded-[2rem] overflow-hidden flex flex-col shadow-premium ring-1 ring-white/10 hover:ring-white/20 transition-all duration-500 hover:shadow-2xl group ${className}`}>

            {/* Dynamic Background Accents */}
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial ${accent} opacity-40 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:opacity-60 transition-opacity duration-700`}></div>

            <div className="p-8 md:p-10 pb-2 relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-sm">{title}</h3>
                <div className="h-1.5 w-16 bg-white/20 rounded-full mt-4 group-hover:w-24 transition-all duration-500 ease-out"></div>
            </div>

            <div className="flex-1 relative z-10 flex flex-col">
                {children}
            </div>
        </div>
    );
};

export default Card;
