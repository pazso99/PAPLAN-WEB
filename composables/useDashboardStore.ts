import { defineStore } from 'pinia';

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        loading: true,
        spendingSelectedDate: null,
        spending: null,
    }),
    actions: {
        async getSpendingData(body: any) {
            const toast = useToast();
            this.loading = true;
            try {
                const data: any = await useApiFetch('dashboard/spending-data', {
                    method: 'POST',
                    body,
                });

                this.spending = data.data;
            } catch (err: any) {
                toast.add({ title: 'There was an error when getting spending data!', color: 'red', icon: 'i-heroicons-exclamation-triangle' });
            } finally {
                this.loading = false;
            }
        },
        async createTransaction(body: any) {
            const toast = useToast();
            this.loading = true;
            try {
                await useApiFetch('spending/transactions', {
                    method: 'POST',
                    body,
                });

                toast.add({ title: 'Transaction created!', color: 'green', icon: 'i-heroicons-check-circle' });
            } catch (err: any) {
                toast.add({ title: 'There was an error when creating transaction data!', color: 'red', icon: 'i-heroicons-exclamation-triangle' });
            } finally {
                this.loading = false;
            }
        },
    },
});
