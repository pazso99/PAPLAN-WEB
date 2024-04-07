<template>
    <ContentBaseCard
        title="Create transaction category"
        :nav-buttons="[
            { icon: 'pi-chevron-left', to: '/spending/transaction-categories' },
        ]"
    >
        <form class="p-5">
            <div class="flex flex-col mb-4">
                <label for="status" class="mb-1">Status</label>
                <div class="flex items-center gap-2">
                    <InputSwitch
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
                        placeholder="Name..."
                    />
                    <small class="p-error">{{ errors.name }}</small>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div class="flex flex-col">
                    <label for="transactionType" class="mb-1">Transaction type</label>
                    <Dropdown
                        v-model="transactionType"
                        input-id="transactionType"
                        :options="transactionTypeOptions"
                        placeholder="Select a type"
                    >
                        <template #value="slotProps">
                            <Tag
                                v-if="slotProps.value"
                                :value="getTransactionTypeLabel(slotProps.value)"
                                :severity="getTransactionTypeColor(slotProps.value)"
                            />
                        </template>
                        <template #option="slotProps">
                            <Tag
                                v-if="slotProps.option"
                                :value="getTransactionTypeLabel(slotProps.option)"
                                :severity="getTransactionTypeColor(slotProps.option)"
                            />
                        </template>
                    </Dropdown>
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
});

useHead({
    title: 'Create Transaction Category - Spending',
});

const transactionTypeOptions = ref(getTransactionTypes());
const schema = yup.object({
    name: yup.string().required().label('Name'),
    status: yup.boolean().label('Status'),
    transactionType: yup.string().oneOf(transactionTypeOptions.value).required().label('Transaction type'),
});

const { defineField, handleSubmit, errors } = useForm({
    validationSchema: schema,
});

const isValid = useIsFormValid();
const [name] = defineField('name');
const [status] = defineField('status');
const [transactionType] = defineField('transactionType');

status.value = true;

const { createTransactionCategory } = useSpendingManagementStore();
const save = handleSubmit(async ({ name, status, transactionType }) => {
    await createTransactionCategory({
        name,
        status,
        transactionType,
    });
});
</script>
