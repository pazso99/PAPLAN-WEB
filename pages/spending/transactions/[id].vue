<template>
    <AppContent
        :title="'Edit Transaction'"
        :buttons="[
            { icon: 'i-heroicons-arrow-left-20-solid', to: '/spending/transactions' }
        ]"
        :loading="loading"
    >
        <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup name="id" label="Id">
                <span class="ml-3 text-sm">{{ state.id }}</span>
            </UFormGroup>

            <UFormGroup name="createdAt" label="createdAt">
                <span class="ml-3 text-sm">{{ $dayjs(state.createdAt).format('YYYY-MM-DD HH:mm') }}</span>
            </UFormGroup>

            <UFormGroup name="updatedAt" label="updatedAt">
                <span class="ml-3 text-sm">{{ $dayjs(state.updatedAt).format('YYYY-MM-DD HH:mm') }}</span>
            </UFormGroup>

            <UFormGroup name="date" label="Date">
                <UInput v-model="state.date" type="date" />
            </UFormGroup>

            <UFormGroup name="account" label="Account">
                <USelectMenu
                    v-model="state.account"
                    :options="accounts"
                    placeholder="Select account..."
                    searchable
                    searchable-placeholder="Search..."
                    option-attribute="name"
                    by="id"
                    :search-attributes="['name']"
                >
                    <template #option="{ option }">
                        <span class="truncate">{{ option.name }} ({{ option.balance }} Ft)</span>
                    </template>
                </USelectMenu>
            </UFormGroup>

            <UFormGroup name="transactionCategory" label="Transaction category">
                <USelectMenu
                    v-model="state.transactionCategory"
                    :options="transactionCategories"
                    placeholder="Select transaction category..."
                    searchable
                    searchable-placeholder="Search..."
                    option-attribute="name"
                    by="id"
                    :search-attributes="['name', 'transactionType']"
                >
                    <template #option="{ option }">
                        <span v-if="option.transactionType === 'income'" class="text-green-500">+</span>
                        <span v-else-if="option.transactionType === 'expense'" class="text-red-500">-</span>
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

            <UFormGroup name="status" label="Status">
                <UToggle v-model="state.status" />
            </UFormGroup>

            <UButton type="submit">
                Save
            </UButton>
        </UForm>
    </AppContent>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
    layout: 'admin'
});
useHead({
    title: 'Edit Transaction - Spending',
});

const route: any = useRoute();
const { getTransaction, updateTransaction, getAccounts, getTransactionCategories } = useSpendingCrudStore();
const { transaction, accounts, transactionCategories, loading }: any = storeToRefs(useSpendingCrudStore());

const dayjs = useDayjs();

onMounted(async () => {
    await getTransaction(route.params.id);
    await getAccounts();
    await getTransactionCategories();
    state.id = transaction.value.id;
    state.date = transaction.value.date;
    state.status = transaction.value.status;
    state.amount = transaction.value.amount;
    state.comment = transaction.value.comment;
    state.meta = transaction.value.meta;
    state.account = transaction.value.account;
    state.transactionCategory = transaction.value.transactionCategory;
    state.createdAt = transaction.value.createdAt;
    state.updatedAt = transaction.value.updatedAt;
});

const state = reactive({
    id: '',
    createdAt: '',
    updatedAt: '',
    status: false,
    date: dayjs().format('YYYY-MM-DD'),
    amount: '',
    account: '',
    transactionCategory: '',
    comment: '',
    meta: "{}"
});

const validate = (state: any) => {
    const errors = [];
    if (!state.date) errors.push({ path: 'date', message: 'Required' });
    if (!state.amount) errors.push({ path: 'amount', message: 'Required' });
    if (!state.account) errors.push({ path: 'account', message: 'Required' });
    if (!state.transactionCategory) errors.push({ path: 'transactionCategory', message: 'Required' });
    return errors;
}

async function onSubmit(event: any) {
    const body = {
        ...event.data,
        accountId: event.data.account.id,
        transactionCategoryId: event.data.transactionCategory.id
    }
    delete body.account;
    delete body.transactionCategory;

    await updateTransaction(body);
}
</script>
