<template>
    <ContentBaseCard
        title="Inventory dashboard"
        :loading="loading"
    >
        Inventory dashboard
        <template #loading>
            Loading...
        </template>
    </ContentBaseCard>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});

useHead({
    title: 'Inventory Dashboard',
});

const inventoryDashboardStore = useInventoryDashboardStore();
const { getInventoryDashboardData } = inventoryDashboardStore;
const { loading } = storeToRefs(inventoryDashboardStore);

onMounted(async () => {
    await getInventoryDashboardData();
});
</script>
