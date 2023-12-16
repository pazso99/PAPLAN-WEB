<template>
    <AppContent
        :title="'Spending dashboard'"
        :buttons="[
            { icon: 'i-heroicons-arrow-left-20-solid', to: '/' }
        ]"
        :loading="loading"
    >
        <div>
            <SpendingAccountInfos />

            <UDivider class="mb-10">
                <USelectMenu class="w-36" size="lg" v-model="spendingSelectedDate" :options="dates" :ui="{ base: 'justify-center' }">
                    <template #option="{ option }">
                        <span class="text-md">{{ option }}</span>
                    </template>
                </USelectMenu>
            </UDivider>

            <SpendingExpenseInfos v-if="hasExpenseCategory" />

            <SpendingLatestTransactionInfos @create-transaction="saveTransaction" />

            <SpendingCharts />
        </div>
    </AppContent>
</template>

<script setup>
definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});
useHead({
    title: 'Spending Dashboard',
});

const { getSpendingData, createTransaction } = useDashboardStore();
const { spending, spendingSelectedDate, loading } = storeToRefs(useDashboardStore());

const dayjs = useDayjs();
const dates = [
    ...Array.from({ length: 12 }, (_, i) => dayjs().subtract(i, 'month').format('YYYY-MM')),
    '2023'
];

spendingSelectedDate.value = dates[0];
let hasExpenseCategory = ref(false);

onMounted(async () => {
    await getSpendingData(parseYearAndMonth(spendingSelectedDate.value));
    hasExpenseCategory.value = spending.value?.categories.length > 0 && spending.value?.categories.filter(c => c.category.type === 'expense').length > 0;
});

watch(spendingSelectedDate, async (newSpendingSelectedDate) => {
    await getSpendingData(parseYearAndMonth(newSpendingSelectedDate));
    hasExpenseCategory.value = spending.value?.categories.length > 0 && spending.value?.categories.filter(c => c.category.type === 'expense').length > 0;
});

function parseYearAndMonth(dateString) {
    const [year, month] = dateString.split('-');

    return {
        year,
        month: month || '',
    };
}

async function saveTransaction(data) {
    await createTransaction(data);
    await getSpendingData(parseYearAndMonth(spendingSelectedDate.value));
}
</script>
