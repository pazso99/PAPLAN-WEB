<template>
    <ContentBaseCard
        :title="'Spending dashboard'"
        :loading="initLoading"
    >
        <SpendingAccounts @create-transaction="saveTransaction" />

        <Divider align="center">
            <Dropdown
                v-model="spendingSelectedDate"
                :options="dates"
                placeholder="Date"
            />
        </Divider>

        <SpendingExpenseInfos />

        <div class="flex items-center flex-wrap my-4 md:my-8">
            <h2 class="w-full text-2xl text-center mb-4 md:mb-8">Transaction infos</h2>
            <SpendingChartBalanceInfo />
            <SpendingLatestTransactions />
        </div>

        <template #loading>
            <div class="flex flex-wrap justify-center mb-4">
                <div class="w-full max-w-full px-1 sm:px-3 my-3 sm:w-1/2 xl:w-1/4">
                    <Skeleton width="100%" height="10rem"></Skeleton>
                </div>
                <div class="w-full max-w-full px-1 sm:px-3 my-3 sm:w-1/2 xl:w-1/4">
                    <Skeleton width="100%" height="10rem"></Skeleton>
                </div>
                <div class="w-full max-w-full px-1 sm:px-3 my-3 sm:w-1/2 xl:w-1/4">
                    <Skeleton width="100%" height="10rem"></Skeleton>
                </div>
                <div class="w-full max-w-full px-1 sm:px-3 my-3 sm:w-1/2 xl:w-1/4">
                    <Skeleton width="100%" height="10rem"></Skeleton>
                </div>
            </div>
            <div class="w-full flex justify-center">
                <div class="w-full max-w-full px-1 sm:px-3 mb-3 sm:w-1/2 xl:w-1/4">
                    <Skeleton width="100%" height="8rem"></Skeleton>
                </div>
            </div>

            <Divider align="center" class="py-3">
                <Skeleton width="6rem" height="qrem"></Skeleton>
            </Divider>

            <div class="flex flex-wrap justify-center mb-4">
                <div class="w-full max-w-full px-1 sm:px-3 my-3 sm:w-1/2">
                    <Skeleton width="100%" height="14rem"></Skeleton>
                </div>
                <div class="w-full max-w-full px-1 sm:px-3 my-3 sm:w-1/2">
                    <Skeleton width="100%" height="14rem"></Skeleton>
                </div>
            </div>

            <div class="w-full flex justify-center">
                <div class="w-full max-w-full px-1 sm:px-3 mb-3 sm:w-1/2">
                    <Skeleton width="100%" height="16rem"></Skeleton>
                </div>
            </div>
        </template>
    </ContentBaseCard>
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
const { spendingSelectedDate } = storeToRefs(useDashboardStore());

const dayjs = useDayjs();
const dates = [
    ...Array.from(
        { length: dayjs().month() + 13 },
        (_, i) => dayjs()
                    .subtract(i, 'month')
                    .format('YYYY-MM')
    ).filter(d => d.startsWith('2024')),
    '2023-12',
    '2024',
    '2023',
];
spendingSelectedDate.value = dates[0];

const initLoading = ref(true);
onMounted(async () => {
    await getSpendingData(parseYearAndMonth(spendingSelectedDate.value));
    initLoading.value = false;
});

watch(spendingSelectedDate, async (newSpendingSelectedDate) => {
    await getSpendingData(parseYearAndMonth(newSpendingSelectedDate));
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
