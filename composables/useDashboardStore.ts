import { defineStore } from 'pinia';
import type { SpendingDataResponse } from '~/types/responses';
import type { SpendingDashboardState } from '~/types/types';

export const useDashboardStore = defineStore('dashboard', {
    state: () => ({
        loading: true,
        spendingSelectedDate: null,
        spending: null,
    } as SpendingDashboardState),
    actions: {
        async getSpendingData(body: any) {
            const toast = useToastService();
            this.loading = true;

            try {
                const data: any = await useApiFetch<SpendingDataResponse>('dashboard/spending-data', {
                    method: 'POST',
                    body,
                });
                this.spending = data.data;
            } catch (err: unknown) {
                toast.add({ severity: 'error', summary: 'Error!', detail: 'There was an error when getting spending data!', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async createTransaction(body: any) {
            const toast = useToastService();
            this.loading = true;

            try {
                await useApiFetch('spending/transactions', {
                    method: 'POST',
                    body,
                });
                toast.add({ summary: 'Transaction created!', severity: 'success', detail: 'Succesfull', life: 3000 });
            } catch (err: unknown) {
                toast.add({ severity: 'error', summary: 'Error!', detail: 'There was an error when creating transaction data!', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
    },
});
