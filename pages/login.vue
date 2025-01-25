<template>
    <div class="flex flex-col items-center">
        <div class="p-6 pb-0 mb-0">
            <h1 class="font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r to-cyan-100 from-blue-800">
                PAPLAN
            </h1>
        </div>
        <Divider class="mt-6">
            <div class="h-2 w-2 rounded-full bg-blue-400" />
        </Divider>
        <form @submit.prevent="onSubmit">
            <div class="mb-4">
                <IconField icon-position="left">
                    <InputIcon>
                        <i class="pi pi-user" />
                    </InputIcon>
                    <InputText
                        v-model="name"
                        name="name"
                        :class="{ 'p-invalid': errors.name }"
                        placeholder="Username"
                    />
                </IconField>
                <small class="p-error">
                    {{ errors.name }}
                </small>
            </div>
            <div class="mb-4 flex flex-col">
                <Password
                    v-model="password"
                    :class="{ 'p-invalid': errors.password }"
                    name="password"
                    placeholder="Password"
                    toggle-mask
                    :feedback="false"
                />
                <small class="p-error">
                    {{ errors.password }}
                </small>
            </div>
            <Button
                type="submit"
                label="Login"
                class="w-full"
                :disabled="!isValid"
            />
        </form>
    </div>
</template>

<script setup lang="ts">
import * as yup from 'yup';

definePageMeta({
    middleware: 'auth',
    layout: 'auth',
});

useHead({
    title: 'Login',
});

const toast = useToast();
const route = useRoute();
const router = useRouter();

onMounted(() => {
    nextTick(() => {
        if (route.query.expired == '1') {
            toast.add({ severity: 'error', summary: 'Error!', detail: 'Token expired!', life: 3000 });
            router.push({ query: {} });
        }
    });
});

const schema = yup.object({
    name: yup.string().required().label('Name'),
    password: yup.string().required().label('Password'),
});
const { defineField, handleSubmit, errors, resetForm } = useForm({
    validationSchema: schema,
});
const isValid = useIsFormValid();
const [name] = defineField('name');
const [password] = defineField('password');

const { login } = useAuthStore();
const onSubmit = handleSubmit(async ({ name, password }) => {
    resetForm();
    await login({
        name,
        password,
    });
});
</script>
