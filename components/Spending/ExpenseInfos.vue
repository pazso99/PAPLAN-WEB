<template>
    <div class="flex items-center justify-center flex-wrap my-4 md:my-8">
        <h2 class="w-full text-2xl text-center mb-4 md:mb-8">
            Expense infos
        </h2>
        <div v-if="!isTransactionsExists">
            No transactions.
        </div>
        <template v-else>
            <div class="flex flex-wrap justify-center w-full max-w-full px-1 sm:px-3 mb-3 lg:w-full xl:w-1/2">
                <div class="w-full justify-center flex">
                    <SpendingCardExpenseInfo
                        container-class="w-full max-w-full px-1 sm:px-3 mb-6 lg:w-1/2"
                        background-class="p-4 text-center !bg-gradient-to-tr !from-slate-800 !to-gray-900 rounded-2xl border border-green-950"
                        :number="spendingDashboardData.totals.income"
                        number-class="text-green-500 font-bold"
                        label="Total income"
                        label-class="mb-0 font-weight-bolder"
                        :duration="300"
                        suffix="Ft"
                        :route="{
                            name: 'spending-transactions',
                            query: {
                                type: 'income',
                                start_date: spendingSelectedDateStart,
                                end_date: spendingSelectedDateEnd,
                            },
                        }"
                    />
                    <SpendingCardExpenseInfo
                        container-class="w-full max-w-full px-1 sm:px-3 mb-6 lg:w-1/2"
                        background-class="p-4 text-center !bg-gradient-to-tr !from-slate-800 !to-gray-900 rounded-2xl border border-amber-950"
                        :number="spendingDashboardData.totals.expense"
                        number-class="text-red-500 font-bold"
                        label="Total expense"
                        label-class="mb-0 font-weight-bolder"
                        :duration="300"
                        suffix="Ft"
                        :route="{
                            name: 'spending-transactions',
                            query: {
                                type: 'expense',
                                start_date: spendingSelectedDateStart,
                                end_date: spendingSelectedDateEnd,
                            },
                        }"
                    />
                </div>
                <div class="w-full justify-center flex">
                    <SpendingCardExpenseInfo
                        container-class="w-full max-w-full px-1 sm:px-3 lg:w-1/3"
                        background-class="p-4 text-center bg-gradient-to-tr from-gray-900 to-slate-800 rounded-2xl border border-amber-950"
                        :number="spendingDashboardData.totals.basicExpense"
                        number-class="text-red-500"
                        label="Basic expense"
                        label-class="mb-0 font-weight-bolder"
                        :duration="300"
                        suffix="Ft"
                        :route="{
                            name: 'spending-transactions',
                            query: {
                                type: 'expense',
                                category: basicExpenseCategoryNames.join(','),
                                start_date: spendingSelectedDateStart,
                                end_date: spendingSelectedDateEnd,
                            },
                        }"
                    />
                    <SpendingCardExpenseInfo
                        container-class="w-full max-w-full px-1 sm:px-3 lg:w-1/3"
                        background-class="p-4 text-center bg-gradient-to-tr from-gray-900 to-slate-800 rounded-2xl border border-amber-950"
                        :number="spendingDashboardData.totals.premiumExpense"
                        number-class="text-red-500"
                        label="Premium expense"
                        label-class="mb-0 font-weight-bolder"
                        :duration="300"
                        suffix="Ft"
                        :route="{
                            name: 'spending-transactions',
                            query: {
                                type: 'expense',
                                category: premiumExpenseCategoryNames.join(','),
                                start_date: spendingSelectedDateStart,
                                end_date: spendingSelectedDateEnd,
                            },
                        }"
                    />
                </div>
                <Divider align="center">
                    <i class="pi pi-th-large my-6" />
                </Divider>
                <SpendingCardExpenseInfo
                    v-for="expenseCategory in expenseCategories"
                    :key="expenseCategory.name"
                    container-class="w-full max-w-full px-1 sm:px-3 mb-3 sm:w-1/2 lg:w-1/3"
                    background-class="p-4 text-center bg-gradient-to-tr from-gray-900 to-slate-800 rounded-2xl border border-amber-950"
                    :number="expenseCategory.sumTransactionAmount"
                    number-class="text-red-500"
                    :label="expenseCategory.name"
                    label-class="mb-0 font-weight-bolder"
                    :duration="300"
                    suffix="Ft"
                    :category-type="expenseCategory.expenseCategoryType"
                    :route="{
                        name: 'spending-transactions',
                        query: {
                            type: 'expense',
                            category: expenseCategory.name,
                            start_date: spendingSelectedDateStart,
                            end_date: spendingSelectedDateEnd,
                        },
                    }"
                />
            </div>
            <div class="w-full max-w-full px-1 sm:px-3 mb-6 lg:w-full xl:w-1/2">
                <div class="flex justify-center p-4 bg-gradient-to-tr from-gray-900 to-slate-800 rounded-2xl border border-slate-800">
                    <Chart
                        type="pie"
                        :data="chartData"
                        :options="chartOptions"
                        class="w-full md:w-[30rem]"
                    />
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import Chart from 'primevue/chart';
import type { SpendingDashboardCategoryInfo } from '~/types/types';

