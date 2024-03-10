import { defineStore } from 'pinia';
import type { SpendingDashboardRequest, SpendingTransactionRequest } from '~/types/requests';
import type { SpendingDashboardResponse } from '~/types/responses';
import type { SpendingDashboardState } from '~/types/stores';

export const useSpendingDashboardStore = defineStore('spending-dashboard', {
    state: () => ({
        loading: true,
        spendingSelectedDate: '',
        spendingDashboardData: {},
    } as SpendingDashboardState),
    actions: {
        async getSpendingData(body: SpendingDashboardRequest) {
            const toast = useToastService();
            this.loading = true;

            try {
                const response = await useApiFetch<SpendingDashboardResponse>('dashboard/spending-data', {
                    method: 'POST',
                    body,
                });
                this.spendingDashboardData = response.data;
            } catch (err: any) {
                toast.add({ severity: 'error', summary: 'Error!', detail: 'There was an error when getting spending data!', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async createTransaction(data: SpendingTransactionRequest) {
            const toast = useToastService();
            this.loading = true;

            try {
                await useApiFetch('spending/transactions', {
                    method: 'POST',
                    body: data,
                });
                toast.add({ summary: 'Transaction created!', severity: 'success', detail: 'Succesfull', life: 3000 });
            } catch (err: any) {
                toast.add({ severity: 'error', summary: 'Error!', detail: 'There was an error when creating transaction data!', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
    },
});
