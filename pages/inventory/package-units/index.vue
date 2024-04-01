<template>
    <ContentListCard
        title="Package units"
        :nav-buttons="[
            { icon: 'pi-plus', to: '/inventory/package-units/create' },
            { icon: 'pi-chevron-left', to: '/inventory' },
        ]"
        :items="packageUnits"
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
            editUrl: '/inventory/package-units',
            canDelete: true,
        }"
        export-filename="package_units"
        @refresh-table="refreshTable"
        @delete-item="removePackageUnit"
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
                    <TriStateCheckbox
                        v-model="filterModel.value"
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
                <Calendar
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
import { FilterMatchMode, FilterOperator } from 'primevue/api';

definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});

useHead({
    title: 'Package units - Inventory',
});

const inventoryManagementStore = useInventoryManagementStore();
const { getPackageUnits, deletePackageUnit } = inventoryManagementStore;
const { packageUnits, loading } = storeToRefs(inventoryManagementStore);

const filters = ref({
    id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    createdAt: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
});

onMounted(async () => {
    await getPackageUnits();
});

async function removePackageUnit(id: number) {
    await deletePackageUnit(id);
    await getPackageUnits();
}

async function refreshTable() {
    await getPackageUnits();
}
</script>
