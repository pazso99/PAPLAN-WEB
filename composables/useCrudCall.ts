import type { ApiResponse } from '~/types/responses';

async function useIndexCall<T>(
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
        return {} as T;
    }
}

async function useShowCall<T>(
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
        return {} as T;
    }
}

async function useStoreCall(
    url: string,
    navUrl: string,
    options: Record<string, unknown> = {},
): Promise<void> {
    const toast = useToastService();
    try {
        await useApiFetch(`${url}`, options);
        navigateTo(`/${navUrl}`);
        toast.add({ summary: 'Record created!', severity: 'success', detail: 'Succesful', life: 3000 });
        return;
    } catch (err: unknown) {
        navigateTo(`/${navUrl}`);
        toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
    }
}

async function useUpdateCall(
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

async function useDeleteCall(
    url: string,
    navUrl: string,
    options: Record<string, unknown> = {},
): Promise<void> {
    const toast = useToastService();
    try {
        await useApiFetch(`${url}`, options);

        navigateTo(`/${navUrl}`);
        toast.add({ summary: 'Record deleted!', severity: 'success', detail: 'Succesful', life: 3000 });
    } catch (err: unknown) {
        navigateTo(`/${navUrl}`);
        toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
    }
}

export {
    useIndexCall,
    useShowCall,
    useStoreCall,
    useUpdateCall,
    useDeleteCall,
};
