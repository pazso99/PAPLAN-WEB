<template>
    <div class="w-full max-w-full px-1 sm:px-3 mb-6 lg:w-full xl:w-1/2">
        <div class="flex justify-center p-4 bg-gradient-to-tr from-gray-900 to-slate-800 rounded-2xl border border-slate-800">
            <Chart
                type="line"
                :data="chartData"
                :options="chartOptions"
                class="w-full md:w-[30rem] h-[14rem] md:h-[30rem]"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import Chart from 'primevue/chart';
import type { SpendingDashboardData } from '~/types/types';

const { spendingDashboardData, spendingSelectedDate } = storeToRefs(useSpendingDashboardStore());
const chartData = ref();
const chartOptions = ref();

onMounted(() => {
    setData(spendingDashboardData.value);
});

watch(spendingDashboardData, async (newSpending) => {
    setData(newSpending);
});

function setData(spendingData: SpendingDashboardData) {
    const textColor = '#fff';
    const textColorSecondary = '#8d97a5';
    const surfaceBorder = '#3b3b3b';
    chartData.value = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: `${spendingSelectedDate.value.split('-')[0]} balance`,
                fill: false,
                borderColor: '#22c55e',
                data: [
                    ...spendingData.diagrams.yearlyBalance.filter(b => b.amount > 0).map(b => b.amount),
                    spendingData.totals.balance,
                ],
            },
        ],
    };

    chartOptions.value = {
        stacked: false,
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
            legend: {
                labels: {
                    color: textColor,
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder,
                },
            },
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder,
                },
            },
        },
    };
};
</script>
