import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoPlayer from '../components/VideoPlayer';
import { useGetVideo } from '../hooks/useQueries';

export default function VideoPlaybackPage() {
    const { videoId } = useParams({ from: '/video/$videoId' });
    const navigate = useNavigate();
    const { data: video, isLoading, error } = useGetVideo(videoId);

    if (isLoading) {
        return (
            <div className="container py-12">
                <div className="flex min-h-[400px] items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-nexus-red" />
                </div>
            </div>
        );
    }

    if (error || !video) {
        return (
            <div className="container py-12">
                <div className="mx-auto max-w-4xl">
                    <Button
                        variant="ghost"
                        onClick={() => navigate({ to: '/' })}
                        className="mb-6"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Button>
                    <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
                        <p className="text-lg text-destructive">
                            {error ? 'Failed to load video' : 'Video not found'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-8 md:py-12">
            <div className="mx-auto max-w-6xl">
                <Button
                    variant="ghost"
                    onClick={() => navigate({ to: '/' })}
                    className="mb-6 hover:text-nexus-red"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Button>

                <div className="space-y-6">
                    <VideoPlayer video={video} />
                    
                    <div className="rounded-lg border border-border/40 bg-card/50 p-6">
                        <h1 className="text-2xl font-bold text-foreground">{video.name}</h1>
                        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Video ID: {video.id}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
