<template>
    <div class="flex flex-wrap justify-center mb-4">
        <div
            v-for="account in spending.accounts"
            :key="account.name"
            class="w-full max-w-full px-1 sm:px-3 my-3 sm:w-1/2 xl:w-1/4"
        >
            <Fieldset class="bg-gradient-to-tr from-slate-800 to-gray-900">
                <template #legend>
                    <NuxtLink :to="`/spending/accounts/${account.id}`">
                        <span class="py-1 px-2 rounded bg-gradient-to-tl from-blue-900 to-blue-800">{{ account.name }}</span>
                    </NuxtLink>
                </template>
                <CountTo
                    class="mb-2 text-3xl font-bold"
                    :start-val="0"
                    :end-val="account.balance"
                    :duration="200"
                /> Ft
                <div>
                    <span
                        :class="account.profit < 0 ? 'text-red-500': 'text-emerald-500'"
                    >
                        <template v-if="account.profit > 0">+</template>
                        <CountTo
                            :start-val="0"
                            :end-val="account.profit"
                            :duration="200"
                        /> Ft
                    </span>
                    <span class="text-slate-500">in {{ spendingSelectedDate }}</span>
                </div>
                <div class="flex justify-between mt-4">
                    <SplitButton
                        :model="items"
                        size="small"
                        label="Expense"
                        rounded
                        @click="openNewTransaction('expense', account, 'danger')"
                    >
                        <template #item="{ item }">
                            <Tag
                                class="px-2 py-1 w-full rounded-none flex justify-start cursor-pointer"
                                :severity="item.severity"
                                @click="openNewTransaction(item.key, account, item.severity)"
                            >
                                <span class="text-sm">{{ item.label }}</span>
                            </Tag>
                        </template>
                    </SplitButton>
                    <div class="flex gap-2">
                        <Tag severity="success">{{ $formatNumber(account.income) }} Ft</Tag>
                        <Tag severity="danger">{{ $formatNumber(account.expense) }} Ft</Tag>
                    </div>
                </div>
            </Fieldset>
        </div>

        <div class="w-full flex justify-center">
            <div class="w-full max-w-full px-1 sm:px-3 mb-3 sm:w-1/2 xl:w-1/4">
                <Fieldset class="bg-gradient-to-tr from-gray-900 to-green-950 border-green-950">
                    <template #legend>
                        <span class="py-1 px-2 rounded bg-gradient-to-tl from-green-900 to-green-700">Total</span>
                    </template>
                    <CountTo
                        class="mb-2 text-3xl font-bold"
                        :start-val="0"
                        :end-val="spending.totals.balance"
                        :duration="200"
                    /> Ft
                    <div>
                        <span
                            :class="spending.totals.profit < 0 ? 'text-red-500': 'text-emerald-500'"
                        >
                            <template v-if="spending.totals.profit > 0">+</template>
                            <CountTo
                                :start-val="0"
                                :end-val="spending.totals.profit"
                                :duration="200"
                            /> Ft
                        </span>
                        <span class="text-slate-500">in {{ spendingSelectedDate }}</span>
                    </div>
                    <div class="flex justify-end gap-2 mt-2">
                        <Tag severity="success">{{ $formatNumber(spending.totals.allIncome) }} Ft</Tag>
                        <Tag severity="danger">{{ $formatNumber(spending.totals.allExpense) }} Ft</Tag>
                    </div>
                </Fieldset>
            </div>
        </div>

        <Dialog
            v-model:visible="newTransactionModalOpen"
            modal
            class="w-[50rem]"
        >
            <template #header>
                <div>
                    New
                    <Tag
                        :severity="selectedAccount.severity"
                        :value="transactionType"
                    />
                    transaction for
                    <span class="font-bold">{{ selectedAccount.name }}</span>
                </div>
            </template>
            <form class="p-5">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div class="flex flex-col mb-4">
                        <label for="date" class="mb-1">Date</label>
                        <Calendar
                            id="date"
                            v-model="date"
                            dateFormat="yy-mm-dd"
                        />
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div class="flex flex-col">
                        <label for="transactionCategory" class="mb-1">Transaction category</label>
                        <Dropdown
                            v-model="transactionCategory"
                            id="transactionCategory"
                            :options="filteredTransactionCategories"
                            filter
                            optionLabel="name"
                            placeholder="Select a category"
                        />
                    </div>
                    <div class="flex flex-col">
                        <label for="amount" class="mb-1">Amount</label>
                        <InputNumber
                            id="amount"
                            v-model="amount"
                            suffix=" Ft"
                            placeholder="Amount..."
                            integeronly
                            :class="{ 'p-invalid': errors.amount }"
                        />
                        <small class="p-error">{{ errors.amount }}</small>
                    </div>
                </div>

                <div class="grid grid-cols-1 gap-4 mb-4">
                    <div class="flex flex-col">
                        <label for="comment" class="mb-1">Comment</label>
                        <Textarea
                            id="comment"
                            v-model="comment"
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

<script setup>
import CountTo from 'vue-count-to/src';
import * as yup from 'yup';

const { spending, spendingSelectedDate } = storeToRefs(useDashboardStore());
const { getTransactionCategories } = useSpendingCrudStore();
const { transactionCategories } = storeToRefs(useSpendingCrudStore());

const dayjs = useDayjs();
const newTransactionModalOpen = ref(false);
const selectedAccount = ref(null);
const transactionType = ref(null);
const filteredTransactionCategories = ref([]);

const schema = yup.object({
    date: yup.date().required().label('Date'),
    amount: yup.number().min(1).required().label('Amount'),
    comment: yup.string().label('Comment'),
    transactionCategory: yup.object().required().label('Transaction category'),
});

const { defineField, handleSubmit, errors, resetForm } = useForm({
    validationSchema: schema,
});

const isValid = useIsFormValid();
const [date] = defineField('date');
const [amount] = defineField('amount');
const [comment] = defineField('comment');
const [transactionCategory] = defineField('transactionCategory');

function openNewTransaction(type, account, severity) {
    newTransactionModalOpen.value = true;
    selectedAccount.value = {
        ...account, severity
    };
    filteredTransactionCategories.value = transactionCategories.value
        .filter(({ transactionType }) => transactionType === type);
    transactionType.value = type;
    resetForm({
        values: {
            date: dayjs().format('YYYY-MM-DD')
        },
    });
}

const items = [
    {
        key: 'income',
        label: 'Income',
        severity: 'success'
    },
    /* {
        key: 'transfer',
        label: 'Transfer',
        severity: 'warning'
    }, */
];

onMounted(async () => {
    await getTransactionCategories();
});

const emit = defineEmits(['createTransaction']);
const emitSave = handleSubmit(async (data) => {
    emit('createTransaction', {
        ...data,
        status: true,
        date: dayjs(data.date).format('YYYY-MM-DD'),
        accountId: selectedAccount.value.id,
        transactionType: transactionType.value,
        transactionCategoryId: transactionCategory.value.id,
        meta: '{}',
    });
    newTransactionModalOpen.value = false;
});
</script>

<style lang="scss" scoped>
:deep(.p-splitbutton) {
    .p-button {
        padding: 2px 10px;
        background: rgba(239, 68, 68, 0.16);
        border: 1px solid #ef4444;
        color: #ef4444;
    }
}
</style>
