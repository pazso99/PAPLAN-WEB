<template>
    <ContentListCard
        title="Item types"
        list-key="item_types"
        :nav-buttons="[
            { icon: 'pi-plus', to: '/inventory/item-types/create' },
        ]"
        nav-back-button
        :items="itemTypes"
        :loading="loading"
        :multi-sort-meta="[
            { field: 'id', order: -1 },
        ]"
        :global-filter-fields="[
            'id',
            'name',
            'createdAt',
        ]"
        :filters="filters"
        :actions-column-meta="{
            width: '5%',
            editUrl: '/inventory/item-types',
            canDelete: true,
        }"
        @refresh-table="refreshTable"
        @delete-item="removeItemType"
    >
        <Column
            field="id"
            data-type="numeric"
            header="ID"
            sortable
            style="width: 10%"
        >
            <template #filter="{ filterModel }">
                <InputText
                    v-model="filterModel.value"
                    type="text"
                    class="p-column-filter"
                    placeholder="ID..."
                />
            </template>
        </Column>

        <Column
            field="status"
            header="Status"
            sortable
            :show-filter-match-modes="false"
            style="width: 10%"
        >
            <template #body="{ data }">
                <Tag
                    :value="data.status ? 'ACTIVE' : 'INACTIVE'"
                    :severity="data.status ? 'success' : 'danger'"
                />
            </template>
            <template #filter="{ filterModel }">
                <div class="flex gap-2 items-center">
                    <Checkbox
                        v-model="filterModel.value"
                        :indeterminate="filterModel.value === null"
                        binary
                        :pt="{
                            box: {
                                class: [
                                    'border-none',
                                    filterModel.value !== null ? filterModel.value ? 'bg-green-600' : 'bg-red-800' : '',
                                ],
                            },
                        }"
                    />
                    <Tag v-if="filterModel.value === true" value="ACTIVE" severity="success" />
                    <Tag v-else-if="filterModel.value === false" value="INACTIVE" severity="danger" />
                    <Tag v-else value="All" severity="info" />
                </div>
            </template>
        </Column>

        <Column
            field="name"
            header="Name"
            sortable
            :show-filter-match-modes="false"
            style="width: 40%"
        >
            <template #body="{ data }">
                {{ data.name }}
            </template>
            <template #filter="{ filterModel }">
                <InputText
                    v-model="filterModel.value"
                    class="p-column-filter"
                    placeholder="Name..."
                />
            </template>
        </Column>

        <Column
            field="createdAt"
            header="CreatedAt"
            data-type="date"
            sortable
            style="width: 35%"
        >
            <template #body="{ data }">
                {{ $dayjs(data.createdAt).format('YYYY-MM-DD') }}
            </template>
            <template #filter="{ filterModel }">
                <DatePicker
                    v-model="filterModel.value"
                    date-format="yy-mm-dd"
                    placeholder="2024-01-01"
                    mask="9999-99-99"
                />
            </template>
        </Column>
    </ContentListCard>
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';

definePageMeta({
    middleware: 'auth',
    layout: 'admin',
    navBackRoute: '/inventory',
});

useHead({
    title: 'Item types - Inventory',
});

const inventoryManagementStore = useInventoryManagementStore();
const { getItemTypes, deleteItemType } = inventoryManagementStore;
const { itemTypes, loading } = storeToRefs(inventoryManagementStore);

const filters = ref<{ [key: string]: any }>({
    id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    createdAt: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
});

onMounted(async () => {
    await getItemTypes();
});

async function removeItemType(id: number) {
    await deleteItemType(id);
    await getItemTypes();
}

async function refreshTable() {
    await getItemTypes();
}
</script>
