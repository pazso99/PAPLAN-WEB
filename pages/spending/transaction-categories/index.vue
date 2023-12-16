<template>
    <AppListContent
        v-if="!initialLoad && !loading"
        :table-data="{
            title: 'Transaction categories',
            columns,
            items: transactionCategories,
            url: '/spending/transaction-categories',
            sortBy: ['id'],
            sortType: ['asc'],
            searchField: ['id']
        }"
        :loading="loading"
        @delete-item="removeTransactionCategory"
    />
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});
useHead({
    title: 'Transaction categories - Spending',
});

const { getTransactionCategories, deleteTransactionCategory } = useSpendingCrudStore();
const { transactionCategories, loading }: any = storeToRefs(useSpendingCrudStore());

const initialLoad = ref(true);
onMounted(async () => {
    await getTransactionCategories();
    initialLoad.value = false;
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
        value: 'name',
        text: 'Name',
        sortable: true,
    },
    {
        value: 'transactionType',
        text: 'Type',
        sortable: true,
    },
    {
        value: 'createdAt',
        text: 'Created at',
        sortable: true,
    },
    {
        value: 'actions',
        text: 'Actions',
        width: 100,
    }
];

async function removeTransactionCategory(data: any) {
    await deleteTransactionCategory(data.id);
    await getTransactionCategories();
}
</script>
