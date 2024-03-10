import { defineStore } from 'pinia';
import type { SpendingSettingsUpdateRequest } from '~/types/requests';
import type { SpendingActualBalancesResponse, SpendingSettingsResponse } from '~/types/responses';
import type { SpendingSettingsState } from '~/types/stores';
import type { SpendingActualBalances, SpendingSettings } from '~/types/types';

export const useSpendingSettingsStore = defineStore('spending-settings', {
    state: () => ({
        loading: true,
        actualBalances: <SpendingActualBalances>{},
        settings: <SpendingSettings>{},
    } as SpendingSettingsState),
    actions: {
        async getSpendingSettingsData() {
            const toast = useToastService();
            this.loading = true;
            try {
                const data = await useApiFetch<SpendingSettingsResponse>('spending/settings');

                this.settings = data.data;
            } catch (err: any) {
                toast.add({ severity: 'error', summary: 'Error!', detail: 'There was an error when getting spending settings data!', life: 3000 });
            }
        },
        async getSpendingActualBalances() {
            const toast = useToastService();
            this.loading = true;
            try {
                const data = await useApiFetch<SpendingActualBalancesResponse>('spending/actual-balances');

                this.actualBalances = data.data;
            } catch (err: any) {
                toast.add({ severity: 'error', summary: 'Error!', detail: 'There was an error when getting spending actual balances data!', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async updateSpendingSettings(data: SpendingSettingsUpdateRequest) {
            const toast = useToastService();
            this.loading = true;
            try {
                const response = await useApiFetch<SpendingSettingsResponse>('spending/settings', {
                    method: 'POST',
                    body: data,
                });

                this.settings = response.data;
                toast.add({ severity: 'success', summary: 'succcess!', detail: 'Settings updated!', life: 3000 });
            } catch (err: any) {
                toast.add({ severity: 'error', summary: 'Error!', detail: 'There was an error when updating settings!', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
    },
});
