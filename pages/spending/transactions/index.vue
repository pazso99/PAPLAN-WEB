<template>
    <ContentBaseCard
        title="Transactions"
        :nav-buttons="[
            { icon: 'pi-plus', to: '/spending/transactions/create' },
        ]"
        :loading="loading"
    >
        <DataTable
            ref="table"
            v-model:filters="filters"
            v-model:selection="selectedTransactions"
            :value="transactions"
            size="small"
            paginator
            paginator-template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
            :rows="10"
            :rows-per-page-options="[10, 25, 50, 100]"
            sort-mode="multiple"
            removable-sort
            filter-display="menu"
            :global-filter-fields="[
                'id',
                'date',
                'account.name',
                'transactionCategory.transactionType',
                'amount',
                'transactionCategory.name',
                'comment',
            ]"
            state-storage="session"
            state-key="transactions_table_state"
            :export-filename="`transactions_${dayjs().format('YYYY_MM_DD_HHmm')}`"
            scrollable
            scroll-height="60vh"
            show-grid-lines
            current-page-report-template="{currentPage}/{totalPages}  [{totalRecords}]"
            @state-save="onStateSave"
        >
            <template #empty>
                No data.
            </template>
            <template #header>
                <div class="flex justify-between my-2">
                    <IconField icon-position="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters.global.value" placeholder="Search..." />
                    </IconField>
                    <Button
                        v-if="table"
                        type="button"
                        :badge="table.processedData.length.toString()"
                        size="small"
                        :severity="table.processedData.length !== transactions.length || filters.global.value !== '' ? 'primary' : 'secondary'"
                        icon="pi pi-filter-slash"
                        text
                        rounded
                        @click="clearFilter"
                    />
                </div>
                <Toolbar class="my-2 overflow-auto">
                    <template #start>
                        <Button
                            v-for="filterButton in filterButtons"
                            :key="filterButton.filter"
                            :label="filterButton.display"
                            :icon="filterButton.icon"
                            severity="primary"
                            class="mr-2"
                            size="small"
                            :outlined="!filterButton.isOn"
                            @click="filterButton.handle"
                        />
                    </template>
                </Toolbar>
            </template>

            <Column
                selection-mode="multiple"
                header-style="width: 3rem"
            />

            <Column
                field="id"
                data-type="numeric"
                header="ID"
                sortable
                header-style="width: 10%"
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
                header-style="width: 10%"
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
                field="date"
                header="Date"
                data-type="date"
                sortable
                header-style="width: 10%"
            >
                <template #body="{ data }">
                    {{ $dayjs(data.date).format('YYYY-MM-DD') }}
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

            <Column
                field="account.name"
                header="Account"
                sortable
                :show-filter-match-modes="false"
                header-style="width: 15%"
            >
                <template #body="{ data }">
                    {{ data.account.name }}
                </template>
                <template #filter="{ filterModel }">
                    <MultiSelect
                        v-model="filterModel.value"
                        :options="accountNameOptions"
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
                header-style="width: 15%"
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
                field="transactionCategory.transactionType"
                sortable
                :show-filter-match-modes="false"
                header-style="width: 10%"
            >
                <template #body="{ data }">
                    <Tag
                        :value="getTransactionTypeLabel(data.transactionCategory.transactionType)"
                        :severity="getTransactionTypeColor(data.transactionCategory.transactionType)"
                    />
                </template>
                <template #filter="{ filterModel }">
                    <MultiSelect
                        v-model="filterModel.value"
                        :options="getTransactionTypes()"
                        placeholder="Any"
                        class="p-column-filter"
                        :max-selected-labels="1"
                    >
                        <template #option="slotProps">
                            <Tag
                                :value="slotProps.option.toUpperCase()"
                                :severity="getTransactionTypeColor(slotProps.option)"
                            />
                        </template>
                    </MultiSelect>
                </template>
            </Column>

            <Column
                header="Category"
                field="transactionCategory.name"
                sortable
                :show-filter-match-modes="false"
                header-style="width: 15%"
            >
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <span>{{ data.transactionCategory.name }}</span>
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <MultiSelect
                        v-model="filterModel.value"
                        :options="transactionCategoryNameOptions"
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
                field="comment"
                header="Comment"
                sortable
                :show-filter-match-modes="false"
                header-style="width: 10%"
            >
                <template #body="{ data }">
                    <p
                        v-if="data.comment && data.comment.length > 18"
                        v-tooltip.left="data.comment"
                    >
                        {{ truncateText(data.comment, 18) }}
                    </p>
                    <p v-else>{{ data.comment }}</p>

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

            <Column
                header-style="width: 5%"
            >
                <template #header>
                    <div class="md:hidden flex-1 text-center">
                        <i class="pi pi-cog" />
                    </div>
                </template>
                <template #body="{ data }">
                    <div class="flex justify-end">
                        <NuxtLink
                            :to="`/spending/transactions/${data.id}`"
                        >
                            <Button
                                icon="pi pi-pencil"
                                severity="secondary"
                                text
                                rounded
                            />
                        </NuxtLink>
                        <Button
                            icon="pi pi-trash"
                            severity="danger"
                            text
                            rounded
                            @click="openDeleteModal(data)"
                        />
                    </div>
                </template>
            </Column>

            <ColumnGroup
                v-if="selectedTransactions && selectedTransactions.length > 0"
                type="footer"
            >
                <Row>
                    <Column :colspan="10" footer-style="padding: 15px; text-align:left; border: none; background: #143443;">
                        <template #footer>
                            <div class="flex gap-2">
                                <Tag
                                    class="cursor-pointer"
                                    severity="secondary"
                                    @click="resetSelected"
                                >
                                    <OverlayBadge
                                        :value="selectedTransactions.length"
                                        size="small"
                                        class="flex p-2"
                                    >
                                        <i class="pi pi-times" />
                                    </OverlayBadge>
                                </Tag>
                                <Tag
                                    severity="success"
                                    class="!text-sm"
                                >
                                    {{ $formatNumber(selectedTransactionIncomeTotal) }} Ft
                                </Tag>
                                <Tag
                                    severity="danger"
                                    class="!text-sm"
                                >
                                    {{ $formatNumber(selectedTransactionExpenseTotal) }} Ft
                                </Tag>
                                <Tag
                                    severity="warn"
                                    class="!text-sm"
                                >
                                    {{ $formatNumber(selectedTransactionTransferTotal) }} Ft
                                </Tag>
                            </div>
                        </template>
                    </Column>
                </Row>
            </ColumnGroup>

            <template #paginatorstart>
                <Button
                    type="button"
                    severity="secondary"
                    icon="pi pi-refresh"
                    text
                    @click="handleRefresh"
                />
                <Button
                    type="button"
                    severity="secondary"
                    icon="pi pi-download"
                    text
                    @click="exportCSV"
                />
            </template>
        </DataTable>
        <Dialog
            v-model:visible="deleteModalVisible"
            modal
            header="Warning!"
            class="w-full md:w-[25rem]"
        >
            <span class="p-text-secondary block mb-5">
                Are you sure want to delete this item? (<b>{{ deletableItem.id }}</b>)
            </span>
            <div class="flex justify-between gap-2">
                <Button
                    type="button"
                    label="Cancel"
                    severity="secondary"
                    @click="deleteModalVisible = false"
                />
                <Button
                    type="button"
                    label="Delete"
                    severity="danger"
                    @click="handleDelete"
                />
            </div>
        </Dialog>

        <template #loading>
            <DataTable :value="new Array(10)">
                <template #header>
                    <div class="flex justify-between pl-2 gap-5">
                        <Skeleton width="16rem" height="2rem" />
                        <Skeleton size="2rem" />
                    </div>
                </template>
                <Column
                    sortable
                    header-style="width: 10%"
                >
                    <template #header>
                        <Skeleton />
                    </template>
                    <template #body>
                        <Skeleton />
                    </template>
                </Column>
                <Column
                    sortable
                    header-style="width: 30%"
                >
                    <template #header>
                        <Skeleton />
                    </template>
                    <template #body>
                        <Skeleton />
                    </template>
                </Column>
                <Column
                    sortable
                    header-style="width: 20%"
                >
                    <template #header>
                        <Skeleton />
                    </template>
                    <template #body>
                        <Skeleton />
                    </template>
                </Column>
                <Column
                    sortable
                    header-style="width: 15%"
                >
                    <template #header>
                        <Skeleton />
                    </template>
                    <template #body>
                        <Skeleton />
                    </template>
                </Column>
                <Column
                    sortable
                    header-style="width: 15%"
                >
                    <template #header>
                        <Skeleton />
                    </template>
                    <template #body>
                        <Skeleton />
                    </template>
                </Column>
                <Column
                    header-style="width: 10%"
                >
                    <template #body>
                        <Skeleton />
                    </template>
                </Column>
            </DataTable>
        </template>
    </ContentBaseCard>
