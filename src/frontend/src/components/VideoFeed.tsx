import { Loader2, Video as VideoIcon } from 'lucide-react';
import { useGetAllVideos } from '../hooks/useQueries';
import VideoCard from './VideoCard';

export default function VideoFeed() {
    const { data: videos, isLoading, error } = useGetAllVideos();

    if (isLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-nexus-red" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center">
                <p className="text-lg text-destructive">Failed to load videos</p>
            </div>
        );
    }

    if (!videos || videos.length === 0) {
        return (
            <div className="rounded-lg border border-border/40 bg-card/30 p-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-nexus-red/20 to-nexus-orange/20">
                    <VideoIcon className="h-8 w-8 text-nexus-red" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">No videos yet</h3>
                <p className="text-muted-foreground">
                    Be the first to upload a video to Nexustube!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">
                    <span className="bg-gradient-to-r from-nexus-red to-nexus-orange bg-clip-text text-transparent">
                        Video Feed
                    </span>
                </h2>
                <span className="text-sm text-muted-foreground">
                    {videos.length} {videos.length === 1 ? 'video' : 'videos'}
                </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
}
