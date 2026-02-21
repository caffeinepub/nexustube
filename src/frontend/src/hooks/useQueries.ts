import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Video } from '../backend';
import { ExternalBlob } from '../backend';

export function useGetAllVideos() {
    const { actor, isFetching } = useActor();

    return useQuery<Video[]>({
        queryKey: ['videos'],
        queryFn: async () => {
            if (!actor) return [];
            return actor.getAllVideos();
        },
        enabled: !!actor && !isFetching,
    });
}

export function useGetVideo(id: string) {
    const { actor, isFetching } = useActor();

    return useQuery<Video>({
        queryKey: ['video', id],
        queryFn: async () => {
            if (!actor) throw new Error('Actor not initialized');
            return actor.getVideo(id);
        },
        enabled: !!actor && !isFetching && !!id,
    });
}

export function useAddVideo() {
    const { actor } = useActor();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, blob, name }: { id: string; blob: ExternalBlob; name: string }) => {
            if (!actor) throw new Error('Actor not initialized');
            return actor.addVideo(id, blob, name);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['videos'] });
        },
    });
}
