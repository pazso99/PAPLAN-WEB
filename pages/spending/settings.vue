<template>
    <AppContent
        :title="'Spending settings'"
        :buttons="[
            { icon: 'i-heroicons-arrow-left-20-solid', to: '/spending' }
        ]"
        :loading="loading"
        :customFooter="true"
    >
        <div class="flex flex-wrap items-start xl:flex-nowrap gap-4">
            <div class="w-full max-w-full sm:px-3 mb-6 xl:w-2/6 p-4 bg-slate-800 rounded-2xl">
                <div class="flex flex-col">
                    <h2 class="font-bold mb-3 text-xl">Expense categories</h2>
                    <div class="flex">
                        <div class="w-full lg:w-1/2 p-2 mb-4 flex flex-col">
                            Basic categories:
                            <USelectMenu placeholder="Select..." v-model="basicCategories" multiple :options="spendingSettings.expenseCategories" option-attribute="name" by="id" />
                        </div>

                        <div class="w-full lg:w-1/2 p-2 mb-4 flex flex-col">
                            Premium categories:
                            <USelectMenu placeholder="Select..." v-model="premiumCategories" multiple :options="spendingSettings.expenseCategories" option-attribute="name" by="id" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full max-w-full sm:px-3 mb-6 xl:w-4/6 p-4 bg-slate-800 rounded-2xl">
                <h2 class="font-bold mb-1 text-xl">Actual total balances</h2>
                <h2 class="font-bold mb-3">2024</h2>
                <div class="p-2 flex flex-wrap mb-3">
                    <ul class="w-full lg:w-1/4">
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            January:
                            <UInput v-model="spendingActualBalances['2024-01']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            February:
                            <UInput v-model="spendingActualBalances['2024-02']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            March:
                            <UInput v-model="spendingActualBalances['2024-03']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                    </ul>
                    <ul class="w-full lg:w-1/4">
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            April:
                            <UInput v-model="spendingActualBalances['2024-04']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            May:
                            <UInput v-model="spendingActualBalances['2024-05']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            June:
                            <UInput v-model="spendingActualBalances['2024-06']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                    </ul>
                    <ul class="w-full lg:w-1/4">
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            July:
                            <UInput v-model="spendingActualBalances['2024-07']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            August:
                            <UInput v-model="spendingActualBalances['2024-08']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            September:
                            <UInput v-model="spendingActualBalances['2024-09']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                    </ul>
                    <ul class="w-full lg:w-1/4">
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            October:
                            <UInput v-model="spendingActualBalances['2024-10']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            November:
                            <UInput v-model="spendingActualBalances['2024-11']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            December:
                            <UInput v-model="spendingActualBalances['2024-12']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                    </ul>
                </div>
                <h2 class="font-bold mb-3">2023</h2>
                <div class="p-2 flex flex-wrap">
                    <ul class="w-full lg:w-1/4">
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            January:
                            <UInput v-model="spendingActualBalances['2023-01']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            February:
                            <UInput v-model="spendingActualBalances['2023-02']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            March:
                            <UInput v-model="spendingActualBalances['2023-03']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                    </ul>
                    <ul class="w-full lg:w-1/4">
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            April:
                            <UInput v-model="spendingActualBalances['2023-04']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            May:
                            <UInput v-model="spendingActualBalances['2023-05']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            June:
                            <UInput v-model="spendingActualBalances['2023-06']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                    </ul>
                    <ul class="w-full lg:w-1/4">
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            July:
                            <UInput v-model="spendingActualBalances['2023-07']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            August:
                            <UInput v-model="spendingActualBalances['2023-08']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            September:
                            <UInput v-model="spendingActualBalances['2023-09']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                    </ul>
                    <ul class="w-full lg:w-1/4">
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            October:
                            <UInput v-model="spendingActualBalances['2023-10']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            November:
                            <UInput v-model="spendingActualBalances['2023-11']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                        <li class="flex gap-2 justify-between items-center p-2 w-50">
                            December:
                            <UInput v-model="spendingActualBalances['2023-12']" class="w-32">
                                <template #trailing>
                                    <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
                                </template>
                            </UInput>
                        </li>
                    </ul>
                </div>
            </div>
       </div>

       <template #footer>
            <UButton
                size="lg"
                square
                @click="handleSave"
            >
                Save
            </UButton>
        </template>
    </AppContent>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
});
useHead({
    title: 'Spending settings',
});

const { getSpendingSettingsData, getSpendingActualBalances, updateSpendingSettings } = useConfigStore();
const { loading, spendingActualBalances, spendingSettings }: any = storeToRefs(useConfigStore());

const basicCategories: any = ref([]);
const premiumCategories: any = ref([]);

onMounted(async () => {
    await getSpendingSettingsData();
    await getSpendingActualBalances();

    basicCategories.value = spendingSettings.value.configs.spending_basic_transaction_categories.map((c: any) => ({ id: c }));
    premiumCategories.value = spendingSettings.value.configs.spending_premium_transaction_categories.map((c: any) => ({ id: c }));
});

async function handleSave() {
    const body = {
        configs: {
            ...spendingSettings.value.configs,
            spending_basic_transaction_categories: basicCategories.value.map((c: any) => c.id),
            spending_premium_transaction_categories: premiumCategories.value.map((c: any) => c.id)
        },
        actualBalances: spendingActualBalances.value
    };
    await updateSpendingSettings(body);
};
</script>
