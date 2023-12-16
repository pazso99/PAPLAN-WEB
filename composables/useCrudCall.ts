export async function useCrudCall(type: any, url: any, navUrl: any, options: any = {}) {
    const toast = useToast();
    try {
        if (type === 'index' || type === 'show') {
            const data: any = await useApiFetch(`${url}`);
            return data.data;
        }

        if (type === 'store' || type === 'update') {
            const createdData: any = await useApiFetch(`${url}`, options);
            navigateTo(`/${navUrl}/${createdData.data.id}`);
            toast.add({ title: (type === 'store' ? 'Record created!' : 'Record updated'), color: 'green', icon: 'i-heroicons-check-circle' });
            return;
        }

        if (type === 'delete') {
            await useApiFetch(`${url}`, options);
            navigateTo(`/${navUrl}`);
            toast.add({ title: 'Record deleted!', color: 'green', icon: 'i-heroicons-check-circle' });
        }
    } catch (err: any) {
        navigateTo(`/${navUrl}`);
        toast.add({ title: 'Some error happened!', color: 'red', icon: 'i-heroicons-exclamation-triangle' });
    }
}
