<template>
    <ContentBaseCard
        title="Spending settings"
        :nav-buttons="[
            { icon: 'pi-chevron-left', to: '/spending' },
        ]"
        :loading="loading"
    >
        <div class="sm:p-4 p-2">
            <div class="w-full max-w-full sm:px-3 mb-6 xl:w-2/6 p-4 bg-gradient-to-tr from-gray-900 to-slate-800 rounded-2xl border border-slate-800">
                <h2 class="font-bold mb-3 text-xl">
                    Expense categories
                </h2>
                <div class="flex flex-col md:flex-row">
                    <div class="w-full lg:w-1/2 p-2 mb-4 flex flex-col">
                        Basic categories:
                        <MultiSelect
                            v-model="basicCategories"
                            :options="expenseCategories"
                            option-label="name"
                            option-value="id"
                            placeholder="Select Categories"
                            :max-selected-labels="1"
                        />
                    </div>
                    <div class="w-full lg:w-1/2 p-2 mb-4 flex flex-col">
                        Premium categories:
                        <MultiSelect
                            v-model="premiumCategories"
                            :options="expenseCategories"
                            option-label="name"
                            option-value="id"
                            placeholder="Select Categories"
                            :max-selected-labels="1"
                        />
                    </div>
                </div>
            </div>
            <div class="w-full max-w-full sm:px-3 mb-6 p-4 bg-gradient-to-tr from-gray-900 to-slate-800 rounded-2xl border border-slate-800">
                <h2 class="font-bold mb-1 text-xl">
                    Actual total balances
                </h2>
                <h3 class="font-bold md:mb-3 text-sm">
                    2024
                </h3>
                <div class="p-2 flex flex-wrap mb-3">
                    <ul class="w-full lg:w-1/4 md:p-2 md:border-r-2">
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2024-01']"
                            month="January"
                        />
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2024-02']"
                            month="February"
                        />
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2024-03']"
                            month="March"
                        />
                    </ul>
                    <ul class="w-full lg:w-1/4 md:p-2 md:border-r-2">
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2024-04']"
                            month="April"
                        />
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2024-05']"
                            month="May"
                        />
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2024-06']"
                            month="June"
                        />
                    </ul>
                    <ul class="w-full lg:w-1/4 md:p-2 md:border-r-2">
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2024-07']"
                            month="July"
                        />
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2024-08']"
                            month="August"
                        />
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2024-09']"
                            month="September"
                        />
                    </ul>
                    <ul class="w-full lg:w-1/4 md:p-2 md:border-r-2">
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2024-10']"
                            month="October"
                        />
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2024-11']"
                            month="November"
                        />
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2024-12']"
                            month="December"
                        />
                    </ul>
                </div>
                <h3 class="font-bold md:mb-3 text-sm">
                    2023
                </h3>
                <div class="p-2 flex flex-wrap">
                    <ul class="w-full lg:w-1/4 md:p-2 md:border-r-2">
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2023-01']"
                            month="January"
                        />
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2023-02']"
                            month="February"
                        />
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2023-03']"
                            month="March"
                        />
                    </ul>
                    <ul class="w-full lg:w-1/4 md:p-2 md:border-r-2">
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2023-04']"
                            month="April"
                        />
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2023-05']"
                            month="May"
                        />
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2023-06']"
                            month="June"
                        />
                    </ul>
                    <ul class="w-full lg:w-1/4 md:p-2 md:border-r-2">
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2023-07']"
                            month="July"
                        />
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2023-08']"
                            month="August"
                        />
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2023-09']"
                            month="September"
                        />
                    </ul>
                    <ul class="w-full lg:w-1/4 md:p-2 md:border-r-2">
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2023-10']"
                            month="October"
                        />
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2023-11']"
                            month="November"
                        />
                        <SpendingSettingsMonthBalanceInput
                            v-model="actualBalances['2023-12']"
                            month="December"
                        />
                    </ul>
                </div>
            </div>

            <div class="w-full text-center md:text-start mb-4">
                <Button
                    size="small"
                    label="Save"
                    @click="handleSave"
                />
            </div>
        </div>
        <template #loading>
            <div class="flex flex-wrap justify-center mb-4">
                <div class="w-full max-w-full px-1 sm:px-3 my-3 sm:w-1/2">
                    <Skeleton width="100%" height="14rem" />
                </div>
                <div class="w-full max-w-full px-1 sm:px-3 my-3 sm:w-1/2">
                    <Skeleton width="100%" height="14rem" />
                </div>
                <div class="w-full max-w-full px-1 sm:px-3 my-3 sm:w-1/2">
                    <Skeleton width="100%" height="14rem" />
                </div>
                <div class="w-full max-w-full px-1 sm:px-3 my-3 sm:w-1/2">
                    <Skeleton width="100%" height="14rem" />
                </div>
            </div>

            <div class="w-full flex justify-center">
                <div class="w-full max-w-full px-1 sm:px-3 mb-3 sm:w-1/2 xl:w-1/4">
                    <Skeleton width="100%" height="8rem" />
                </div>
            </div>

            <div class="w-full flex justify-center">
                <div class="w-full max-w-full px-1 sm:px-3 mb-3 sm:w-1/2">
                    <Skeleton width="100%" height="16rem" />
                </div>
            </div>
        </template>
    </ContentBaseCard>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});

useHead({
    title: 'Spending settings',
});

const { getSpendingSettingsData, getSpendingActualBalances, updateSpendingSettings } = useSpendingSettingsStore();
const { loading, actualBalances, settings }: any = storeToRefs(useSpendingSettingsStore());
const { getTransactionCategories } = useSpendingManagementStore();
const { transactionCategories } = storeToRefs(useSpendingManagementStore());

const basicCategories: any = ref([]);
const premiumCategories: any = ref([]);
const expenseCategories: any = ref([]);

onMounted(async () => {
    await getSpendingSettingsData();
    await getSpendingActualBalances();
    await getTransactionCategories();
    basicCategories.value = settings.value.configs.spending_basic_transaction_categories;
    premiumCategories.value = settings.value.configs.spending_premium_transaction_categories;
    expenseCategories.value = transactionCategories.value.filter(({ transactionType }) => transactionType === 'expense');
});

async function handleSave() {
    const body = {
        configs: {
            ...settings.value.configs,
            spending_basic_transaction_categories: basicCategories.value,
            spending_premium_transaction_categories: premiumCategories.value,
        },
        actualBalances: actualBalances.value,
    };
    await updateSpendingSettings(body);
};
</script>
