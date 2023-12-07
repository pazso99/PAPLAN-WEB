<template>
    <AppListContent
        v-if="!initialLoad && !loading"
        :table-data="{
            title: 'Transactions',
            columns,
            items: transactions,
            url: '/spending/transactions'
        }"
        :loading="loading"
        @delete-item="removeTransaction"
    />
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});
useHead({
    title: 'Transactions - Spending',
});

const { getTransactions, deleteTransaction } = useSpendingCrudStore();
const { transactions, loading }: any = storeToRefs(useSpendingCrudStore());
const initialLoad = ref(true);

onMounted(async () => {
    await getTransactions();
    initialLoad.value = false;
});

const columns = [
    {
        key: 'id',
        label: 'ID',
        sortable: true,
    },
    {
        key: 'status',
        label: 'Status',
        sortable: true,
    },
    {
        key: 'date',
        label: 'Date',
        sortable: true,
    },
    {
        key: 'account.name',
        label: 'Account name',
        sortable: true,
    },
    {
        key: 'transactionType',
        label: 'Amount',
        sortable: true,
    },
    {
        key: 'transactionCategory.name',
        label: 'Category',
        sortable: true,
    },
    {
        key: 'comment',
        label: 'Comment',
        sortable: true,
    },
    {
        key: 'actions',
        label: 'Actions',
    }
];

async function removeTransaction(data: any) {
    await deleteTransaction(data.id);
    await getTransactions();
}
</script>
