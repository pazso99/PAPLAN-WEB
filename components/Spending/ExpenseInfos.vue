<template>
    <div class="flex items-center flex-wrap mb-6">
        <h2 class="w-full my-5 text-2xl text-center">Expense infos</h2>
        <div class="flex flex-wrap justify-center w-full max-w-full px-1 sm:px-3 mb-3 lg:w-full xl:w-1/2">
            <div class="w-full justify-center flex">
                <AppMiniCountCard
                    containerClass="w-full max-w-full px-1 sm:px-3 mb-6 lg:w-1/2"
                    titleClass="text-emerald-500 font-bold"
                    :count="spending.totals.allIncome"
                    suffix=" Ft"
                >
                    <h6 class="mb-0 font-weight-bolder">Total income</h6>
                </AppMiniCountCard>
                <AppMiniCountCard
                    containerClass="w-full max-w-full px-1 sm:px-3 mb-6 lg:w-1/2"
                    titleClass="text-red-500 font-bold"
                    :count="spending.totals.allExpense"
                    suffix=" Ft"
                >
                    <h6 class="mb-0 font-weight-bolder">Total expense</h6>
                </AppMiniCountCard>
            </div>
            <div class="w-full justify-center flex">
                <AppMiniCountCard
                    containerClass="w-full max-w-full px-1 sm:px-3 lg:w-1/3"
                    titleClass="text-red-500"
                    :count="spending.totals.basicExpense"
                    suffix=" Ft"
                >
                    <h6 class="mb-0 font-weight-bolder">Basic kiadás</h6>
                </AppMiniCountCard>
                <AppMiniCountCard
                    containerClass="w-full max-w-full px-1 sm:px-3 lg:w-1/3"
                    titleClass="text-red-500"
                    :count="spending.totals.premiumExpense"
                    suffix=" Ft"
                >
                    <h6 class="mb-0 font-weight-bolder">Prémium kiadás</h6>
                </AppMiniCountCard>
            </div>
            <UDivider class="my-6" icon="i-heroicons-squares-2x2" />
            <AppMiniCountCard
                v-for="expense in expenses"
                :key="expense.category.name"
                containerClass="w-full max-w-full px-1 sm:px-3 mb-3 sm:w-1/2 lg:w-1/3"
                titleClass="text-red-500"
                :count="expense.amount"
                suffix=" Ft"
            >
                <h6 class="mb-0 font-weight-bolder">{{ expense.category.name }}</h6>
            </AppMiniCountCard>
        </div>
        <AppInfoCard
            containerClass="w-full max-w-full px-1 sm:px-3 mb-6 lg:w-full xl:w-1/2"
        >
            <template #body>
                <div class="flex flex-col w-full">
                    <apexchart :options="pieChartOptions" :series="pieChartSeries"></apexchart>
                </div>
            </template>
        </AppInfoCard>
    </div>
</template>

<script setup>
import numeral from 'numeral';

const { spending } = storeToRefs(useDashboardStore());
const pieChartSeries = spending.value.categories.filter(c => c.category.type === 'expense').map(e => e.amount);

const expenses = spending.value.categories.filter(c => c.category.type === 'expense');

const pieChartOptions = {
    chart: {
        height: 800,
        width: '100%',
        type: 'pie',
        foreColor: '#fff',
    },
    colors: [
        '#3498db',
        '#5733ff',
        '#09435a',
        '#332e2e',
        '#464343',
        '#a9931e',
        '#f39c12',
        '#6d1212',
    ],
    labels: spending.value.categories.filter(c => c.category.type === 'expense').map(e => e.category.name),
    tooltip: {
        custom: function({series, seriesIndex}) {
            return `<div class="p-4 text-red-600"><span>${numeral(series[seriesIndex]).format('0,0')} Ft</span></div>`;
        }
    },
    responsive: [{
        breakpoint: 639,
        options: {
            chart: {
                width: '100%'
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
}
</script>
