import type { ApiResponse } from '~/types/responses';

export async function useUpdateCall(
    url: string,
    navUrl: string,
    options: Record<string, unknown> = {},
): Promise<void> {
    const toast = useToastService();
    try {
        const createdData = await useApiFetch<ApiResponse<{ id: string }>>(`${url}`, options);

        navigateTo(`/${navUrl}/${createdData.data.id}`);
        toast.add({ summary: 'Record updated', severity: 'success', detail: 'Succesful', life: 3000 });
        return;
    } catch (err: unknown) {
        navigateTo(`/${navUrl}`);
        toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
    }
}
