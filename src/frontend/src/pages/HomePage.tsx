import VideoUpload from '../components/VideoUpload';
import VideoFeed from '../components/VideoFeed';

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-br from-background via-background to-nexus-red/5">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-nexus-red/10 via-transparent to-nexus-orange/10" />
                <div className="container relative py-16 md:py-24">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                            <span className="bg-gradient-to-r from-nexus-red via-nexus-orange to-nexus-red bg-clip-text text-transparent">
                                Create. Connect. Earn.
                            </span>
                        </h1>
                        <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                            Share your videos with the world. Upload, stream, and discover amazing content on Nexustube.
                        </p>
                    </div>
                </div>
            </section>

            {/* Upload Section */}
            <section id="upload-section" className="border-b border-border/40 bg-card/30">
                <div className="container py-12 md:py-16">
                    <VideoUpload />
                </div>
            </section>

            {/* Video Feed Section */}
            <section className="bg-background">
                <div className="container py-12 md:py-16">
                    <VideoFeed />
                </div>
            </section>
        </div>
    );
}
