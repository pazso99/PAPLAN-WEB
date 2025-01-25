<template>
    <div
        class="flex flex-wrap justify-center mb-4"
    >
        <NuxtLink
            v-if="spendingDashboardData.accounts.length === 0"
            :to="{ name: 'spending-accounts-create', query: { from: '/spending' } }"
            class="w-full max-w-full px-1 sm:px-3 my-3 sm:w-1/3 xl:w-1/5 flex justify-center p-4 text-center bg-gradient-to-tr from-gray-900 to-slate-800 rounded-2xl"
        >
            + Add accounts
        </NuxtLink>
        <div
            v-for="account in spendingDashboardData.accounts"
            v-else
            :key="account.name"
            class="w-full max-w-full px-1 sm:px-3 my-3 sm:w-1/2 xl:w-1/4"
        >
            <Fieldset
                :pt="{
                    legend: { class: '!p-0 mb-2' },
                }"
                class="!bg-gradient-to-tr !from-slate-800 !to-gray-900"
            >
                <template #legend>
                    <NuxtLink
                        v-if="account.id > 0"
                        :to="{ name: 'spending-accounts-id', params: { id: account.id }, query: { from: '/spending' } }"
                    >
                        <span class="py-1 px-2 rounded !bg-gradient-to-tl !from-blue-900 !to-blue-800">{{ account.name }}</span>
                    </NuxtLink>
                    <span v-else class="py-1 px-2 rounded !bg-gradient-to-tl !from-red-900 !to-red-800">{{ account.name }}</span>
                </template>
                <CountTo
                    class="mb-2 text-3xl font-bold"
                    :start-val="0"
                    :end-val="account.balance"
                    :duration="200"
                /> Ft
                <NuxtLink
                    class="block"
                    :to="{ name: 'spending-transactions', query: { account: account.name } }"
                >
                    <span
                        :class="account.profit < 0 ? 'text-red-500' : 'text-emerald-500'"
                    >
                        <template v-if="account.profit > 0">+</template>
                        <CountTo
                            :start-val="0"
                            :end-val="account.profit"
                            :duration="200"
                        /> Ft
                    </span>
                    <span class="text-slate-500">in {{ spendingSelectedDate }}</span>
                </NuxtLink>
                <div class="flex justify-between mt-4">
                    <SplitButton
                        :model="quickTransactionItems"
                        size="small"
                        label="Expense"
                        rounded
                        @click="openNewTransaction('expense', account, 'danger')"
                    >
                        <template #item="{ item }">
                            <Tag
                                class="px-2 py-1 w-full rounded-none flex !justify-start cursor-pointer"
                                :severity="item.severity"
                                @click="openNewTransaction(item.type, account, item.severity)"
                            >
                                <span class="text-sm">{{ item.label }}</span>
                            </Tag>
                        </template>
                    </SplitButton>
                    <div class="flex gap-2">
                        <NuxtLink
                            :to="{ name: 'spending-transactions', query: { account: account.name, type: 'income,transfer' } }"
                        >
                            <Tag severity="success">
                                {{ $formatNumber(account.income) }} Ft
                            </Tag>
                        </NuxtLink>

                        <NuxtLink
                            :to="{ name: 'spending-transactions', query: { account: account.name, type: 'expense,transfer' } }"
                        >
                            <Tag severity="danger">
                                {{ $formatNumber(account.expense) }} Ft
                            </Tag>
                        </NuxtLink>
                    </div>
                </div>
            </Fieldset>
        </div>

        <div
            v-if="spendingDashboardData.accounts.length > 1"
            class="w-full flex justify-center"
        >
            <div class="w-full max-w-full px-1 sm:px-3 mb-3 sm:w-1/2 xl:w-1/4">
                <Fieldset
                    :pt="{
                        legend: { class: '!p-0 mb-2' },
                    }"
                    class="!bg-gradient-to-tr !from-gray-900 !to-green-950 !border-green-950">
                    <template #legend>
                        <span class="py-1 px-2 rounded !bg-gradient-to-tl !from-green-900 !to-green-700">Total</span>
                    </template>
                    <CountTo
                        class="mb-2 text-3xl font-bold"
                        :start-val="0"
                        :end-val="spendingDashboardData.totals.balance"
                        :duration="200"
                    /> Ft
                    <NuxtLink
                        class="block"
                        :to="{ name: 'spending-transactions', query: { type: 'income,expense,transfer' } }"
                    >
                        <span
                            :class="spendingDashboardData.totals.profit < 0 ? 'text-red-500' : 'text-emerald-500'"
                        >
                            <template v-if="spendingDashboardData.totals.profit > 0">+</template>
                            <CountTo
                                :start-val="0"
                                :end-val="spendingDashboardData.totals.profit"
                                :duration="200"
                            /> Ft
                        </span>
                        <span class="text-slate-500">in {{ spendingSelectedDate }}</span>
                    </NuxtLink>
                    <div class="flex justify-end gap-2 mt-2">
                        <NuxtLink
                            :to="{ name: 'spending-transactions', query: { type: 'income,transfer' } }"
                        >
                            <Tag severity="success">
                                {{ $formatNumber(spendingDashboardData.totals.income) }} Ft
                            </Tag>
                        </NuxtLink>

                        <NuxtLink
                            :to="{ name: 'spending-transactions', query: { type: 'expense,transfer' } }"
                        >
                            <Tag severity="danger">
                                {{ $formatNumber(spendingDashboardData.totals.expense) }} Ft
                            </Tag>
                        </NuxtLink>
                    </div>
                </Fieldset>
            </div>
        </div>

        <Dialog
            v-model:visible="newTransactionModalOpen"
            modal
            class="w-full md:w-[50rem]"
        >
            <template #header>
                <div>
                    New
                    <Tag
                        :severity="selectedAccount!.severity"
                        :value="transactionType"
                    />
                    transaction
                    {{ transactionType === 'transfer' ? 'from' : 'for' }}
                    <span class="font-bold">{{ selectedAccount!.name }}</span>
                </div>
            </template>
            <form class="p-5">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div class="flex flex-col mb-4">
                        <label for="date" class="mb-1">Date</label>
                        <DatePicker
                            v-model="date"
                            input-id="date"
                            date-format="yy-mm-dd"
                        />
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div class="flex flex-col">
                        <label for="transactionCategory" class="mb-1">Transaction category</label>
                        <NuxtLink
                            v-if="filteredTransactionCategories!.length === 0"
                            :to="{ name: 'spending-transaction-categories-create', query: { from: '/spending' } }"
                            class="bg-black p-2 border border-stone-600 rounded-md"
                        >
                            + Add new transaction category
                        </NuxtLink>
                        <Select
                            v-else
                            v-model="transactionCategory"
                            input-id="transactionCategory"
                            :options="filteredTransactionCategories"
                            filter
                            option-label="name"
                            placeholder="Select a category"
                        />
                    </div>
                    <div class="flex flex-col">
                        <label for="amount" class="mb-1">Amount</label>
                        <InputNumber
                            v-model="amount"
                            input-id="amount"
                            suffix=" Ft"
                            placeholder="Amount..."
                            :class="{ 'p-invalid': errors.amount }"
                        />
                        <small class="p-error">{{ errors.amount }}</small>
                    </div>
                </div>

                <div
                    v-if="transactionType === 'transfer' && filteredTransactionCategories!.length !== 0"
                    class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
                >
                    <div class="flex flex-col">
                        <label for="toAccount" class="mb-1">To account</label>
                        <Select
                            v-model="toAccount"
                            input-id="toAccount"
                            option-label="name"
                            :options="toAccounts"
                            placeholder="Select account"
                        >
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex gap-2">
                                    <span>{{ slotProps.value.name }}</span>
                                    <Tag severity="success">
                                        {{ $formatNumber(slotProps.value.balance) }} Ft
                                    </Tag>
                                </div>
                                <span v-else>{{ slotProps.placeholder }}</span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex gap-2">
                                    <span>{{ slotProps.option.name }}</span>
                                    <Tag severity="success">
                                        {{ $formatNumber(slotProps.option.balance) }} Ft
                                    </Tag>
                                </div>
                            </template>
                        </Select>
                    </div>
                </div>

                <div class="grid grid-cols-1 gap-4 mb-4">
                    <div class="flex flex-col">
                        <label for="comment" class="mb-1">Comment</label>
                        <Textarea
                            v-model="comment"
                            input-id="comment"
                            rows="5"
                            cols="30"
                        />
                    </div>
                </div>

                <Button
                    label="Save"
                    type="submit"
                    :disabled="!isValid"
                    @click="emitSave"
                />
            </form>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import CountTo from 'vue-count-to/src';
