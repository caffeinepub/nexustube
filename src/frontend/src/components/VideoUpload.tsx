import { useState, useRef } from 'react';
import { Upload, Video, X, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAddVideo } from '../hooks/useQueries';
import { toast } from 'sonner';
import { ExternalBlob } from '../backend';

export default function VideoUpload() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [videoName, setVideoName] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const addVideoMutation = useAddVideo();

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('video/')) {
                toast.error('Please select a valid video file');
                return;
            }
            setSelectedFile(file);
            if (!videoName) {
                setVideoName(file.name.replace(/\.[^/.]+$/, ''));
            }
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || !videoName.trim()) {
            toast.error('Please select a video and enter a name');
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);

        try {
            const arrayBuffer = await selectedFile.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);
            
            const videoId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            
            const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
                setUploadProgress(percentage);
            });

            await addVideoMutation.mutateAsync({
                id: videoId,
                blob,
                name: videoName.trim()
            });

            toast.success('Video uploaded successfully!', {
                description: 'Your video is now available in the feed.'
            });

            // Reset form
            setSelectedFile(null);
            setVideoName('');
            setUploadProgress(0);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload video', {
                description: error instanceof Error ? error.message : 'Please try again.'
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleCancel = () => {
        setSelectedFile(null);
        setVideoName('');
        setUploadProgress(0);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Card className="border-border/40 bg-card/50 backdrop-blur">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-nexus-red to-nexus-orange">
                        <Upload className="h-5 w-5 text-white" />
                    </div>
                    Upload Your Video
                </CardTitle>
                <CardDescription>
                    Share your content with the Nexustube community
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="video-file">Video File</Label>
                    <div className="flex items-center gap-3">
                        <Input
                            id="video-file"
                            ref={fileInputRef}
                            type="file"
                            accept="video/*"
                            onChange={handleFileSelect}
                            disabled={isUploading}
                            className="cursor-pointer"
                        />
                        {selectedFile && !isUploading && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleCancel}
                                className="shrink-0"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                    {selectedFile && (
                        <div className="flex items-center gap-2 rounded-md border border-border/40 bg-muted/50 p-3 text-sm">
                            <Video className="h-4 w-4 text-nexus-red" />
                            <span className="flex-1 truncate">{selectedFile.name}</span>
                            <span className="text-muted-foreground">
                                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </span>
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="video-name">Video Name</Label>
                    <Input
                        id="video-name"
                        placeholder="Enter a name for your video"
                        value={videoName}
                        onChange={(e) => setVideoName(e.target.value)}
                        disabled={isUploading}
                    />
                </div>

                {isUploading && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Uploading...</span>
                            <span className="font-medium text-nexus-red">{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                    </div>
                )}

                <div className="flex gap-3">
                    <Button
                        onClick={handleUpload}
                        disabled={!selectedFile || !videoName.trim() || isUploading}
                        className="flex-1 bg-gradient-to-r from-nexus-red to-nexus-orange hover:opacity-90"
                    >
                        {isUploading ? (
                            <>
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Video
                            </>
                        )}
                    </Button>
                    {selectedFile && !isUploading && (
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                            className="border-border/40"
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
