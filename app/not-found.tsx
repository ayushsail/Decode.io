import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function NotFound() {
    return (
        <div className="h-[70vh] flex flex-col items-center justify-center text-center space-y-6">
            <h2 className="text-9xl font-bold text-white/5 select-none">404</h2>
            <div className="absolute">
                <h1 className="text-4xl font-bold text-white mb-4">Signal Lost</h1>
                <p className="text-decode-text-secondary mb-8">The requested sector could not be found.</p>
                <Link href="/">
                    <Button variant="primary">Return Home</Button>
                </Link>
            </div>
        </div>
    )
}
