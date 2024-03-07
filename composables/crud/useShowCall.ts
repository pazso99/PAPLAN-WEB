import type { ApiResponse } from '~/types/responses';

export async function useShowCall<T>(
    url: string,
    navUrl: string,
) {
    const toast = useToastService();
    try {
        const data = await useApiFetch<ApiResponse<T>>(`${url}`);
        return data.data;
    } catch (err: unknown) {
        navigateTo(`/${navUrl}`);
        toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
    }
}
