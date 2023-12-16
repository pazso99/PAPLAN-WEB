<template>
    <AppListContent
        v-if="!initialLoad && !loading"
        :table-data="{
            title: 'Accounts',
            columns,
            items: accounts,
            url: '/spending/accounts',
            sortBy: ['id'],
            sortType: ['asc'],
            searchField: ['id']
        }"
        :loading="loading"
        @delete-item="removeAccount"
    />
</template>

<script lang="ts" setup>
definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});
useHead({
    title: 'Accounts - Spending',
});

const { getAccounts, deleteAccount } = useSpendingCrudStore();
const { accounts, loading }: any = storeToRefs(useSpendingCrudStore());

const initialLoad = ref(true);
onMounted(async () => {
    await getAccounts();
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
        value: 'balance',
        text: 'Balance',
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

async function removeAccount(data: any) {
    await deleteAccount(data.id);
    await getAccounts();
}
</script>
