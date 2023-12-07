<template>
    <div class="relative flex flex-col min-w-0 break-words bg-transparent border-0 shadow-none lg:py4 dark:bg-slate-850 rounded-2xl bg-clip-border">
        <div class="p-6 pb-0 mb-0">
            <h1 class="font-bold text-4xl text-center text-transparent bg-clip-text bg-gradient-to-r to-cyan-100 from-blue-800">PAPLAN</h1>
        </div>

        <UDivider class="mt-6">
            <div class="h-2 w-2 rounded-full bg-blue-400" />
        </UDivider>

        <UForm :validate="validate" :state="state" class="flex-auto p-6" @submit="onSubmit">
            <UFormGroup name="name" label="Name" class="mb-4">
                <UInput v-model="state.name" />
            </UFormGroup>

            <UFormGroup name="password" label="Password" class="mb-4">
                <UInput v-model="state.password" type="password"/>
            </UFormGroup>

            <UButton :disabled="disabled" type="submit" block>
                Login
            </UButton>
        </UForm>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
    layout: 'auth',
});
useHead({
    title: 'Login',
});
const { login } = useAuthStore();

const router = useRouter();
const disabled = ref(false);
const state = reactive({
    name: '',
    password: ''
});

const validate = (state: any) => {
    const errors = [];
    if (!state.name) errors.push({ path: 'name', message: 'Required' });
    if (!state.password) errors.push({ path: 'password', message: 'Required' });
    return errors;
}

async function onSubmit(event: any) {
    try {
        disabled.value = true;
        await login(event.data);
        router.push('/');
    } catch (err) {
        disabled.value = false;
    }
}
</script>
