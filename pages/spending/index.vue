<template>
    <ContentBaseCard
        title="Spending dashboard"
        :loading="initLoading"
    >
        <SpendingAccounts @create-transaction="saveTransaction" />

        <Divider align="center">
            <Select
                v-model="spendingSelectedDate"
                :options="dates"
                placeholder="Date"
            />
        </Divider>

        <SpendingExpenseInfos />

        <div class="flex items-center flex-wrap my-4 md:my-8">
            <h2 class="w-full text-2xl text-center mb-4 md:mb-8">
                Transaction infos
            </h2>
            <SpendingChartBalanceInfo />
            <SpendingLatestTransactions />
        </div>

        <template #loading>
            <div class="flex flex-wrap justify-center mb-4">
                <div class="w-full max-w-full px-1 sm:px-3 my-3 sm:w-1/2 xl:w-1/4">
                    <Skeleton width="100%" height="10rem" />
                </div>
                <div class="w-full max-w-full px-1 sm:px-3 my-3 sm:w-1/2 xl:w-1/4">
                    <Skeleton width="100%" height="10rem" />
                </div>
                <div class="w-full max-w-full px-1 sm:px-3 my-3 sm:w-1/2 xl:w-1/4">
                    <Skeleton width="100%" height="10rem" />
                </div>
                <div class="w-full max-w-full px-1 sm:px-3 my-3 sm:w-1/2 xl:w-1/4">
                    <Skeleton width="100%" height="10rem" />
                </div>
            </div>
            <div class="w-full flex justify-center">
                <div class="w-full max-w-full px-1 sm:px-3 mb-3 sm:w-1/2 xl:w-1/4">
                    <Skeleton width="100%" height="8rem" />
                </div>
            </div>

            <Divider align="center" class="py-3">
                <Skeleton width="6rem" height="1rem" />
            </Divider>

            <div class="flex flex-wrap justify-center mb-4">
                <div class="w-full max-w-full px-1 sm:px-3 my-3 sm:w-1/2">
                    <Skeleton width="100%" height="14rem" />
                </div>
                <div class="w-full max-w-full px-1 sm:px-3 my-3 sm:w-1/2">
                    <Skeleton width="100%" height="14rem" />
                </div>
            </div>

            <div class="w-full flex justify-center">
                <div class="w-full max-w-full px-1 sm:px-3 mb-3 sm:w-1/2">
                    <Skeleton width="100%" height="16rem" />
                </div>
            </div>
        </template>
    </ContentBaseCard>
</template>

<script setup lang="ts">
import type { SpendingTransactionCreateRequest } from '~/types/requests';

definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});

useHead({
    title: 'Spending Dashboard',
});

const spendingDashboardStore = useSpendingDashboardStore();
const { getSpendingData, createTransaction } = spendingDashboardStore;
const { spendingSelectedDate, spendingYears } = storeToRefs(spendingDashboardStore);

const dayjs = useDayjs();
const dates = [
    ...Array.from(
        { length: dayjs().month() + 13 },
        (_, i) => dayjs().subtract(i, 'month').format('YYYY-MM'),
    ).filter(d => spendingYears.value.some(year => d.startsWith(year))),
    ...spendingYears.value.map(year => year.toString()),
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

async function saveTransaction(data: SpendingTransactionCreateRequest) {
    await createTransaction(data);
    await getSpendingData(parseYearAndMonth(spendingSelectedDate.value));
}
</script>
