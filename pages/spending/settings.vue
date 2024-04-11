<template>
    <ContentBaseCard
        title="Spending settings"
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

                <Button
                    size="small"
                    label="Save"
                    @click="handleSave"
                />
            </div>
            <div class="w-full max-w-full sm:px-3 mb-6 p-4 bg-gradient-to-tr from-gray-900 to-slate-800 rounded-2xl border border-slate-800">
                <h2 class="font-bold mb-1 text-xl">
                    Monthly data
                </h2>
                <div class="flex flex-wrap flex-col md:flex-row">
                    <div
                        v-for="(monthMetadata, index) in monthlyMetadata"
                        :key="monthMetadata.id"
                        class="p-2 w-full xl:w-1/2"
                    >
                        <Panel
                            class="w-full"
                            toggleable
                            collapsed
                            :pt="{
                                icons: { class: 'self-start' },
                            }"
                        >
                            <template #header>
                                <div class="w-full flex flex-col md:flex-row">
                                    <div class="w-full lg:w-1/2 flex flex-col">
                                        <p class="text-xl font-bold mb-2">
                                            {{ monthMetadata.year }}-{{ monthMetadata.month }}
                                        </p>
                                        <div>
                                            <label for="totalBalance" class="block mb-1">Total balance:</label>
                                            <InputNumber
                                                v-model="monthMetadata.totalBalance"
                                                input-id="totalBalance"
                                                suffix=" Ft"
                                                class="w-40"
                                            />
                                        </div>
                                    </div>
                                    <div class="w-full lg:w-1/2 flex items-start justify-end mr-4">
                                        <Button
                                            v-if="monthlyMetadata.length - 1 !== index"
                                            class="p-0"
                                            icon="pi pi-calculator"
                                            text
                                            @click="confirmCalculateMonthMetadata(monthMetadata.year, monthMetadata.month)"
                                        />
                                        <Button
                                            class="p-0"
                                            icon="pi pi-check"
                                            severity="success"
                                            text
                                            @click="handleMonthMetadataSave(monthMetadata)"
                                        />
                                        <Button
                                            class="p-0"
                                            icon="pi pi-eye"
                                            severity="contrast"
                                            text
                                            @click="openMonthMetadataAccountsModal(monthMetadata.accounts)"
                                        />
                                    </div>
                                </div>
                            </template>
                            <Divider align="center">
                                <span class="pi pi-objects-column" />
                            </Divider>
                            <div class="flex flex-wrap flex-col md:flex-row">
                                <div class="w-full lg:w-1/2 flex flex-col">
                                    <div class="mb-2">
                                        <label for="totalIncome" class="block mb-1">Total income:</label>
                                        <InputNumber
                                            v-model="monthMetadata.totalIncome"
                                            input-id="totalIncome"
                                            suffix=" Ft"
                                            class="w-40"
                                        />
                                    </div>
                                    <div class="mb-2">
                                        <label for="totalBasicExpense" class="block mb-1">Total basic expense:</label>
                                        <InputNumber
                                            v-model="monthMetadata.totalBasicExpense"
                                            input-id="totalBasicExpense"
                                            suffix=" Ft"
                                            class="w-40"
                                        />
                                    </div>
                                    <div class="mb-2">
                                        <label for="totalPremiumExpense" class="block mb-1">Total premium expense:</label>
                                        <InputNumber
                                            v-model="monthMetadata.totalPremiumExpense"
                                            input-id="totalPremiumExpense"
                                            suffix=" Ft"
                                            class="w-40"
                                        />
                                    </div>
                                </div>
                                <div class="w-full lg:w-1/2 flex justify-center items-center">
                                    PLACEHOLDER
                                </div>
                            </div>
                        </Panel>
                    </div>
                </div>
            </div>
            <Dialog
                v-model:visible="isMonthMetadataAccountsModal"
                modal
                header="Accounts"
                :style="{ width: '50rem' }"
            >
                <div
                    v-for="accountMetadata in selectedMonthMetadataAccounts"
                    :key="accountMetadata.id"
                >
                    <Divider align="center">
                        <p class="text-xl font-bold">
                            {{ accountMetadata.accountName }}
                        </p>
                    </Divider>
                    <div class="w-full flex flex-col md:flex-row mb-4">
                        <div class="w-full lg:w-1/4 flex flex-col">
                            <label for="balance" class="block mb-1">Balance:</label>
                            <InputNumber
                                v-model="accountMetadata.balance"
                                input-id="balance"
                                :pt=" { input: { class: 'w-40' } }"
                                class="w-40"
                                suffix=" Ft"
                            />
                        </div>
                        <div class="w-full lg:w-1/4 flex flex-col">
                            <label for="income" class="block mb-1">Income:</label>
                            <InputNumber
                                v-model="accountMetadata.income"
                                input-id="income"
                                suffix=" Ft"
                                class="w-40"
                            />
                        </div>
                        <div class="w-full lg:w-1/4 flex flex-col">
                            <label for="basicExpense" class="block mb-1">Basic expense:</label>
                            <InputNumber
                                v-model="accountMetadata.basicExpense"
                                input-id="basicExpense"
                                suffix=" Ft"
                                class="w-40"
                            />
                        </div>
                        <div class="w-full lg:w-1/4 flex flex-col">
                            <label for="premiumExpense" class="block mb-1">Premium expense:</label>
                            <InputNumber
                                v-model="accountMetadata.premiumExpense"
                                input-id="premiumExpense"
                                suffix=" Ft"
                                class="w-40"
                            />
                        </div>
                    </div>
                </div>

                <template #footer>
                    <Button
                        type="button"
                        label="OK"
                        @click="isMonthMetadataAccountsModal = false"
                    />
                </template>
            </Dialog>
            <ConfirmDialog group="positioned" />
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
import { useConfirm } from 'primevue/useconfirm';
import type { TransactionCategory } from '~/types/models';
import type { SpendingMonthlyMetadata, SpendingMonthlyMetadataAccount } from '~/types/types';

definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});

useHead({
    title: 'Spending settings',
});

const spendingSettingsStore = useSpendingSettingsStore();
const spendingManagementStore = useSpendingManagementStore();
const {
    getSpendingSettingsData,
    updateSpendingSettings,
    getMonthsMetadata,
    updateMonthMetadata,
    calculateMonthMetadata,
} = spendingSettingsStore;
const { loading, settings, monthlyMetadata } = storeToRefs(spendingSettingsStore);
const { getTransactionCategories } = spendingManagementStore;
const { transactionCategories } = storeToRefs(spendingManagementStore);

const basicCategories = ref<number[]>([]);
const premiumCategories = ref<number[]>([]);
const expenseCategories = ref<TransactionCategory[]>([]);

const selectedMonthMetadataAccounts = ref<SpendingMonthlyMetadataAccount[]>([]);
onMounted(async () => {
    await getSpendingSettingsData();
    await getTransactionCategories();
    await getMonthsMetadata();
    basicCategories.value = settings.value.configs.spending_basic_transaction_categories;
    premiumCategories.value = settings.value.configs.spending_premium_transaction_categories;
    expenseCategories.value = transactionCategories.value.filter(({ transactionType }) => transactionType === 'expense');
});

async function handleSave() {
    await updateSpendingSettings({
        configs: {
            ...settings.value.configs,
            spending_basic_transaction_categories: basicCategories.value,
            spending_premium_transaction_categories: premiumCategories.value,
        },
    });
};

async function openMonthMetadataAccountsModal(accounts: SpendingMonthlyMetadataAccount[]) {
    selectedMonthMetadataAccounts.value = accounts;
    isMonthMetadataAccountsModal.value = true;
};

const isMonthMetadataAccountsModal = ref(false);

async function handleMonthMetadataSave(monthMetadata: SpendingMonthlyMetadata) {
    const data = {
        id: monthMetadata.id,
        year: monthMetadata.year,
        month: monthMetadata.month,
        totalBalance: monthMetadata.totalBalance,
        totalIncome: monthMetadata.totalIncome,
        totalBasicExpense: monthMetadata.totalBasicExpense,
        totalPremiumExpense: monthMetadata.totalPremiumExpense,
        accounts: monthMetadata.accounts.map(account => ({
            id: account.id,
            balance: account.balance,
            income: account.income,
            basicExpense: account.basicExpense,
            premiumExpense: account.premiumExpense,
        })),
    };
    await updateMonthMetadata(data);
    await getMonthsMetadata();
};

const confirm = useConfirm();
function confirmCalculateMonthMetadata(year: string, month: string) {
    confirm.require({
        message: 'Are you sure you want to recalculate this month?',
        group: 'positioned',
        header: 'Attention!',
        position: 'bottom',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'bg-blue-400 border-none',
        acceptLabel: 'Calculate',
        accept: async () => {
            await calculateMonthMetadata({
                year,
                month,
            });
            await getMonthsMetadata();
        },
    });
};
</script>

<style lang="scss" scoped>
:deep(.p-inputnumber-input) {
    width: 100%;
}
</style>
