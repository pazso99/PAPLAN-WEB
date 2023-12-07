import { defineStore } from 'pinia';

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        spending: null,
    }),
    actions: {
        async getSpendingData(date: string) {
            const toast = useToast();
            try {
                const data: any = await useApiFetch('dashboard/spending-data', {
                    method: 'POST',
                    body: {
                        date // TODO
                    },
                });

                this.spending = data.data;
            } catch (err: any) {
                toast.add({ title: 'Error!', color: 'red', icon: 'i-heroicons-exclamation-triangle' });
            }
        },
    },
});
