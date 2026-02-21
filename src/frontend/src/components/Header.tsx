import { Video, Upload } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export default function Header() {
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <button
                    onClick={() => navigate({ to: '/' })}
                    className="flex items-center gap-2 transition-opacity hover:opacity-80"
                >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-nexus-red to-nexus-orange">
                        <Video className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-nexus-red to-nexus-orange bg-clip-text text-transparent">
                        Nexustube
                    </span>
                </button>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        className="border-nexus-red/30 text-nexus-red hover:bg-nexus-red/10 hover:text-nexus-red"
                        onClick={() => {
                            const uploadSection = document.getElementById('upload-section');
                            if (uploadSection) {
                                uploadSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                    >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Video
                    </Button>
                </div>
            </div>
        </header>
    );
}
