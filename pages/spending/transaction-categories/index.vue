<template>
    <AppListContent
        v-if="!initialLoad && !loading"
        :table-data="{
            title: 'Transaction categories',
            columns,
            items: transactionCategories,
            url: '/spending/transaction-categories'
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
    title: 'Transaction Categories - Spending',
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
        key: 'name',
        label: 'Name',
        sortable: true,
    },
    {
        key: 'transactionType',
        label: 'Type',
        sortable: true,
    },
    {
        key: 'createdAt',
        label: 'Created at',
        sortable: true,
    },
    {
        key: 'actions',
        label: 'Actions',
    }
];

async function removeTransactionCategory(data: any) {
    await deleteTransactionCategory(data.id);
    await getTransactionCategories();
}
</script>
