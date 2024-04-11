<template>
    <ContentListCard
        title="Items"
        list-key="items"
        :nav-buttons="[
            { icon: 'pi-plus', to: '/inventory/items/create' },
        ]"
        nav-back-button
        :items="items"
        :loading="loading"
        :multi-sort-meta="[
            { field: 'id', order: -1 },
        ]"
        :global-filter-fields="[
            'id',
            'name',
            'itemType.name',
            'expectedLifetimeInDays',
            'recommendedStock',
        ]"
        :filters="filters"
        :actions-column-meta="{
            width: '5%',
            editUrl: '/inventory/items',
            canDelete: true,
        }"
        @refresh-table="refreshTable"
        @delete-item="removeItem"
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
            field="isEssential"
            header="Essential"
            sortable
            :show-filter-match-modes="false"
            style="width: 10%"
        >
            <template #body="{ data }">
                <Tag
                    v-if="data.isEssential"
                    value="ESSENTIAL"
                    severity="warning"
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
                                    filterModel.value !== null ? filterModel.value ? 'bg-yellow-600' : 'bg-red-800' : '',
                                ],
                            },
                        }"
                    />
                    <Tag v-if="filterModel.value === true" value="ESSENTIAL" severity="warning" />
                    <Tag v-else-if="filterModel.value === false" value="FALSE" severity="danger" />
                    <Tag v-else value="All" severity="info" />
                </div>
            </template>
        </Column>

        <Column
            field="name"
            header="Name"
            sortable
            :show-filter-match-modes="false"
            style="width: 15%"
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
            field="itemType.name"
            header="Item type"
            sortable
            :show-filter-match-modes="false"
            style="width: 15%"
        >
            <template #body="{ data }">
                {{ data.itemType.name }}
            </template>
            <template #filter="{ filterModel }">
                <MultiSelect
                    v-model="filterModel.value"
                    :options="itemTypeOptions"
                    placeholder="Any"
                    class="p-column-filter"
                    :max-selected-labels="1"
                >
                    <template #option="slotProps">
                        <span>{{ slotProps.option }}</span>
                    </template>
                </MultiSelect>
            </template>
        </Column>

        <Column
            field="expectedLifetimeInDays"
            header="Expected Lifetime"
            data-type="numeric"
            sortable
            style="width: 16%"
        >
            <template #body="{ data }">
                {{ data.expectedLifetimeInDays }}
                <span v-if="data.expectedLifetimeInDays">
                    day<template v-if="data.expectedLifetimeInDays > 1">s</template>
                </span>
            </template>
            <template #filter="{ filterModel }">
                <InputNumber
                    v-model="filterModel.value"
                    placeholder="Expected Lifetime..."
                />
            </template>
        </Column>

        <Column
            field="recommendedStock"
            header="Recommended Stock"
            data-type="numeric"
            sortable
            style="width: 18%"
        >
            <template #body="{ data }">
                {{ data.recommendedStock }}
            </template>
            <template #filter="{ filterModel }">
                <InputNumber
                    v-model="filterModel.value"
                    placeholder="Recommended Stock..."
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
    navBackRoute: '/inventory',
});

useHead({
    title: 'Items - Inventory',
});

const inventoryManagementStore = useInventoryManagementStore();
const { getItems, getItemTypes, deleteItem } = inventoryManagementStore;
const { items, itemTypes, loading } = storeToRefs(inventoryManagementStore);

const filters = ref({
    'id': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    'status': { value: null, matchMode: FilterMatchMode.EQUALS },
    'name': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'itemType.name': { value: null, matchMode: FilterMatchMode.IN },
    'expectedLifetimeInDays': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    'recommendedStock': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    'isEssential': { value: null, matchMode: FilterMatchMode.EQUALS },
});

const itemTypeOptions = ref<string[]>();
onMounted(async () => {
    await getItems();
    await getItemTypes();

    itemTypeOptions.value = itemTypes.value.map(({ name }) => (name));
});

async function removeItem(id: number) {
    await deleteItem(id);
    await getItems();
}

async function refreshTable() {
    await getItems();
}
</script>
