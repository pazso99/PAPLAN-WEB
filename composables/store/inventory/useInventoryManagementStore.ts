import { defineStore } from 'pinia';
import type { InventoryManagementState } from '~/types/stores';
import type {
    InventoryPackageUnitCreateRequest,
    InventoryPackageUnitUpdateRequest,
    InventoryItemTypeCreateRequest,
    InventoryItemTypeUpdateRequest,
    InventoryItemCreateRequest,
    InventoryItemUpdateRequest,
    InventoryPurchasedItemCreateRequest,
    InventoryPurchasedItemUpdateRequest,
} from '~/types/requests';
import type {
    InventoryPackageUnitResponse,
    InventoryPackageUnitListResponse,
    InventoryItemTypeResponse,
    InventoryItemTypeListResponse,
    InventoryItemResponse,
    InventoryItemListResponse,
    InventoryPurchasedItemResponse,
    InventoryPurchasedItemListResponse,
} from '~/types/responses';
import type {
    PackageUnit,
    ItemType,
    Item,
    PurchasedItem,
} from '~/types/models';

export const useInventoryManagementStore = defineStore('inventory-management', {
    state: () => ({
        loading: true,
        packageUnits: [],
        packageUnit: <PackageUnit>{},
        itemTypes: [],
        itemType: <ItemType>{},
        items: [],
        item: <Item>{},
        purchasedItems: [],
        purchasedItem: <PurchasedItem>{},
    } as InventoryManagementState),
    actions: {
        // Package units
        async getPackageUnits() {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<InventoryPackageUnitListResponse>('inventory/package-units');

                this.packageUnits = response.data.map(packageUnit => ({
                    ...packageUnit,
                    createdAt: new Date(packageUnit.createdAt),
                    updatedAt: new Date(packageUnit.updatedAt),
                }));
            } catch (err: any) {
                navigateTo('/inventory');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async getPackageUnit(id: number) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<InventoryPackageUnitResponse>(`inventory/package-units/${id}`);
                this.packageUnit = response.data;
            } catch (err: any) {
                navigateTo('/inventory/package-units');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async createPackageUnit(data: InventoryPackageUnitCreateRequest) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<InventoryPackageUnitResponse>('inventory/package-units', {
                    method: 'POST',
                    body: data,
                });
                this.packageUnit = response.data;
                toast.add({ summary: 'Record created!', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                navigateTo('/inventory/package-units');
                this.loading = false;
            }
        },
        async updatePackageUnit(data: InventoryPackageUnitUpdateRequest) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<InventoryPackageUnitResponse>(`inventory/package-units/${data.id}`, {
                    method: 'PUT',
                    body: data,
                });
                this.packageUnit = response.data;
                toast.add({ summary: 'Record updated', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                navigateTo('/inventory/package-units');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async deletePackageUnit(id: number) {
            const toast = useToastService();
            try {
                this.loading = true;
                await useApiFetch<InventoryPackageUnitResponse>(`inventory/package-units/${id}`, {
                    method: 'DELETE',
                });
                toast.add({ summary: 'Record deleted!', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        // Item types
        async getItemTypes() {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<InventoryItemTypeListResponse>('inventory/item-types');

                this.itemTypes = response.data.map(itemType => ({
                    ...itemType,
                    createdAt: new Date(itemType.createdAt),
                    updatedAt: new Date(itemType.updatedAt),
                }));
            } catch (err: any) {
                navigateTo('/inventory');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async getItemType(id: number) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<InventoryItemTypeResponse>(`inventory/item-types/${id}`);
                this.itemType = response.data;
            } catch (err: any) {
                navigateTo('/inventory/item-types');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async createItemType(data: InventoryItemTypeCreateRequest) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<InventoryItemTypeResponse>('inventory/item-types', {
                    method: 'POST',
                    body: data,
                });
                this.itemType = response.data;
                toast.add({ summary: 'Record created!', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                navigateTo('/inventory/item-types');
                this.loading = false;
            }
        },
        async updateItemType(data: InventoryItemTypeUpdateRequest) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<InventoryItemTypeResponse>(`inventory/item-types/${data.id}`, {
                    method: 'PUT',
                    body: data,
                });
                this.itemType = response.data;
                toast.add({ summary: 'Record updated', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                navigateTo('/inventory/item-types');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async deleteItemType(id: number) {
            const toast = useToastService();
            try {
                this.loading = true;
                await useApiFetch<InventoryItemTypeResponse>(`inventory/item-types/${id}`, {
                    method: 'DELETE',
                });
                toast.add({ summary: 'Record deleted!', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        // Items
        async getItems() {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<InventoryItemListResponse>('inventory/items');

                this.items = response.data.map(item => ({
                    ...item,
                    createdAt: new Date(item.createdAt),
                    updatedAt: new Date(item.updatedAt),
                }));
            } catch (err: any) {
                navigateTo('/inventory');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async getItem(id: number) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<InventoryItemResponse>(`inventory/items/${id}`);
                this.item = response.data;
            } catch (err: any) {
                navigateTo('/inventory/items');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async createItem(data: InventoryItemCreateRequest) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<InventoryItemResponse>('inventory/items', {
                    method: 'POST',
                    body: data,
                });
                this.item = response.data;
                toast.add({ summary: 'Record created!', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                navigateTo('/inventory/items');
                this.loading = false;
            }
        },
        async updateItem(data: InventoryItemUpdateRequest) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<InventoryItemResponse>(`inventory/items/${data.id}`, {
                    method: 'PUT',
                    body: data,
                });
                this.item = response.data;
                toast.add({ summary: 'Record updated', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                navigateTo('/inventory/items');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async deleteItem(id: number) {
            const toast = useToastService();
            try {
                this.loading = true;
                await useApiFetch<InventoryItemResponse>(`inventory/items/${id}`, {
                    method: 'DELETE',
                });
                toast.add({ summary: 'Record deleted!', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        // Purchased items
        async getPurchasedItems() {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<InventoryPurchasedItemListResponse>('inventory/purchased-items');

                this.purchasedItems = response.data.map(purchasedItem => ({
                    ...purchasedItem,
                    createdAt: new Date(purchasedItem.createdAt),
                    updatedAt: new Date(purchasedItem.updatedAt),
                }));
            } catch (err: any) {
                navigateTo('/inventory');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async getPurchasedItem(id: number) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<InventoryPurchasedItemResponse>(`inventory/purchased-items/${id}`);
                this.purchasedItem = response.data;
            } catch (err: any) {
                navigateTo('/inventory/purchased-items');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async createPurchasedItem(data: InventoryPurchasedItemCreateRequest) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<InventoryPurchasedItemResponse>('inventory/purchased-items', {
                    method: 'POST',
                    body: data,
                });
                this.purchasedItem = response.data;
                toast.add({ summary: 'Record created!', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                navigateTo('/inventory/purchased-items');
                this.loading = false;
            }
        },
        async updatePurchasedItem(data: InventoryPurchasedItemUpdateRequest) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<InventoryPurchasedItemResponse>(`inventory/purchased-items/${data.id}`, {
                    method: 'PUT',
                    body: data,
                });
                this.purchasedItem = response.data;
                toast.add({ summary: 'Record updated', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                navigateTo('/inventory/purchased-items');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async deletePurchasedItem(id: number) {
            const toast = useToastService();
            try {
                this.loading = true;
                await useApiFetch<InventoryPurchasedItemResponse>(`inventory/purchased-items/${id}`, {
                    method: 'DELETE',
                });
                toast.add({ summary: 'Record deleted!', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
    },
});
