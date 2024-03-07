export async function useDeleteCall(
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
