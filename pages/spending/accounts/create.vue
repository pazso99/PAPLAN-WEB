<template>
    <AppContent
        :title="'Create account'"
        :buttons="[
            { icon: 'i-heroicons-arrow-left-20-solid', to: '/spending/accounts' }
        ]"
    >
        <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup name="name" label="Name">
                <UInput v-model="state.name" />
            </UFormGroup>

            <UFormGroup name="balance" label="Balance">
                <UInput v-model="state.balance" />
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
    title: 'Create Account - Spending',
});

const { createAccount } = useSpendingCrudStore();

const state = reactive({
    name: '',
    status: false,
    balance: '',
});

const validate = (state: any) => {
    const errors = [];
    if (!state.name) errors.push({ path: 'name', message: 'Required' });
    if (!state.balance) errors.push({ path: 'balance', message: 'Required' });
    return errors;
}

async function onSubmit(event: any) {
    await createAccount(event.data);
}
</script>
