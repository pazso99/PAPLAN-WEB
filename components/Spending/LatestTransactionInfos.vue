<template>
    <div class="flex flex-wrap items-center mb-6">
        <h2 class="w-full my-5 text-2xl text-center">Latest transactions</h2>
        <div class="flex flex-col items-center w-full max-w-full px-1 sm:px-3 mb-6 lg:w-full xl:w-2/3">
            <UTable
                class="w-full mb-4"
                :rows="spending.latestTransactions"
                :ui="{
                    td: { padding: 'px-3 py-2' },
                }"
            >
                <template #transaction-header>
                    Transaction
                </template>
                <template #transaction-data="{ row }">
                    <span>{{ row.transaction.date }}: <span class="font-bold">{{ row.transaction.category }}</span> [{{ row.transaction.account }}] <span v-if="row.transaction.comment">({{ row.transaction.comment }})</span></span>
                </template>
                <template #amount-data="{ row }">
                    <span v-if="row.transaction.type === 'income'" class="text-emerald-600">+ {{ $formatNumber(row.amount) }} Ft</span>
                    <span v-else class="text-red-500">- {{ $formatNumber(row.amount) }} Ft</span>
                </template>
            </UTable>

            <UButton
                color="gray"
                size="xs"
                class="w-1/3 justify-center"
                >
                All transactions
            </UButton>
        </div>
        <div class="flex flex-col justify-center w-full max-w-full px-1 sm:px-3 mb-6 lg:w-full xl:w-1/3">
            <div v-for="account in spending.accounts" :key="account.id" class="flex justify-between gap-2 mb-4 p-3">
                <div class="text-center bg-slate-800 rounded-2xl w-4/5 p-3">
                    <h1 class="font-bold">{{ account.name }}</h1>
                    <p class="text-sm">{{ $formatNumber(account.balance) }} Ft</p>
                </div>
                <div class="flex gap-2 justify-center items-center w-1/5">
                    <UButton
                        color="red"
                        icon="i-heroicons-minus"
                        size="md"
                        @click="openNewTransaction(account, 'expense')"
                    ></UButton>
                    <UButton
                        color="green"
                        icon="i-heroicons-plus"
                        size="md"
                        @click="openNewTransaction(account, 'income')"
                    ></UButton>
                </div>
            </div>
        </div>
        <UModal v-model="isNewTransactionModalOpen">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-gray-200">
                            New <span :class="transactionType === 'income' ? 'text-emerald-500' : 'text-red-500'">{{ transactionType }}</span> transaction for <span class="font-bold">{{ selectedAccount.name }}</span>
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="isNewTransactionModalOpen = false" />
                    </div>
                </template>
                <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
                    <UFormGroup name="date" label="Date">
                        <UInput v-model="state.date" type="date" />
                    </UFormGroup>

                    <UFormGroup name="transactionCategory" label="Transaction category">
                        <USelectMenu
                            v-model="state.transactionCategory"
                            :options="filteredTransactionCategories"
                            placeholder="Select transaction category..."
                            searchable
                            searchable-placeholder="Search..."
                            option-attribute="name"
                            by="id"
                            :search-attributes="['name', 'transactionType']"
                        >
                            <template #option="{ option }">
                                <span class="truncate">{{ option.name }}</span>
                            </template>
                        </USelectMenu>
                    </UFormGroup>

                    <UFormGroup name="amount" label="Amount">
                        <UInput v-model="state.amount" type="number" />
                    </UFormGroup>

                    <UFormGroup name="comment" label="Comment">
                        <UInput v-model="state.comment" />
                    </UFormGroup>

                    <UButton type="submit">
                        Save
                    </UButton>
                </UForm>
            </UCard>
        </UModal>
    </div>
</template>

<script setup>
import CountTo from 'vue-count-to/src';

const { spending } = storeToRefs(useDashboardStore());
const { getTransactionCategories } = useSpendingCrudStore();
const { transactionCategories } = storeToRefs(useSpendingCrudStore());

const dayjs = useDayjs();
const selectedAccount = ref(null);
const transactionType = ref(null);
const isNewTransactionModalOpen = ref(false);
const filteredTransactionCategories = ref([]);
const emit = defineEmits(['createTransaction']);

const state = reactive({
    status: true,
    date: dayjs().format('YYYY-MM-DD'),
    amount: '',
    transactionCategory: '',
    accountId: '',
    comment: '',
    meta: "{}"
});

function openNewTransaction(account, type) {
    isNewTransactionModalOpen.value = true;
    selectedAccount.value = account;
    transactionType.value = type;
    state.accountId = account.id;
    state.transactionCategory = '';
    state.amount = '';
    state.comment = '';
    filteredTransactionCategories.value = transactionCategories.value.filter(tc => tc.transactionType === type);
}

onMounted(async () => {
    await getTransactionCategories();
});


const validate = (state) => {
    const errors = [];
    if (!state.date) errors.push({ path: 'date', message: 'Required' });
    if (!state.amount) errors.push({ path: 'amount', message: 'Required' });
    if (!state.transactionCategory) errors.push({ path: 'transactionCategory', message: 'Required' });
    return errors;
}

async function onSubmit(event) {
    const data = {
        ...event.data,
        transactionCategoryId: event.data.transactionCategory.id
    }
    delete data.transactionCategory;

    emit('createTransaction', data)
}
</script>
