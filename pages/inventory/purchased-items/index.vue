<template>
    <ContentListCard
        title="Purchased items"
        :nav-buttons="[
            { icon: 'pi-plus', to: '/inventory/purchased-items/create' },
            { icon: 'pi-chevron-left', to: '/inventory' },
        ]"
        :items="purchasedItems"
        :loading="loading"
        :multi-sort-meta="[
            { field: 'id', order: -1 },
        ]"
        :global-filter-fields="[
            'id',
            'item.name',
            'item.itemType.name',
            'packageUnit.name',
            'amount',
            'price',
            'purchaseDate',
            'expirationDate',
        ]"
        :filters="filters"
        :actions-column-meta="{
            width: '5%',
            editUrl: '/inventory/purchased-items',
            canDelete: true,
        }"
        @refresh-table="refreshTable"
        @delete-item="removePurchasedItem"
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
            field="item.name"
            header="Item"
            sortable
            :show-filter-match-modes="false"
            style="width: 20%"
        >
            <template #body="{ data }">
                {{ data.item.name }}
            </template>
            <template #filter="{ filterModel }">
                <MultiSelect
                    v-model="filterModel.value"
                    :options="itemNameOptions"
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
            field="amount"
            header="Amount"
            data-type="numeric"
            sortable
            style="width: 10%"
        >
            <template #body="{ data }">
                {{ data.amount }} {{ data.packageUnit.name }}
            </template>
            <template #filter="{ filterModel }">
                <InputNumber
                    v-model="filterModel.value"
                    placeholder="Amount..."
                />
            </template>
        </Column>

        <Column
            field="price"
            header="Price"
            data-type="numeric"
            sortable
            style="width: 10%"
        >
            <template #body="{ data }">
                <span v-if="data.price">{{ $formatNumber(data.price) }} Ft</span>
            </template>
            <template #filter="{ filterModel }">
                <InputNumber
                    v-model="filterModel.value"
                    placeholder="Price..."
                />
            </template>
        </Column>

        <Column
            field="purchaseDate"
            header="PurchaseDate"
            data-type="date"
            sortable
            style="width: 15%"
        >
            <template #body="{ data }">
                <span v-if="data.purchaseDate">{{ $dayjs(data.purchaseDate).format('YYYY-MM-DD') }}</span>
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

        <Column
            field="expirationDate"
            header="ExpirationDate"
            data-type="date"
            sortable
            style="width: 15%"
        >
            <template #body="{ data }">
                <span v-if="data.expirationDate">{{ $dayjs(data.expirationDate).format('YYYY-MM-DD') }}</span>
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

        <Column
            field="leftoverAmountPercentage"
            header="Leftover%"
            data-type="numeric"
            sortable
            style="width: 15%"
        >
            <template #body="{ data }">
                {{ data.leftoverAmountPercentage }} %
            </template>
            <template #filter="{ filterModel }">
                <InputNumber
                    v-model="filterModel.value"
                    placeholder="Leftover..."
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
    title: 'Items - Inventory',
});

const inventoryManagementStore = useInventoryManagementStore();
const { getPurchasedItems, getItems, deletePurchasedItem } = inventoryManagementStore;
const { purchasedItems, items, loading } = storeToRefs(inventoryManagementStore);

const filters = ref({
    'id': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    'status': { value: null, matchMode: FilterMatchMode.EQUALS },
    'item.name': { value: null, matchMode: FilterMatchMode.IN },
    'amount': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    'price': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    'purchaseDate': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    'expirationDate': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    'leftoverAmountPercentage': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
});


const itemNameOptions = ref<string[]>();
onMounted(async () => {
    await getPurchasedItems();
    await getItems();
    itemNameOptions.value = items.value.map(({ name }) => (name));
});

async function removePurchasedItem(id: number) {
    await deletePurchasedItem(id);
    await getPurchasedItems();
}

async function refreshTable() {
    await getPurchasedItems();
}
</script>
