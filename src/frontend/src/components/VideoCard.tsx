import { useNavigate } from '@tanstack/react-router';
import { Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Video } from '../backend';

interface VideoCardProps {
    video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
    const navigate = useNavigate();
    const videoUrl = video.blob.getDirectURL();

    const handleClick = () => {
        navigate({ to: '/video/$videoId', params: { videoId: video.id } });
    };

    return (
        <Card
            className="group cursor-pointer overflow-hidden border-border/40 bg-card/50 backdrop-blur transition-all hover:border-nexus-red/50 hover:shadow-lg hover:shadow-nexus-red/10"
            onClick={handleClick}
        >
            <CardContent className="p-0">
                <div className="relative aspect-video overflow-hidden bg-muted">
                    <video
                        src={videoUrl}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        preload="metadata"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-nexus-red to-nexus-orange shadow-lg">
                            <Play className="h-6 w-6 fill-white text-white" />
                        </div>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="line-clamp-2 font-semibold text-foreground group-hover:text-nexus-red transition-colors">
                        {video.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Video ID: {video.id.slice(0, 12)}...
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
