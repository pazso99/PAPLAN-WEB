<template>
    <ContentBaseCard
        title="Create transaction"
        nav-back-button
        :loading="loading"
    >
        <form class="p-5">
            <div class="flex flex-col mb-4">
                <label for="status" class="mb-1">Status</label>
                <div class="flex items-center gap-2">
                    <ToggleSwitch
                        v-model="status"
                        input-id="status"
                        :pt="{
                            slider: { class: status ? 'bg-green-600' : 'bg-red-800' },
                        }"
                    />
                    <Tag
                        :value="status ? 'ACTIVE' : 'INACTIVE'"
                        :severity="status ? 'success' : 'danger'"
                    />
                </div>
            </div>

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

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div class="flex flex-col">
                    <label for="transactionCategory" class="mb-1">Transaction category</label>
                    <Select
                        v-model="transactionCategory"
                        input-id="transactionCategory"
                        :options="selectableTransactionCategories"
                        filter
                        option-label="label"
                        option-group-label="label"
                        option-group-children="items"
                        placeholder="Select a category"
                        :pt="{
                            itemGroup: {
                                class: 'p-0',
                            },
                        }"
                    >
                        <template #optiongroup="slotProps">
                            <div class="py-1 text-center">
                                <Tag
                                    class="w-full"
                                    :value="getTransactionTypeLabel(slotProps.option.transactionType)"
                                    :severity="getTransactionTypeColor(slotProps.option.transactionType)"
                                />
                            </div>
                        </template>
                        <template #value="slotProps">
                            <template
                                v-if="slotProps.value"
                            >
                                <Tag
                                    :value="slotProps.value.label"
                                    :severity="slotProps.value.severity"
                                />
                                <Tag
                                    v-if="!slotProps.value.status"
                                    class="ml-3"
                                    severity="danger"
                                >
                                    INACTIVE
                                </Tag>
                            </template>
                            <span v-else>{{ slotProps.placeholder }}</span>
                        </template>
                        <template #option="slotProps">
                            <div class="flex gap-2">
                                <span>{{ slotProps.option.label }}</span>
                                <Tag
                                    v-if="!slotProps.option.status"
                                    severity="danger"
                                >
                                    INACTIVE
                                </Tag>
                            </div>
                        </template>
                    </Select>
                </div>
                <div class="flex flex-col">
                    <label for="account" class="mb-1">Account</label>
                    <Select
                        v-model="account"
                        input-id="account"
                        option-label="name"
                        :options="accounts"
                        placeholder="Select account"
                    >
                        <template #value="slotProps">
                            <div v-if="slotProps.value" class="flex gap-2">
                                <span>{{ slotProps.value.name }}</span>
                                <Tag severity="success">
                                    {{ $formatNumber(slotProps.value.balance) }} Ft
                                </Tag>
                                <Tag
                                    v-if="!slotProps.value.status"
                                    severity="danger"
                                >
                                    INACTIVE
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
                                <Tag
                                    v-if="!slotProps.option.status"
                                    severity="danger"
                                >
                                    INACTIVE
                                </Tag>
                            </div>
                        </template>
                    </Select>
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
                v-if="transactionCategory?.transactionType === 'transfer' && account"
                class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4"
            >
                <div class="flex flex-col">
                    <label for="toAccount" class="mb-1">To Account</label>
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

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                size="small"
                label="Save"
                type="submit"
                :disabled="!isValid"
                @click="save"
            />
        </form>
    </ContentBaseCard>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import type { Account } from '~/types/models';

definePageMeta({
    middleware: 'auth',
    layout: 'admin',
    navBackRoute: '/spending/transactions',
});

useHead({
    title: 'Create Transaction - Spending',
});

const spendingManagementStore = useSpendingManagementStore();
const { createTransaction, getAccounts, getTransactionCategories } = spendingManagementStore;
const { accounts, transactionCategories, loading } = storeToRefs(spendingManagementStore);

const schema = yup.object({
    date: yup.date().required().label('Date'),
    status: yup.boolean().label('Status'),
    amount: yup.number().required().label('Amount'),
    transactionCategory: yup.object().required().label('Transaction category'),
    account: yup.object().required().label('Account'),
    comment: yup.string().label('Comment'),
    toAccount: yup.object().when('transactionCategory.transactionType', {
        is: 'transfer',
        then(schema) {
            return schema.required();
        },
    }).label('To account'),
});

const { defineField, handleSubmit, errors } = useForm({
    validationSchema: schema,
});

const isValid = useIsFormValid();
const [date] = defineField('date');
const [status] = defineField('status');
const [amount] = defineField('amount');
const [comment] = defineField('comment');
const [transactionCategory] = defineField('transactionCategory');
const [account] = defineField('account');
const [toAccount] = defineField('toAccount');

const dayjs = useDayjs();
const toAccounts = ref<Account[]>([]);
watch(account, async (newAccount) => {
    if (toAccount.value?.id === newAccount.id) {
        toAccount.value = null;
    }
    toAccounts.value = accounts.value.filter(account => account.id !== newAccount.id);
});

status.value = true;
date.value = dayjs().format('YYYY-MM-DD');

onMounted(async () => {
    await getAccounts();
    await getTransactionCategories();

    toAccounts.value = accounts.value;

    setTransactionTypeGroups();
});

const save = handleSubmit(async ({ account, amount, date, status, comment, transactionCategory, toAccount }) => {
    const meta: {
        toAccountId?: number;
    } = {};
    if (transactionCategory.transactionType === 'transfer') {
        meta.toAccountId = toAccount.id;
    }

    await createTransaction({
        accountId: account.id,
        transactionCategoryId: transactionCategory.value,
        comment,
        status,
        amount,
        date: dayjs(date).format('YYYY-MM-DD'),
        meta: JSON.stringify(meta),
    });
});

// TODO
const selectableTransactionCategories: any = ref([]);
function setTransactionTypeGroups() {
    const transactionTypeGroups: any = {};
    transactionCategories.value.forEach((item: any) => {
        if (!transactionTypeGroups[item.transactionType]) {
            transactionTypeGroups[item.transactionType] = [];
        }

        transactionTypeGroups[item.transactionType].push({
            status: item.status,
            label: item.name,
            value: item.id,
            transactionType: item.transactionType,
            severity: getTransactionTypeColor(item.transactionType),
        });
    });

    selectableTransactionCategories.value = Object.entries(transactionTypeGroups).map(
        ([transactionType, items]) => ({ transactionType, items }),
    );
}
</script>