</template>

<script lang="ts" setup>
import { FilterMatchMode, FilterOperator } from '@primevue/core/api';
import type { Transaction } from '~/types/models';

definePageMeta({
    middleware: 'auth',
    layout: 'admin',
    navBackRoute: '/spending',
});

useHead({
    title: 'Transactions - Spending',
});

const spendingManagementStore = useSpendingManagementStore();
const { getTransactions, getAccounts, deleteTransaction, getTransactionCategories } = spendingManagementStore;
const { transactions, accounts, transactionCategories } = storeToRefs(spendingManagementStore);

const initFilters = {
    'global': { value: '', matchMode: FilterMatchMode.CONTAINS },
    'id': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    'status': { value: null, matchMode: FilterMatchMode.EQUALS },
    'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    'account.name': { value: null, matchMode: FilterMatchMode.IN },
    'transactionCategory.transactionType': { value: null, matchMode: FilterMatchMode.IN },
    'transactionCategory.name': { value: null, matchMode: FilterMatchMode.IN },
    'amount': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    'comment': { value: null, matchMode: FilterMatchMode.CONTAINS },
};
const filters = ref<{ [key: string]: any }>(initFilters);

function resetFilters() {
    filters.value = initFilters;
    filters.value.global.value = '';
};

function clearFilter() {
    resetFilters();
}

