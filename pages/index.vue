<template>
    <AppContent
        :customHeader="true"
    >
        <template #header>
            <div class="text-center gap-3 px-4 py-3">
                <h2 class="font-semibold text-2xl text-transparent bg-clip-text bg-gradient-to-r to-cyan-200 from-blue-900 leading-tight mb-2">
                    PAPLAN
                </h2>
                <p>2023.12</p>
                <div class="flex justify-center gap-4 mt-2">
                    <UButton
                        to="/spending"
                        size="sm"
                        variant="link"
                        label="Spending"
                    />
                    <UButton
                        size="sm"
                        variant="link"
                        label="Inventory"
                    />
                    <UButton
                        size="sm"
                        variant="link"
                        label="Lorem"
                    />
                </div>
            </div>
        </template>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cum quam necessitatibus perspiciatis repellendus earum eligendi.</p>
    </AppContent>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});
useHead({
    title: 'Dashboard',
});

const { getSpendingData } = useDashboardStore();
const { spending } = storeToRefs(useDashboardStore());

onMounted(async () => {
    await getSpendingData("2023-05-05");
    console.log(spending);
});
</script>
