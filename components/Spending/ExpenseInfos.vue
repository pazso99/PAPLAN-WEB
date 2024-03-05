<template>
    <div class="flex items-center flex-wrap my-4 md:my-8">
        <h2 class="w-full text-2xl text-center mb-4 md:mb-8">
            Expense infos
        </h2>
        <div class="flex flex-wrap justify-center w-full max-w-full px-1 sm:px-3 mb-3 lg:w-full xl:w-1/2">
            <div class="w-full justify-center flex">
                <SpendingCardExpenseInfo
                    container-class="w-full max-w-full px-1 sm:px-3 mb-6 lg:w-1/2"
                    background-class="p-4 text-center bg-gradient-to-tr from-slate-800 to-gray-900 rounded-2xl border border-green-950"
                    :number="spending.totals.income"
                    number-class="text-green-500 font-bold"
                    label="Total income"
                    label-class="mb-0 font-weight-bolder"
                    :duration="300"
                    suffix="Ft"
                />
                <SpendingCardExpenseInfo
                    container-class="w-full max-w-full px-1 sm:px-3 mb-6 lg:w-1/2"
                    background-class="p-4 text-center bg-gradient-to-tr from-slate-800 to-gray-900 rounded-2xl border border-amber-950"
                    :number="spending.totals.expense"
                    number-class="text-red-500 font-bold"
                    label="Total expense"
                    label-class="mb-0 font-weight-bolder"
                    :duration="300"
                    suffix="Ft"
                />
            </div>
            <div class="w-full justify-center flex">
                <SpendingCardExpenseInfo
                    container-class="w-full max-w-full px-1 sm:px-3 lg:w-1/3"
                    background-class="p-4 text-center bg-gradient-to-tr from-gray-900 to-slate-800 rounded-2xl border border-amber-950"
                    :number="spending.totals.basicExpense"
                    number-class="text-red-500"
                    label="Basic kiadás"
                    label-class="mb-0 font-weight-bolder"
                    :duration="300"
                    suffix="Ft"
                />
                <SpendingCardExpenseInfo
                    container-class="w-full max-w-full px-1 sm:px-3 lg:w-1/3"
                    background-class="p-4 text-center bg-gradient-to-tr from-gray-900 to-slate-800 rounded-2xl border border-amber-950"
                    :number="spending.totals.premiumExpense"
                    number-class="text-red-500"
                    label="Prémium kiadás"
                    label-class="mb-0 font-weight-bolder"
                    :duration="300"
                    suffix="Ft"
                />
            </div>
            <Divider align="center">
                <i class="pi pi-th-large my-6" />
            </Divider>
            <SpendingCardExpenseInfo
                v-for="expense in expenses"
                :key="expense.category.name"
                container-class="w-full max-w-full px-1 sm:px-3 mb-3 sm:w-1/2 lg:w-1/3"
                background-class="p-4 text-center bg-gradient-to-tr from-gray-900 to-slate-800 rounded-2xl border border-amber-950"
                :number="expense.amount"
                number-class="text-red-500"
                :label="expense.category.name"
                label-class="mb-0 font-weight-bolder"
                :duration="300"
                suffix="Ft"
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
    </div>
</template>

<script setup>
import Chart from 'primevue/chart';

const { spending } = storeToRefs(useDashboardStore());
const chartData = ref();
const chartOptions = ref();
const expenses = ref();

onMounted(() => {
    setData(spending.value);
});

watch(spending, async (newSpending) => {
    setData(newSpending);
});

function setData(spendingData) {
    expenses.value = spendingData.categories.filter(c => c.category.type === 'expense');
    let profit = spendingData.totals.income - spendingData.totals.expense;
    if (profit < 0) {
        profit = 0;
    }

    const documentStyle = getComputedStyle(document.body);
    const textColor = documentStyle.getPropertyValue('--text-color');
    chartData.value = {
        labels: ['Profit', ...expenses.value.map(e => e.category.name)],
        datasets: [
            {
                data: [profit, ...expenses.value.map(e => e.amount)],
                backgroundColor: [
                    '#22c55e',
                    '#3498db',
                    '#5733ff',
                    '#09435a',
                    '#332e2e',
                    '#464343',
                    '#a9931e',
                    '#f39c12',
                    '#6d1212',
                ],
            },
        ],
    };

    chartOptions.value = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor,
                },
            },
        },
    };
};
</script>
