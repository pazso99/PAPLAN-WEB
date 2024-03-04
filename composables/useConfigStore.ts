import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', {
    state: () => ({
        loading: true,
        spendingActualBalances: null,
        spendingSettings: null,
    }),
    actions: {
        async getSpendingSettingsData() {
            const toast = useToastService();
            this.loading = true;
            try {
                const data: any = await useApiFetch('spending/settings');

                this.spendingSettings = data.data;
            } catch (err: any) {
                toast.add({ severity: 'error', summary: 'Error!', detail: 'There was an error when getting spending settings data!', life: 3000 });
            }
        },
        async getSpendingActualBalances() {
            const toast = useToastService();
            this.loading = true;
            try {
                const data: any = await useApiFetch('spending/actual-balances');

                this.spendingActualBalances = data.data;
            } catch (err: any) {
                toast.add({ severity: 'error', summary: 'Error!', detail: 'There was an error when getting spending actual balances data!', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async updateSpendingSettings(body: any) {
            const toast = useToastService();
            this.loading = true;
            try {
                await useApiFetch('spending/settings', {
                    method: 'POST',
                    body,
                });

                toast.add({ severity: 'success', summary: 'succcess!', detail: 'Settings updated!', life: 3000 });
            } catch (err: any) {
                toast.add({ severity: 'error', summary: 'Error!', detail: 'There was an error when updating settings!', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
    },
});
