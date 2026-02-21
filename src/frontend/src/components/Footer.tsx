import { Heart } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const appIdentifier = typeof window !== 'undefined' 
        ? encodeURIComponent(window.location.hostname) 
        : 'nexustube-app';

    return (
        <footer className="border-t border-border/40 bg-card/50 backdrop-blur">
            <div className="container py-6">
                <div className="flex flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
                    <p className="flex items-center gap-1">
                        © {currentYear} Nexustube. Built with{' '}
                        <Heart className="h-4 w-4 fill-nexus-red text-nexus-red" /> using{' '}
                        <a
                            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-foreground hover:text-nexus-orange transition-colors"
                        >
                            caffeine.ai
                        </a>
                    </p>
                    <p className="text-xs">Create. Connect. Earn.</p>
                </div>
            </div>
        </footer>
    );
}
