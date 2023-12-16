<template>
    <div class="flex flex-wrap justify-center mb-4">
        <AppInfoCard
            v-for="account in spending.accounts"
            :key="account.name"
            containerClass="w-full max-w-full px-1 sm:px-3 mb-6 sm:w-1/2 xl:w-1/4"
        >
            <template #body>
                <div>
                    <p class="mb-0 text-sm font-semibold">{{ account.name }}</p>
                    <CountTo class="mb-2 text-3xl font-bold" :start-val="0" :end-val="account.balance" :duration="200" /> Ft
                    <div class="mb-0 text-gray-400">
                        <UPopover mode="hover">
                            <div>
                                <span
                                    :class="account.profit < 0 ? 'text-red-500': 'text-emerald-500'"
                                >
                                    <template v-if="account.profit > 0">+</template>
                                    <CountTo :start-val="0" :end-val="account.profit" :duration="200" /> Ft
                                </span> in {{ spendingSelectedDate }}
                                <UIcon class="text-xs" name="i-heroicons-arrow-down" />
                            </div>
                            <template #panel>
                                <div class="p-4 text-sm opacity-80">
                                    <p><span class="text-emerald-500">Income</span>: {{ $formatNumber(account.income) }} Ft</p>
                                    <p><span class="text-red-500">Expense</span>: {{ $formatNumber(account.expense) }} Ft</p>
                                </div>
                            </template>
                        </UPopover>
                    </div>
                </div>
            </template>
            <template #right>
                <div class="flex justify-center items-center w-12 h-12 rounded-3xl bg-gradient-to-tl from-cyan-500 to-blue-500">
                    <UIcon name="i-heroicons-user" class="w-8 h-8" />
                </div>
            </template>
        </AppInfoCard>

        <div class="w-full flex justify-center">
            <AppInfoCard
                containerClass="w-full max-w-full px-1 sm:px-3 mb-3 sm:w-1/2 xl:w-1/4"
            >
                <template #body>
                    <div>
                        <p class="mb-0 text-sm font-semibold">Total</p>
                        <CountTo class="mb-2 text-3xl font-bold" :start-val="0" :end-val="spending.totals.balance" :duration="200" /> Ft
                        <div class="mb-0 text-gray-400">
                            <UPopover mode="hover">
                                <div>
                                    <span
                                        :class="spending.totals.profit < 0 ? 'text-red-500': 'text-emerald-500'"
                                    >
                                        <template v-if="spending.totals.profit > 0">+</template>
                                        <CountTo :start-val="0" :end-val="spending.totals.profit" :duration="200" /> Ft
                                    </span> in {{ spendingSelectedDate }}
                                    <UIcon class="text-xs" name="i-heroicons-arrow-down" />
                                </div>
                                <template #panel>
                                    <div class="p-4 text-sm opacity-80">
                                        <p><span class="text-emerald-500">Income</span>: {{ $formatNumber(spending.totals.allIncome) }} Ft</p>
                                        <p><span class="text-red-500">Expense</span>: {{ $formatNumber(spending.totals.allExpense) }} Ft</p>
                                    </div>
                                </template>
                            </UPopover>
                        </div>
                    </div>
                </template>
                <template #right>
                    <div class="flex justify-center items-center w-12 h-12 rounded-3xl bg-gradient-to-tl from-green-400 to-green-600">
                        <UIcon name="i-heroicons-wallet" class="w-8 h-8" />
                    </div>
                </template>
            </AppInfoCard>
        </div>
    </div>
</template>

<script setup>
import CountTo from 'vue-count-to/src';
const { spending, spendingSelectedDate } = storeToRefs(useDashboardStore());
</script>
