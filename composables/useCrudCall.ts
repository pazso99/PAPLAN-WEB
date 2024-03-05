export async function useCrudCall(
    type: any,
    url: any,
    navUrl: any,
    options: any = {},
) {
    const toast = useToastService();
    try {
        if (type === 'index' || type === 'show') {
            const data: any = await useApiFetch(`${url}`);
            return data.data;
        }

        if (type === 'store') {
            await useApiFetch(`${url}`, options);

            navigateTo(`/${navUrl}`);
            toast.add({ summary: 'Record created!', severity: 'success', detail: 'Succesful', life: 3000 });
            return;
        }

        if (type === 'update') {
            const createdData: any = await useApiFetch(`${url}`, options);

            navigateTo(`/${navUrl}/${createdData.data.id}`);
            toast.add({ summary: 'Record updated', severity: 'success', detail: 'Succesful', life: 3000 });
            return;
        }

        if (type === 'delete') {
            await useApiFetch(`${url}`, options);

            navigateTo(`/${navUrl}`);
            toast.add({ summary: 'Record deleted!', severity: 'success', detail: 'Succesful', life: 3000 });
        }
    } catch (err: any) {
        navigateTo(`/${navUrl}`);
        toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
    }
}