import * as yup from 'yup';
import type { SpendingTransactionCreateRequest } from '~/types/requests';
import type { Account, AccountBasic, TransactionCategory } from '~/types/models';
import type { TransactionType } from '~/types/types';

const emit = defineEmits<{
    (e: 'createTransaction', data: SpendingTransactionCreateRequest): void;
}>();

const spendingDashboardStore = useSpendingDashboardStore();
const spendingManagementStore = useSpendingManagementStore();
const { spendingDashboardData, spendingSelectedDate } = storeToRefs(spendingDashboardStore);
const { getTransactionCategories, getAccounts } = spendingManagementStore;
const { transactionCategories, accounts } = storeToRefs(spendingManagementStore);

onMounted(async () => {
    await getAccounts();
    await getTransactionCategories();
});

const quickTransactionItems = ref<{
    type: TransactionType;
    label: string;
    severity: string;
}[]>([
    {
        type: 'income',
        label: 'Income',
        severity: 'success',
    },
    {
        type: 'transfer',
        label: 'Transfer',
        severity: 'warn',
    },
]);

const newTransactionModalOpen = ref(false);
const selectedAccount = ref<{
    id: number;
    balance: number;
    name: string;
    severity: string;
}>();

const schema = yup.object({
    date: yup.date().required().label('Date'),
    amount: yup.number().min(1).required().label('Amount'),
    comment: yup.string().label('Comment'),
    transactionCategory: yup.object().required().label('Transaction category'),
    toAccount: yup.object().when('transactionCategory.type', {
        is: 'transfer',
        then(schema) {
            return schema.required();
        },
    }).label('To account'),
});

