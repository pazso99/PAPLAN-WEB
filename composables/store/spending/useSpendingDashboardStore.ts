import { defineStore } from 'pinia';
import type { SpendingDashboardRequest, SpendingTransactionCreateRequest } from '~/types/requests';
import type { SpendingDashboardResponse, SpendingTransactionResponse } from '~/types/responses';
import type { SpendingDashboardState } from '~/types/stores';
import type { SpendingDashboardData } from '~/types/types';

export const useSpendingDashboardStore = defineStore('spending-dashboard', {
    state: () => ({
        loading: true,
        spendingSelectedDate: '',
        spendingDashboardData: <SpendingDashboardData>{},
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
        async createTransaction(data: SpendingTransactionCreateRequest) {
            const toast = useToastService();
            this.loading = true;

            try {
                await useApiFetch<SpendingTransactionResponse>('spending/transactions', {
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
