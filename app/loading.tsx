export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-decode-bg z-50">
            <div className="relative flex flex-col items-center">
                {/* CSS-only pulsing logo effect to avoid JS overhead */}
                <div className="w-16 h-16 rounded-xl bg-decode-primary animate-pulse shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/20 rounded-lg animate-spin" />
                </div>
                <div className="h-1 w-32 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-decode-accent animate-[loading_1s_ease-in-out_infinite] w-1/2" />
                </div>
                <span className="mt-4 text-decode-text-muted text-sm tracking-widest uppercase font-mono animate-pulse">Initializing System...</span>
            </div>

            <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
        </div>
    );
}
