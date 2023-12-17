<template>
    <div class="flex flex-wrap">
        <AppInfoCard
            containerClass="w-full max-w-full px-1 sm:px-3 mb-6 lg:w-full xl:w-1/2"
        >
            <template #body>
                <div class="flex flex-col w-full">
                    <pre>{{ spendingSelectedDate.split('-')[0] }}</pre>
                    <apexchart :options="chartOptions" :series="series"></apexchart>
                </div>
            </template>
        </AppInfoCard>

        <pre>{{  }}</pre>
    </div>
</template>

<script setup>
import numeral from 'numeral';

const { spending, spendingSelectedDate } = storeToRefs(useDashboardStore());

const series = [{
    data: spending.value.diagrams.yearlyBalance.filter(b => b.amount > 0).map(b => b.amount)
}];

const chartOptions = {
    chart: {
        height: 800,
        width: '100%',
        type: 'line',
        zoom: {
            enabled: false
        },
        foreColor: '#fff',
        toolbar: {
            show: false,
        }
    },
    stroke: {
        curve: 'straight'
    },
    grid: {
        row: {
            colors: ['#84aceb', '#4b7bc9'],
            opacity: 0.35
        },
    },
    yaxis: {
        labels: {
            formatter: function (value) {
                return numeral(value).format('0,0') + 'Ft';
            }
        },
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    tooltip: {
        custom: function({series, seriesIndex, dataPointIndex, w}) {
            return `<div class="p-4 text-emerald-600"><span>${numeral(series[seriesIndex][dataPointIndex]).format('0,0')} Ft</span></div>`;
        }
    }
}

</script>
