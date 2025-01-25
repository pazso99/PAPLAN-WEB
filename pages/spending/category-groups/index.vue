<template>
    <ContentListCard
        title="Category groups"
        list-key="category-groups"
        :nav-buttons="[
            { icon: 'pi-plus', to: '/spending/category-groups/create' },
        ]"
        nav-back-button
        :items="modifiedCategoryGroups"
        :loading="loading"
        :multi-sort-meta="[
            { field: 'id', order: -1 },
        ]"
        :global-filter-fields="[
            'id',
            'name',
            'transactionCategoriesText',
            'createdAt',
        ]"
        :filters="filters"
        :actions-column-meta="{
            width: '5%',
            editUrl: '/spending/category-groups',
            canDelete: true,
        }"
        @refresh-table="refreshTable"
        @delete-item="removeCategoryGroup"
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
            style="width: 25%"
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
            field="transactionCategoriesText"
            header="Categories"
            sortable
            :show-filter-match-modes="false"
            style="width: 20%"
        >
            <template #body="{ data }">
                {{ data.transactionCategoriesText }}
            </template>
            <!-- FIXME -->
            <!-- <template #filter="{ filterModel }">
                <InputText
                    v-model="filterModel.value"
                    class="p-column-filter"
                    placeholder="Categories..."
                />
            </template> -->
        </Column>

        <Column
            field="createdAt"
            header="CreatedAt"
            data-type="date"
            sortable
            style="width: 15%"
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
import type { CategoryGroup } from '~/types/models';

definePageMeta({
    middleware: 'auth',
    layout: 'admin',
    navBackRoute: '/spending',
});

useHead({
    title: 'Category groups - Spending',
});

const spendingManagementStore = useSpendingManagementStore();
const { getCategoryGroups, deleteCategoryGroup } = spendingManagementStore;
const { categoryGroups, loading } = storeToRefs(spendingManagementStore);

const filters = ref<{ [key: string]: any }>({
    id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    transactionCategoriesText: { value: null, matchMode: FilterMatchMode.CONTAINS },
    createdAt: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
});

const modifiedCategoryGroups = ref<CategoryGroup[]>([]);
async function getData() {
    await getCategoryGroups();
    modifiedCategoryGroups.value = categoryGroups.value.map(item => ({
        ...item,
        transactionCategoriesText: item.transactionCategories.map(cat => cat.name).join(', '),
    }));
}

onMounted(() => {
    getData();
});

async function removeCategoryGroup(id: number) {
    await deleteCategoryGroup(id);
    getData();
}

async function refreshTable() {
    getData();
}
</script>
