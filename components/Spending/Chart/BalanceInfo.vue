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

const { spendingDashboardData } = storeToRefs(useSpendingDashboardStore());
const chartData = ref();
const chartOptions = ref();

onMounted(() => {
    setData(spendingDashboardData.value);
});

watch(spendingDashboardData, async (newSpending) => {
    setData(newSpending);
});

function setData(spendingData: SpendingDashboardData) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    chartData.value = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Balance',
                fill: false,
                borderColor: documentStyle.getPropertyValue('--green-500'),
                data: spendingData.diagrams.yearlyBalance.filter(b => b.amount > 0).map(b => b.amount),
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
