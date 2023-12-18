<template>
    <div class="flex items-center flex-wrap mb-6">
        <h2 class="w-full my-5 text-2xl text-center">Expense infos</h2>
        <div class="flex flex-wrap justify-center w-full max-w-full px-1 sm:px-3 mb-3 lg:w-full xl:w-1/2">
            <div class="w-full justify-center flex font-bold">
                <AppMiniCountCard
                    containerClass="w-full max-w-full px-1 sm:px-3 mb-6 lg:w-1/2"
                    color="emerald"
                    :count="spending.totals.allIncome"
                    suffix=" Ft"
                    title="Total income"
                />
                <AppMiniCountCard
                    containerClass="w-full max-w-full px-1 sm:px-3 mb-6 lg:w-1/2"
                    color="red"
                    :count="spending.totals.allExpense"
                    suffix=" Ft"
                    title="Total expense"
                />
            </div>
            <div class="w-full justify-center flex">
                <AppMiniCountCard
                    containerClass="w-full max-w-full px-1 sm:px-3 lg:w-1/3"
                    color="red"
                    :count="spending.totals.basicExpense"
                    suffix=" Ft"
                    title="Basic kiadás"
                />
                <AppMiniCountCard
                    containerClass="w-full max-w-full px-1 sm:px-3 lg:w-1/3"
                    color="red"
                    :count="spending.totals.premiumExpense"
                    suffix=" Ft"
                    title="Prémium kiadás"
                />
            </div>
            <UDivider class="my-6" icon="i-heroicons-squares-2x2" />
            <AppMiniCountCard
                v-for="expense in expenses"
                :key="expense.category.name"
                containerClass="w-full max-w-full px-1 sm:px-3 mb-3 sm:w-1/2 lg:w-1/3"
                color="red"
                :count="expense.amount"
                suffix=" Ft"
                :title="expense.category.name"
            />
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
import CountTo from 'vue-count-to/src';

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
    colors: ['#ff5733', '#33ff57', '#5733ff', '#2ecc71', '#33ffcc', '#cc33ff', '#ff33cc', '#3399ff', '#3498db', '#e74c3c', '#f39c12'],
    labels: spending.value.categories.filter(c => c.category.type === 'expense').map(e => e.category.name),
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
