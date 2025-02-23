<template>
    <ContentBaseCard
        title="Edit Transaction"
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
                    <label for="id" class="mb-1">ID</label>
                    <InputNumber
                        v-model="id"
                        input-id="id"
                        disabled
                    />
                </div>
                <div class="flex flex-col mb-4">
                    <label for="createdAt" class="mb-1">Created at</label>
                    <DatePicker
                        v-model="createdAt"
                        input-id="createdAt"
                        disabled
                    />
                </div>
                <div class="flex flex-col mb-4">
                    <label for="updatedAt" class="mb-1">Updated at</label>
                    <DatePicker
                        v-model="updatedAt"
                        input-id="updatedAt"
                        disabled
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
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
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
                        :options="selectableAccounts"
                        placeholder="Select account"
                    >
                        <template #value="slotProps">
                            <template
                                v-if="slotProps.value"
                            >
                                {{ slotProps.value.name }}
                                <Tag
                                    severity="success"
                                    class="ml-2"
                                >
                                    {{ $formatNumber(slotProps.value.balance) }} Ft
                                </Tag>
                                <Tag
                                    v-if="!slotProps.value.status"
                                    class="ml-3"
                                    severity="danger"
                                >
                                    INACTIVE
                                </Tag>
                            </template>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
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
                icon="pi pi-check"
                :disabled="!isValid"
                @click="save"
            />

            <Button
                class="ml-4"
                size="small"
                label="Delete"
                severity="danger"
                icon="pi pi-trash"
                @click="handleDelete"
            />
        </form>
        <ConfirmDialog group="positioned" />
    </ContentBaseCard>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { useConfirm } from 'primevue/useconfirm';
import type { Account, AccountBasic } from '~/types/models';

definePageMeta({
    middleware: 'auth',
    layout: 'admin',
    navBackRoute: '/spending/transactions',
});

useHead({
    title: 'Edit Transaction - Spending',
});

const spendingManagementStore = useSpendingManagementStore();
const { getTransaction, updateTransaction, getAccounts, getTransactionCategories, deleteTransaction } = spendingManagementStore;
const { transaction, accounts, transactionCategories, loading } = storeToRefs(spendingManagementStore);

const schema = yup.object({
    date: yup.date().required().label('Date'),
    status: yup.boolean().label('Status'),
    amount: yup.number().required().label('Amount'),
    transactionCategory: yup.object().required().label('Transaction category'),
    account: yup.object().required().label('Account'),
    comment: yup.string().nullable().label('Comment'),
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
const [id] = defineField('id');
const [date] = defineField('date');
const [status] = defineField('status');
const [amount] = defineField('amount');
const [comment] = defineField('comment');
const [transactionCategory] = defineField('transactionCategory');
const [account] = defineField('account');
const [createdAt] = defineField('createdAt');
const [updatedAt] = defineField('updatedAt');
const [toAccount] = defineField('toAccount');

const toAccounts = ref<Account[]>([]);
watch(account, async (newAccount) => {
    if (toAccount.value?.id === newAccount.id) {
        toAccount.value = null;
    }
    toAccounts.value = accounts.value.filter(account => account.id !== newAccount.id);
});

const routeId = ref();
const route = useRoute();
onMounted(async () => {
    routeId.value = getIdFromRoute(route.params);
    await getTransaction(routeId.value);
    await getTransactionCategories();
    await getAccounts();

    setData();
});

const dayjs = useDayjs();
function setData() {
    id.value = transaction.value.id;
    status.value = transaction.value.status;
    createdAt.value = dayjs(transaction.value.createdAt).format('YYYY-MM-DD HH:mm');
    updatedAt.value = dayjs(transaction.value.updatedAt).format('YYYY-MM-DD HH:mm');
    date.value = dayjs(transaction.value.date).format('YYYY-MM-DD');
    amount.value = transaction.value.amount;
    comment.value = transaction.value.comment;
    account.value = transaction.value.account;

    setTransactionTypeGroups();
    setSelectableAccounts();
    setMeta();
}

const save = handleSubmit(async ({ id, account, amount, date, status, comment, transactionCategory, toAccount }) => {
    const meta: {
        toAccountId?: number;
    } = {};
    if (transactionCategory.transactionType === 'transfer') {
        meta.toAccountId = toAccount.id;
    }

    await updateTransaction({
        id,
        accountId: account.id,
        transactionCategoryId: transactionCategory.value,
        comment,
        status,
        amount,
        date: dayjs(date).format('YYYY-MM-DD'),
        meta: JSON.stringify(meta),
    });
    await getAccounts();
    setData();
});

function setMeta() {
    let meta: any;
    if (transaction.value.meta !== '{}') {
        meta = JSON.parse(transaction.value.meta);
    }
    if (transaction.value.transactionCategory.transactionType === 'transfer') {
        toAccount.value = accounts.value.find((account: any) => account.id === meta.toAccountId);
    }

    toAccounts.value = accounts.value;
}

const selectableAccounts = ref<AccountBasic[]>([]);
function setSelectableAccounts() {
    selectableAccounts.value = accounts.value.map(({ id, status, name, balance }) => ({
        id,
        status,
        name,
        balance,
    }));
}

// TODO
const selectableTransactionCategories: any = ref([]);
function setTransactionTypeGroups() {
    const transactionTypeGroups: any = {};
    transactionCategories.value.forEach((item: any) => {
        if (!transactionTypeGroups[item.transactionType]) {
            transactionTypeGroups[item.transactionType] = [];
        }

        const category = {
            status: item.status,
            label: item.name,
            value: item.id,
            transactionType: item.transactionType,
            severity: getTransactionTypeColor(item.transactionType),
        };
        transactionTypeGroups[item.transactionType].push(category);

        if (transaction.value.transactionCategory.id === item.id) {
            transactionCategory.value = category;
        }
    });

    selectableTransactionCategories.value = Object.entries(transactionTypeGroups).map(
        ([transactionType, items]) => ({ transactionType, items }),
    );
}

const confirm = useConfirm();
function handleDelete() {
    confirm.require({
        message: 'Are you sure you want to delete this item?',
        group: 'positioned',
        header: 'Attention!',
        position: 'center',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'bg-red-400 border-none',
        acceptLabel: 'Delete',
        accept: async () => {
            await deleteTransaction(routeId.value, true);
        },
    });
};
</script>
