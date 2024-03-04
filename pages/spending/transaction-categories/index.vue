<template>
    <ContentListCard
        :title="'Transaction categories'"
        :buttons="[
            { icon: 'pi-plus', to: '/spending/transaction-categories/create' },
            { icon: 'pi-chevron-left', to: '/spending' }
        ]"
        :items="transactionCategories"
        :loading="loading"
        :multi-sort-meta="[
            { field: 'id', order: -1 }
        ]"
        :global-filter-fields="[
            'id',
            'name',
            'transactionType',
            'createdAt',
        ]"
        :filters="filters"
        :actionsColumnMeta="{
            width: '5%',
            editUrl: '/spending/transaction-categories',
        }"
        @refresh-table="refreshTable"
        @delete-item="removeTransactionCategory"
    >
        <Column
            field="id"
            dataType="numeric"
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
            :showFilterMatchModes="false"
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
                                    filterModel.value !== null ? filterModel.value ? 'bg-green-600' : 'bg-red-800' : ''
                                ]
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
            header="Type"
            field="transactionType"
            sortable
            :showFilterMatchModes="false"
            style="width: 20%"
        >
            <template #body="{ data }">
                <Tag
                    :value="getTransactionType(data.transactionType, 'label')"
                    :severity="getTransactionType(data.transactionType, 'color')"
                />
            </template>
            <template #filter="{ filterModel }">
                <MultiSelect
                    v-model="filterModel.value"
                    :options="['income', 'expense']"
                    placeholder="Any"
                    class="p-column-filter"
                    :maxSelectedLabels="1"
                >
                    <template #option="slotProps">
                        <span>{{ slotProps.option }}</span>
                    </template>
                </MultiSelect>
            </template>
        </Column>

        <Column
            field="createdAt"
            header="CreatedAt"
            sortable
            style="width: 25%"
        >
            <template #body="{ data }">
                {{ $dayjs(data.createdAt).format('YYYY-MM-DD') }}
            </template>
            <template #filter="{ filterModel }">
                <InputText
                    v-model="filterModel.value"
                    class="p-column-filter"
                    placeholder="Date..."
                />
            </template>
        </Column>
    </ContentListCard>
</template>

<script lang="ts" setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';

definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});

useHead({
    title: 'Transaction categories - Spending',
});

const { getTransactionCategories, deleteTransactionCategory } = useSpendingCrudStore();
const { transactionCategories, loading }: any = storeToRefs(useSpendingCrudStore());

const filters = ref({
    id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    createdAt: { value: null, matchMode: FilterMatchMode.CONTAINS },
    transactionType: { value: null, matchMode: FilterMatchMode.IN },
});

onMounted(async () => {
    await getTransactionCategories();
});

async function removeTransactionCategory(id: any) {
    await deleteTransactionCategory(id);
    await getTransactionCategories();
}

async function refreshTable() {
    await getTransactionCategories();
}

const getTransactionType = (transactionType: string, prop: string) => {
    const transactionTypeObj: any = {
        label: '',
        color: 'info'
    };

    switch (transactionType) {
        case 'income':
            transactionTypeObj.label = 'INCOME';
            transactionTypeObj.color = 'success';
            break;
        case 'expense':
            transactionTypeObj.label = 'EXPENSE';
            transactionTypeObj.color = 'danger';
            break;
        default:
            break;
    }

    return transactionTypeObj[prop];
};
</script>