const { defineField, handleSubmit, errors, resetForm } = useForm({
    validationSchema: schema,
});

const isValid = useIsFormValid();
const [date] = defineField('date');
const [amount] = defineField('amount');
const [comment] = defineField('comment');
const [transactionCategory] = defineField('transactionCategory');
const [toAccount] = defineField('toAccount');

const filteredTransactionCategories = ref<TransactionCategory[]>();
const toAccounts = ref<Account[]>();
const transactionType = ref<string>();

function openNewTransaction(type: TransactionType, account: AccountBasic, severity: string) {
    newTransactionModalOpen.value = true;
    selectedAccount.value = {
        ...account,
        severity,
    };
    filteredTransactionCategories.value = transactionCategories.value.filter(
        ({ status, transactionType }) => status && transactionType === type,
    );

    transactionType.value = type;
    toAccounts.value = accounts.value.filter(acc => acc.status && acc.id !== account.id);

    resetForm({
        values: {
            date: dayjs().format('YYYY-MM-DD'),
        },
    });
};

const dayjs = useDayjs();
const emitSave = handleSubmit(async ({ amount, comment, date }) => {
    const meta: {
        toAccountId?: number; // TODO meta t type
    } = {};
    if (transactionType.value === 'transfer') {
        meta.toAccountId = toAccount.value.id;
    }

    emit('createTransaction', {
        status: true,
        amount,
        comment,
        date: dayjs(date).format('YYYY-MM-DD'),
        accountId: selectedAccount.value!.id,
        transactionCategoryId: transactionCategory.value.id,
        meta: JSON.stringify(meta),
    });
    newTransactionModalOpen.value = false;
});
</script>

<style lang="scss" scoped>
:deep(.p-splitbutton) {
    .p-button {
        padding: 2px 8px;
        background: rgba(239, 68, 68, 0.16);
        border-color: #ef4444;
        color: #ef4444;
    }

    .p-splitbutton-dropdown {
        width: 30px;
    }
}
</style>