const spendingDashboardStore = useSpendingDashboardStore();
const { spendingDashboardData, spendingSelectedDate } = storeToRefs(spendingDashboardStore);
const chartData = ref();
const chartOptions = ref();
const expenseCategories = ref<SpendingDashboardCategoryInfo[]>();
const isTransactionsExists = ref();
const basicExpenseCategoryNames = ref<string[]>([]);
const premiumExpenseCategoryNames = ref<string[]>([]);

onMounted(() => {
    setData();
});

watch(spendingDashboardData, async () => {
    setData();
});

const dayjs = useDayjs();
const spendingSelectedDateStart = ref();
const spendingSelectedDateEnd = ref();
function setData() {
    isTransactionsExists.value = spendingDashboardData.value.categories.some(category => category.sumTransactionAmount > 0);

    const expenseCategoriesArray: SpendingDashboardCategoryInfo[] = [];
    spendingDashboardData.value.categories.forEach((category) => {
        if (category.type === 'expense') {
            expenseCategoriesArray.push(category);
            if (category.expenseCategoryType === 'basic') {
                basicExpenseCategoryNames.value.push(category.name);
            } else if (category.expenseCategoryType === 'premium') {
                premiumExpenseCategoryNames.value.push(category.name);
            }
        }
    });
    expenseCategories.value = expenseCategoriesArray;

    let profit = spendingDashboardData.value.totals.income - spendingDashboardData.value.totals.expense;
    if (profit < 0) {
        profit = 0;
    }

    chartData.value = {
        labels: [
            ...(profit > 0 ? ['Profit'] : []),
            ...expenseCategories.value.map(c => c.name),
        ],
        datasets: [
            {
                data: [
                    ...(profit > 0 ? [profit] : []),
                    ...expenseCategories.value.map(c => c.sumTransactionAmount),
                ],
                backgroundColor: [
                    ...(profit > 0 ? ['#22c55e'] : []),
                    '#3498db',
                    '#5733ff',
                    '#09435a',
                    '#332e2e',
                    '#464343',
                    '#a9931e',
                    '#f39c12',
                    '#6d1212',
                    '#41210c',
                    '#6c8d9b',
                    '#999b6c',
                    '#672d4f',
                ],
            },
        ],
    };

    chartOptions.value = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: '#fff',
                },
            },
        },
    };

    const { dateStart, dateEnd } = getDateRange(spendingSelectedDate.value);

    spendingSelectedDateStart.value = dateStart;
    spendingSelectedDateEnd.value = dateEnd;
};
</script>
