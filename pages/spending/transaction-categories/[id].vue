<template>
    <ContentBaseCard
        title="Edit Transaction Category"
        nav-back-button
        :loading="loading"
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
                <div class="flex flex-col mb-4">
                    <label for="id" class="mb-1">ID</label>
                    <InputNumber
                        v-model="id"
                        input-id="id"
                        disabled
                    />
                </div>
                <div class="flex flex-col mb-4">
                    <label for="createdAt" class="mb-1">Created at</label>
                    <Calendar
                        v-model="createdAt"
                        input-id="createdAt"
                        disabled
                    />
                </div>
                <div class="flex flex-col mb-4">
                    <label for="updatedAt" class="mb-1">Updated at</label>
                    <Calendar
                        v-model="updatedAt"
                        input-id="updatedAt"
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
                icon="pi pi-check"
                :disabled="!isValid"
                @click="save"
            />

            <Button
                class="ml-4"
                size="small"
                label="Delete"
                severity="danger"
                icon="pi pi-trash"
                @click="handleDelete"
            />
        </form>
        <ConfirmDialog group="positioned" />
    </ContentBaseCard>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { useConfirm } from 'primevue/useconfirm';

definePageMeta({
    middleware: 'auth',
    layout: 'admin',
    navBackRoute: '/spending/transaction-categories',
});

useHead({
    title: 'Edit Transaction Category - Spending',
});

const spendingManagementStore = useSpendingManagementStore();
const { getTransactionCategory, updateTransactionCategory, deleteTransactionCategory } = spendingManagementStore;
const { transactionCategory, loading } = storeToRefs(spendingManagementStore);

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
const [id] = defineField('id');
const [name] = defineField('name');
const [status] = defineField('status');
const [transactionType] = defineField('transactionType');
const [createdAt] = defineField('createdAt');
const [updatedAt] = defineField('updatedAt');

const routeId = ref();
const route = useRoute();
onMounted(async () => {
    routeId.value = getIdFromRoute(route.params);
    await getTransactionCategory(routeId.value);
    setData();
});

const dayjs = useDayjs();
function setData() {
    id.value = transactionCategory.value.id;
    name.value = transactionCategory.value.name;
    status.value = transactionCategory.value.status;
    transactionType.value = transactionCategory.value.transactionType;
    createdAt.value = dayjs(transactionCategory.value.createdAt).format('YYYY-MM-DD HH:mm');
    updatedAt.value = dayjs(transactionCategory.value.updatedAt).format('YYYY-MM-DD HH:mm');
}

const save = handleSubmit(async ({ id, status, name, transactionType }) => {
    await updateTransactionCategory({
        id,
        status,
        name,
        transactionType,
    });
    setData();
});

const confirm = useConfirm();
function handleDelete() {
    confirm.require({
        message: 'Are you sure you want to delete this item?',
        group: 'positioned',
        header: 'Attention!',
        position: 'center',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'bg-red-400 border-none',
        acceptLabel: 'Delete',
        accept: async () => {
            await deleteTransactionCategory(routeId.value, true);
        },
    });
};
</script>
