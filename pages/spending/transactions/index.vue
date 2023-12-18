<template>
    <AppListContent
        :table-data="{
            title: 'Transactions',
            columns,
            items: transactions,
            url: '/spending/transactions',
            sortBy: ['date', 'id'],
            sortType: ['desc', 'desc'],
            searchField: ['date', 'account.name', 'amount', 'transactionCategory.name', 'comment']
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

onMounted(async () => {
    await getTransactions();
});

const columns = [
    {
        value: 'id',
        text: 'ID',
        sortable: true,
        width: 40,
    },
    {
        value: 'status',
        text: 'Status',
        sortable: true,
    },
    {
        value: 'date',
        text: 'Date',
        sortable: true,
    },
    {
        value: 'account.name',
        text: 'Account name',
        sortable: true,
    },
    {
        value: 'amount',
        text: 'Amount',
        sortable: true,
    },
    {
        value: 'transactionType',
        text: 'Transaction type',
        sortable: true,
    },
    {
        value: 'transactionCategory.name',
        text: 'Category',
        sortable: true,
    },
    {
        value: 'comment',
        text: 'Comment',
        sortable: true,
    },
    {
        value: 'actions',
        text: 'Actions',
        width: 100,
    }
];

async function removeTransaction(data: any) {
    await deleteTransaction(data.id);
    await getTransactions();
}
</script>
