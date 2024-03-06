<template>
    <div class="flex flex-wrap w-full max-w-full px-1 sm:px-3 mb-3 lg:w-full xl:w-1/2">
        <DataView
            :value="spending.latestTransactions"
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
                        v-for="({ transaction, amount }, index) in slotProps.items"
                        :key="index"
                        class="py-2 px-4 flex justify-between"
                    >
                        <NuxtLink :to="`/spending/transactions/${transaction.id}`">
                            <span class="text-gray-400 flex gap-1 flex-col md:flex-row">
                                {{ transaction.date }}:
                                <span class="font-bold">{{ transaction.category }}</span>
                                [{{ transaction.account }}]
                                <span v-if="transaction.comment">({{ transaction.comment }})</span>
                            </span>
                        </NuxtLink>
                        <span
                            v-if="transaction.type === 'income'"
                            class="text-emerald-600"
                        >
                            + {{ $formatNumber(amount) }} Ft
                        </span>
                        <span
                            v-else
                            class="text-red-500"
                        >
                            - {{ $formatNumber(amount) }} Ft
                        </span>
                    </div>
                </div>
            </template>
        </DataView>

        <div class="w-full text-center p-3">
            <NuxtLink to="/spending/transactions">
                <Button
                    size="small"
                    label="All transactions"
                    severity="secondary"
                />
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const { spending } = storeToRefs(useDashboardStore());
</script>
