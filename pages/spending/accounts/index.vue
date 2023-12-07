<template>
    <AppListContent
        v-if="!initialLoad && !loading"
        :table-data="{
            title: 'Accounts',
            columns,
            items: accounts,
            url: '/spending/accounts'
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
        key: 'id',
        label: 'ID',
        sortable: true,
    },
    {
        key: 'status',
        label: 'Status',
    },
    {
        key: 'name',
        label: 'Name',
        sortable: true,
    },
    {
        key: 'balance',
        label: 'Balance',
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

async function removeAccount(data: any) {
    await deleteAccount(data.id);
    await getAccounts();
}
</script>
