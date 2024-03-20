import { defineStore } from 'pinia';
// import type { InventoryDashboardResponse } from '~/types/responses';
import type { InventoryDashboardState } from '~/types/stores';

export const useInventoryDashboardStore = defineStore('inventory-dashboard', {
    state: () => ({
        loading: true,
        inventory: [],
    } as InventoryDashboardState),
    actions: {
        async getInventoryDashboardData() {
            const toast = useToastService();
            try {
                this.loading = true;
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
    },
});
