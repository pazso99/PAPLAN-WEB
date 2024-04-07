import { defineStore } from 'pinia';
import type { SpendingSettingsUpdateRequest, SpendingMonthMetadataUpdateRequest, SpendingCalculateMonthMetadataRequest } from '~/types/requests';
import type { SpendingSettingsResponse, SpendingMonthlyDataResponse } from '~/types/responses';
import type { SpendingSettingsState } from '~/types/stores';
import type { SpendingSettings } from '~/types/types';

export const useSpendingSettingsStore = defineStore('spending-settings', {
    state: () => ({
        loading: true,
        settings: <SpendingSettings>{},
        monthlyMetadata: [],
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
        async updateSpendingSettings(data: SpendingSettingsUpdateRequest) {
            const toast = useToastService();
            this.loading = true;
            try {
                const response = await useApiFetch<SpendingSettingsResponse>('spending/settings', {
                    method: 'POST',
                    body: data,
                });

                this.settings = response.data;
                toast.add({ severity: 'success', summary: 'success!', detail: 'Settings updated!', life: 3000 });
            } catch (err: any) {
                toast.add({ severity: 'error', summary: 'Error!', detail: 'There was an error when updating settings!', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async calculateMonthMetadata(data: SpendingCalculateMonthMetadataRequest) {
            const toast = useToastService();
            this.loading = true;
            try {
                await useApiFetch('spending/calculate-month-metadata', {
                    method: 'POST',
                    body: data,
                });

                toast.add({ severity: 'success', summary: 'success!', detail: 'Month calculated!', life: 3000 });
            } catch (err: any) {
                toast.add({ severity: 'error', summary: 'Error!', detail: 'There was an error when calculating!', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async getMonthsMetadata() {
            const toast = useToastService();
            this.loading = true;
            try {
                const response = await useApiFetch<SpendingMonthlyDataResponse>('spending/months-metadata');
                this.monthlyMetadata = response.data.monthlyMetadata;
            } catch (err: any) {
                toast.add({ severity: 'error', summary: 'Error!', detail: 'There was an error when getting months metadata!', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async updateMonthMetadata(data: SpendingMonthMetadataUpdateRequest) {
            const toast = useToastService();
            this.loading = true;
            try {
                await useApiFetch(`spending/update-month-metadata/${data.id}`, {
                    method: 'POST',
                    body: data,
                });

                toast.add({ severity: 'success', summary: 'success!', detail: `${data.year}-${data.month} metadata updated!`, life: 3000 });
            } catch (err: any) {
                toast.add({ severity: 'error', summary: 'Error!', detail: `There was an error when updating ${data.year}-${data.month} metadata!`, life: 3000 });
            } finally {
                this.loading = false;
            }
        },
    },
});
