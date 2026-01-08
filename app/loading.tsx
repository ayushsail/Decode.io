import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-decode-bg/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 size={48} className="text-decode-primary animate-spin" />
                <p className="text-decode-text-muted font-mono text-sm animate-pulse">Initializing System...</p>
            </div>
        </div>
    )
}
