<template>
    <ContentBaseCard
        title="Create account"
        nav-back-button
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
                <div class="flex flex-col">
                    <label for="name" class="mb-1">Name</label>
                    <InputText
                        id="name"
                        v-model="name"
                        name="name"
                        :class="{ 'p-invalid': errors.name }"
                        placeholder="Account name..."
                    />
                    <small class="p-error">{{ errors.name }}</small>
                </div>

                <div class="flex flex-col">
                    <label for="balance" class="mb-1">Balance</label>
                    <InputNumber
                        v-model="balance"
                        input-id="balance"
                        placeholder="Balance..."
                        suffix=" Ft"
                        :class="{ 'p-invalid': errors.balance }"
                    />
                    <small class="p-error">{{ errors.balance }}</small>
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

definePageMeta({
    middleware: 'auth',
    layout: 'admin',
    navBackRoute: '/spending/accounts',
});

useHead({
    title: 'Create Account - Spending',
});

const schema = yup.object({
    name: yup.string().required().label('Name'),
    status: yup.boolean().label('Status'),
    balance: yup.number().required().label('Balance'),
});

const { defineField, handleSubmit, errors } = useForm({
    validationSchema: schema,
});

const isValid = useIsFormValid();
const [name] = defineField('name');
const [status] = defineField('status');
const [balance] = defineField('balance');

status.value = true;

const { createAccount } = useSpendingManagementStore();
const save = handleSubmit(async ({ name, status, balance }) => {
    await createAccount({
        name,
        status,
        balance,
    });
});
</script>
