<template>
    <ContentListCard
        title="Transactions"
        :buttons="[
            { icon: 'pi-plus', to: '/spending/transactions/create' },
            { icon: 'pi-chevron-left', to: '/spending' },
        ]"
        :items="transactions"
        :loading="loading"
        :multi-sort-meta="[
            { field: 'date', order: -1 },
            { field: 'id', order: -1 },
        ]"
        :global-filter-fields="[
            'id',
            'date',
            'account.name',
            'transactionType',
            'amount',
            'transactionCategory.name',
        ]"
        :filters="filters"
        :actions-column-meta="{
            width: '5%',
            editUrl: '/spending/transactions',
        }"
        @refresh-table="refreshTable"
        @delete-item="removeTransaction"
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
            field="date"
            header="Date"
            sortable
            style="width: 10%"
        >
            <template #body="{ data }">
                {{ $dayjs(data.date).format('YYYY-MM-DD') }}
            </template>
            <template #filter="{ filterModel }">
                <InputText
                    v-model="filterModel.value"
                    class="p-column-filter"
                    placeholder="Date..."
                />
            </template>
        </Column>

        <Column
            field="account.name"
            header="Account"
            sortable
            style="width: 15%"
        >
            <template #body="{ data }">
                {{ data.account.name }}
            </template>
            <template #filter="{ filterModel }">
                <InputText
                    v-model="filterModel.value"
                    class="p-column-filter"
                    placeholder="Account..."
                />
            </template>
        </Column>

        <Column
            field="amount"
            header="Amount"
            data-type="numeric"
            sortable
            style="width: 15%"
        >
            <template #body="{ data }">
                <span>{{ $formatNumber(data.amount) }} Ft</span>
            </template>
            <template #filter="{ filterModel }">
                <InputNumber
                    v-model="filterModel.value"
                    placeholder="Amount..."
                />
            </template>
        </Column>

        <Column
            header="Type"
            field="transactionType"
            sortable
            :show-filter-match-modes="false"
            style="width: 10%"
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
                    :options="['income', 'expense', 'transfer']"
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
            header="Category"
            filter-field="transactionCategory"
            sortable
            sort-field="transactionCategory.name"
            :show-filter-match-modes="false"
            style="width: 15%"
        >
            <template #body="{ data }">
                <div class="flex align-items-center gap-2">
                    <span>{{ data.transactionCategory.name }}</span>
                </div>
            </template>
            <template #filter="{ filterModel }">
                <MultiSelect
                    v-model="filterModel.value"
                    :options="transactionCategoryOptions"
                    option-label="name"
                    placeholder="Any"
                    class="p-column-filter"
                    :max-selected-labels="1"
                >
                    <template #option="slotProps">
                        <span>{{ slotProps.option.name }}</span>
                    </template>
                </MultiSelect>
            </template>
        </Column>

        <Column
            field="comment"
            header="Comment"
            sortable
            style="width: 10%"
        >
            <template #body="{ data }">
                {{ data.comment }}
                <span v-if="data.meta !== '{}'">
                    {{ getMetaDescription(data) }}
                </span>
            </template>
            <template #filter="{ filterModel }">
                <InputText
                    v-model="filterModel.value"
                    class="p-column-filter"
                    placeholder="Comment..."
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
    title: 'Transactions - Spending',
});

const { getTransactions, deleteTransaction, getTransactionCategories } = useSpendingCrudStore();
const { transactions, transactionCategories, loading }: any = storeToRefs(useSpendingCrudStore());
const transactionCategoryOptions = ref([]);

const filters = ref({
    'id': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    'account.name': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'date': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'transactionType': { value: null, matchMode: FilterMatchMode.IN },
    'transactionCategory': { value: null, matchMode: FilterMatchMode.IN },
    'status': { value: null, matchMode: FilterMatchMode.EQUALS },
    'amount': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    'comment': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

onMounted(async () => {
    await getTransactions();
    await getTransactionCategories();

    transactionCategoryOptions.value = transactionCategories.value.map(({ id, name, slug }: any) => ({
        id,
        name,
        slug,
    }));
});

async function removeTransaction(id: any) {
    await deleteTransaction(id);
    await getTransactions();
}

async function refreshTable() {
    await getTransactions();
}

function getTransactionType(transactionType: string, prop: string) {
    const transactionTypeObj: any = {
        label: '',
        color: 'info',
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
        case 'transfer':
            transactionTypeObj.label = 'TRANSFER';
            transactionTypeObj.color = 'warning';
            break;
        default:
            break;
    }

    return transactionTypeObj[prop];
};

const getMetaDescription = (data: any) => {
    const meta = JSON.parse(data.meta);
    if (data.transactionType === 'transfer') {
        return `to: ${meta.toAccountId}`; //TODO majd NAME
    }
};

</script>
