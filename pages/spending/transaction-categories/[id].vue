<template>
    <ContentBaseCard
        :title="'Edit Transaction Category'"
        :navButtons="[
            { icon: 'pi-chevron-left', to: '/spending/transaction-categories' }
        ]"
        :loading="loading"
    >
        <form class="p-5">
            <div class="flex flex-col mb-4">
                <label for="status" class="mb-1">Status</label>
                <div class="flex items-center gap-2">
                    <InputSwitch
                        id="status"
                        v-model="status"
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
                        id="id"
                        v-model="id"
                        disabled
                    />
                </div>
                <div class="flex flex-col mb-4">
                    <label for="createdAt" class="mb-1">Created at</label>
                    <Calendar
                        id="createdAt"
                        v-model="createdAt"
                        disabled
                    />
                </div>
                <div class="flex flex-col mb-4">
                    <label for="updatedAt" class="mb-1">Updated at</label>
                    <Calendar
                        id="updatedAt"
                        v-model="updatedAt"
                        disabled
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
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div class="flex flex-col">
                    <label for="transactionType" class="mb-1">Transaction type</label>
                    <Dropdown
                        id="transactionType"
                        v-model="transactionType"
                        :options="transactionTypeOptions"
                        placeholder="Select a type"
                    >
                        <template #value="slotProps">
                            <Tag
                                v-if="slotProps.value === 'income'"
                                value="income"
                                severity="success"
                            />
                            <Tag
                                v-else-if="slotProps.value === 'expense'"
                                value="expense"
                                severity="danger"
                            />
                            <Tag
                                v-else-if="slotProps.value === 'transfer'"
                                value="transfer"
                                severity="warning"
                            />
                            <span v-else>{{ slotProps.placeholder }}</span>
                        </template>
                        <template #option="slotProps">
                            <Tag
                                v-if="slotProps.option === 'income'"
                                value="income"
                                severity="success"
                            />
                            <Tag
                                v-else-if="slotProps.option === 'expense'"
                                value="expense"
                                severity="danger"
                            />
                            <Tag
                                v-else-if="slotProps.option === 'transfer'"
                                value="transfer"
                                severity="warning"
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
    layout: 'admin'
});

useHead({
    title: 'Edit Transaction Category - Spending',
});

const route: any = useRoute();
const { getTransactionCategory, updateTransactionCategory } = useSpendingCrudStore();
const { transactionCategory, loading }: any = storeToRefs(useSpendingCrudStore());

const transactionTypeOptions = ref(['income', 'expense', 'transfer']);
const schema = yup.object({
    name: yup.string().required().label('Name'),
    status: yup.boolean().label('Status'),
    transactionType: yup.string().oneOf(transactionTypeOptions.value).required().label('Transaction type'),
});

const { defineField, handleSubmit, errors } = useForm({
    validationSchema: schema,
});

const isValid = useIsFormValid();
const [id] = defineField('id');
const [name] = defineField('name');
const [status] = defineField('status');
const [transactionType] = defineField('transactionType');
const [createdAt] = defineField('createdAt');
const [updatedAt] = defineField('updatedAt');

const dayjs = useDayjs();
onMounted(async () => {
    await getTransactionCategory(route.params.id);
    id.value = transactionCategory.value.id;
    name.value = transactionCategory.value.name;
    status.value = transactionCategory.value.status;
    transactionType.value = transactionCategory.value.transactionType;
    createdAt.value = dayjs(transactionCategory.value.createdAt).format('YYYY-MM-DD HH:mm');
    updatedAt.value = dayjs(transactionCategory.value.updatedAt).format('YYYY-MM-DD HH:mm');
});

const save = handleSubmit(async (data: any) => {
    await updateTransactionCategory(data);
});
</script>
