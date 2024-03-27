import { defineStore } from 'pinia';
import type { InventoryDashboardResponse, InventoryPurchasedItemResponse } from '~/types/responses';
import type { InventoryDashboardState } from '~/types/stores';

export const useInventoryDashboardStore = defineStore('inventory-dashboard', {
    state: () => ({
        loading: true,
        inventoryItemTypes: [],
        activeTabs: [],
    } as InventoryDashboardState),
    actions: {
        async getInventoryDashboardData() {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<InventoryDashboardResponse>('dashboard/inventory-data');

                this.inventoryItemTypes = response.data.inventoryItemTypes;
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async useInStockItem(stockItemId: number) {
            const toast = useToastService();
            try {
                await useApiFetch<InventoryPurchasedItemResponse>(`inventory/purchased-items/use-item/${stockItemId}`);

                toast.add({ summary: 'Item used', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            }
        },
    },
});
