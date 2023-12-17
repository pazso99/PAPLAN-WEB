import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', {
    state: () => ({
        loading: true,
        spendingActualBalances: null,
        spendingSettings: null,
    }),
    actions: {
        async getSpendingSettingsData() {
            const toast = useToast();
            this.loading = true;
            try {
                const data: any = await useApiFetch('spending/settings');

                this.spendingSettings = data.data;
            } catch (err: any) {
                toast.add({ title: 'There was an error when getting spending settings data!', color: 'red', icon: 'i-heroicons-exclamation-triangle' });
            }
        },
        async getSpendingActualBalances() {
            const toast = useToast();
            this.loading = true;
            try {
                const data: any = await useApiFetch('spending/actual-balances');

                this.spendingActualBalances = data.data;
            } catch (err: any) {
                toast.add({ title: 'There was an error when getting spending actual balances data!', color: 'red', icon: 'i-heroicons-exclamation-triangle' });
            } finally {
                this.loading = false;
            }
        },
        async updateSpendingSettings(body: any) {
            const toast = useToast();
            this.loading = true;
            try {
                await useApiFetch('spending/settings', {
                    method: 'POST',
                    body,
                });

                toast.add({ title: 'Settings updated!', color: 'green', icon: 'i-heroicons-check-circle' });
            } catch (err: any) {
                toast.add({ title: 'There was an error when updating settings!', color: 'red', icon: 'i-heroicons-exclamation-triangle' });
            } finally {
                this.loading = false;
            }
        },
    },
});
