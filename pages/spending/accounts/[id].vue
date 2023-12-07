<template>
    <AppContent
        :title="'Edit account'"
        :buttons="[
            { icon: 'i-heroicons-arrow-left-20-solid', to: '/spending/accounts' }
        ]"
        :loading="loading"
    >
        <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
            <UFormGroup name="id" label="Id">
                <UInput v-model="state.id" disabled />
            </UFormGroup>
            <UFormGroup name="createdAt" label="createdAt">
                <UInput v-model="state.createdAt" disabled />
            </UFormGroup>
            <UFormGroup name="updatedAt" label="updatedAt">
                <UInput v-model="state.updatedAt" disabled />
            </UFormGroup>
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
    title: 'Edit Account - Spending',
});

const route: any = useRoute();
const { getAccount, updateAccount } = useSpendingCrudStore();
const { account, loading }: any = storeToRefs(useSpendingCrudStore());

onMounted(async () => {
    await getAccount(route.params.id);
    state.id = account.value.id;
    state.name = account.value.name;
    state.status = account.value.status;
    state.balance = account.value.balance;
    state.createdAt = account.value.createdAt;
    state.updatedAt = account.value.updatedAt;
});

const state = reactive({
    id: '',
    name: '',
    status: false,
    balance: '',
    createdAt: '',
    updatedAt: '',
});

const validate = (state: any) => {
    const errors = [];
    if (!state.name) errors.push({ path: 'name', message: 'Required' });
    if (!state.balance) errors.push({ path: 'balance', message: 'Required' });
    return errors;
}

async function onSubmit (event: any) {
    await updateAccount(event.data);
}
</script>
