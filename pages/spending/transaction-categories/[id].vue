<template>
    <AppContent
        :title="'Edit Transaction Category'"
        :buttons="[
            { icon: 'i-heroicons-arrow-left-20-solid', to: '/spending/transaction-categories' }
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
            <UFormGroup name="name" label="Name">
                <UInput v-model="state.name" />
            </UFormGroup>

            <UFormGroup name="transactionType" label="Transaction type">
                <USelectMenu v-model="state.transactionType" :options="['income', 'expense']" />
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
    title: 'Edit Transaction Category - Spending',
});

const route: any = useRoute();
const { getTransactionCategory, updateTransactionCategory } = useSpendingCrudStore();
const { transactionCategory, loading }: any = storeToRefs(useSpendingCrudStore());

onMounted(async () => {
    await getTransactionCategory(route.params.id);
    state.id = transactionCategory.value.id;
    state.name = transactionCategory.value.name;
    state.status = transactionCategory.value.status;
    state.transactionType = transactionCategory.value.transactionType;
    state.createdAt = transactionCategory.value.createdAt;
    state.updatedAt = transactionCategory.value.updatedAt;
});

const state = reactive({
    id: '',
    name: '',
    status: false,
    transactionType: '',
    createdAt: '',
    updatedAt: '',
});

const validate = (state: any) => {
    const errors = [];
    if (!state.name) errors.push({ path: 'name', message: 'Required' });
    if (!state.transactionType) errors.push({ path: 'transactionType', message: 'Required' });
    return errors;
}

async function onSubmit (event: any) {
    await updateTransactionCategory(event.data);
}
</script>
