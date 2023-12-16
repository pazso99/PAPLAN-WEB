<template>
    <div class="flex flex-wrap">
        <AppInfoCard
            containerClass="w-full max-w-full px-1 sm:px-3 mb-6 lg:w-full xl:w-1/2"
        >
            <template #body>
                <div class="flex flex-col w-full">
                    <div>
                        <p class="mb-0 text-sm font-semibold">Profit</p>
                        <p class="mb-0 dark:text-white dark:opacity-60">
                            <span
                                :class="spending.totals.profit < 0 ? 'text-red-500': 'text-emerald-500'"
                            >
                                <template v-if="spending.totals.profit > 0">+</template>
                                <span>{{ $formatNumber(spending.totals.profit) }}</span>
                            </span> in {{ spendingSelectedDate }}
                        </p>
                    </div>
                    <apexchart :options="chartOptions" :series="series"></apexchart>
                </div>
            </template>
        </AppInfoCard>

    </div>
</template>

<script setup>
const { spending, spendingSelectedDate } = storeToRefs(useDashboardStore());
const series = [{
    // FIXME
    name: "Total",
    data: [
        '1.220.419',
        '1.400.551',
        '1.537.391',
        '1.587.326',
        '1.914.590',
        '1.809.337',
        '1.763.753',
        '1.360.073',
        '1.310.680',
        '1.424.115',
        '1.286.619',
        '1.787.273',
    ]
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
    dataLabels: {
        enabled: true,
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
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    }, tooltip: {
  custom: function({series, seriesIndex, dataPointIndex, w}) {
    return '<div class="p-4 text-emerald-500">' +
      '<span>' + series[seriesIndex][dataPointIndex] + '</span>' +
      '</div>'
  }
}
}

</script>
