<template>
    <div class="flex justify-center flex-wrap w-full max-w-full px-1 sm:px-3 mb-3 lg:w-full xl:w-1/2">
        <div
            v-if="spendingDashboardData.latestTransactions.length === 0"
        >
            No transactions.
        </div>
        <template v-else>
            <DataView
                :value="spendingDashboardData.latestTransactions"
                data-key="id"
                class="w-full"
            >
                <template #header>
                    <div class="text-center">
                        Latest transactions
                    </div>
                </template>
                <template #list="slotProps">
                    <div class="divide-y divide-zinc-800">
                        <div
                            v-for="(transaction, index) in slotProps.items"
                            :key="index"
                            class="py-2 px-4 flex justify-between"
                        >
                            <NuxtLink
                                :to="{ name: 'spending-transactions-id', params: { id: transaction.id }, query: { from: '/spending' } }"
                            >
                                <span class="text-gray-400 flex gap-1 flex-col md:flex-row">
                                    {{ transaction.date }}:
                                    <span class="font-bold">{{ transaction.transactionCategory.name }}</span>
                                    [{{ transaction.account.name }}]
                                    <span v-if="transaction.comment">({{ transaction.comment }})</span>
                                </span>
                            </NuxtLink>
                            <span
                                v-if="transaction.transactionCategory.transactionType === 'income'"
                                class="text-emerald-600"
                            >
                                + {{ $formatNumber(transaction.amount) }} Ft
                            </span>
                            <span
                                v-else
                                class="text-red-500"
                            >
                                - {{ $formatNumber(transaction.amount) }} Ft
                            </span>
                        </div>
                    </div>
                </template>
            </DataView>

            <div class="w-full text-center p-3">
                <NuxtLink
                    :to="{ name: 'spending-transactions', query: { from: '/spending' } }"
                >
                    <Button
                        size="small"
                        label="All transactions"
                        severity="secondary"
                    />
                </NuxtLink>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
const { spendingDashboardData } = storeToRefs(useSpendingDashboardStore());
</script>