const transactionCategoryNameOptions = ref<string[]>();
const accountNameOptions = ref<string[]>();
const loading = ref(true);

onMounted(async () => {
    await getTransactions();
    await getAccounts();
    await getTransactionCategories();

    accountNameOptions.value = accounts.value.map(({ name }) => (name));
    transactionCategoryNameOptions.value = transactionCategories.value.map(({ name }) => (name));

    loading.value = false;
});

async function handleRefresh() {
    await getTransactions();
}

// TODO meta type
function getMetaDescription(
    data: {
        meta: string;
        transactionCategory: {
            transactionType: string;
        };
    },
) {
    const meta = JSON.parse(data.meta);
    if (data.transactionCategory.transactionType === 'transfer') {
        return `to: ${meta.toAccountId}`;
    }
};

const dayjs = useDayjs();
const thisMonthFilter = {
    date: {
        operator: FilterOperator.AND,
        constraints: [
            { value: dayjs().startOf('month').toDate(), matchMode: FilterMatchMode.DATE_AFTER },
            { value: dayjs().endOf('month').toDate(), matchMode: FilterMatchMode.DATE_BEFORE },
        ],
    },
};

const monthNum = ref();
monthNum.value = dayjs().month();
if (monthNum.value === 0) {
    monthNum.value = 11;
} else {
    monthNum.value--;
}
const previousMonthFilter = {
    date: {
        operator: FilterOperator.AND,
        constraints: [
            { value: dayjs().month(monthNum.value).startOf('month').toDate(), matchMode: FilterMatchMode.DATE_AFTER },
            { value: dayjs().month(monthNum.value).endOf('month').toDate(), matchMode: FilterMatchMode.DATE_BEFORE },
        ],
    },
};

/* eslint-disable style/indent */
const filterButtons = ref<{
    filter: string;
    display: string;
    icon: string;
    isOn: boolean;
    handle: () => void;
}[]>([
    {
        filter: 'thisMonth',
        display: 'This month',
        icon: 'pi pi-calendar',
        isOn: false,
        handle: handleThisMonthFilter,
    },
    {
        filter: 'previousMonth',
        display: 'Previous month',
        icon: 'pi pi-calendar',
        isOn: false,
        handle: handlePreviousMonthFilter,
    },
]);
/* eslint-enable style/indent */

function handleThisMonthFilter() {
    filters.value = {
        ...filters.value,
        ...thisMonthFilter,
    };
}
function handlePreviousMonthFilter() {
    filters.value = {
        ...filters.value,
        ...previousMonthFilter,
    };
}

watch(filters, (newFilter) => {
    filterButtons.value.forEach((filterButton) => {
        filterButton.isOn = false;
        if (
            filterButton.filter === 'thisMonth'
            && JSON.stringify(newFilter.date) === JSON.stringify(thisMonthFilter.date)
        ) {
            filterButton.isOn = true;
        } else if (
            filterButton.filter === 'previousMonth'
            && JSON.stringify(newFilter.date) === JSON.stringify(previousMonthFilter.date)
        ) {
            filterButton.isOn = true;
        }
    });
}, { deep: true });

const selectedTransactions = ref<Transaction[]>([]);
const selectedTransactionIncomeTotal = ref(0);
const selectedTransactionExpenseTotal = ref(0);
const selectedTransactionTransferTotal = ref(0);
function onStateSave() {
    if (selectedTransactions.value.length > 0) {
        selectedTransactionIncomeTotal.value = 0;
        selectedTransactionExpenseTotal.value = 0;
        selectedTransactionTransferTotal.value = 0;

        selectedTransactions.value.forEach((transaction) => {
            switch (transaction.transactionCategory.transactionType) {
                case 'income':
                    selectedTransactionIncomeTotal.value += transaction.amount;
                    break;
                case 'expense':
                    selectedTransactionExpenseTotal.value += transaction.amount;
                    break;
                case 'transfer':
                    selectedTransactionTransferTotal.value += transaction.amount;
                    break;
                default:
                    break;
            }
        });
    }
}

function resetSelected() {
    selectedTransactions.value = [];
}

const deleteModalVisible = ref(false);
const deletableItem = ref<{
    id: number;
    [key: string]: any;
}>({ id: -1 });

async function openDeleteModal(deletableData: any) {
    deletableItem.value = {
        id: deletableData.id,
        ...deletableData,
    };
    deleteModalVisible.value = true;
}

async function handleDelete() {
    await deleteTransaction(deletableItem.value.id);
    await getTransactions();
    selectedTransactions.value = [];
    deletableItem.value = { id: -1 };
    deleteModalVisible.value = false;
}

const table = ref();
function exportCSV() {
    table.value.exportCSV();
}
</script>
