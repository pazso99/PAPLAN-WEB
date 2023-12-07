<template>
    <AppContent
        :title="'Create transaction category'"
        :buttons="[
            { icon: 'i-heroicons-arrow-left-20-solid', to: '/spending/transaction-categories' }
        ]"
    >
        <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
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
    title: 'Create Transaction Category - Spending',
});

const { createTransactionCategory } = useSpendingCrudStore();

const state = reactive({
    name: '',
    status: false,
    transactionType: '',
});

const validate = (state: any) => {
    const errors = [];
    if (!state.name) errors.push({ path: 'name', message: 'Required' });
    if (!state.transactionType) errors.push({ path: 'transactionType', message: 'Required' });
    return errors;
}

async function onSubmit(event: any) {
    await createTransactionCategory(event.data);
}
</script>
