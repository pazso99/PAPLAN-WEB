<template>
    <ContentBaseCard
        title="Edit account"
        nav-back-button
        :loading="loading"
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
                    <DatePicker
                        v-model="createdAt"
                        input-id="createdAt"
                        disabled
                    />
                </div>
                <div class="flex flex-col mb-4">
                    <label for="updatedAt" class="mb-1">Updated at</label>
                    <DatePicker
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
    navBackRoute: '/spending/accounts',
});

useHead({
    title: 'Edit Account - Spending',
});

const spendingManagementStore = useSpendingManagementStore();
const { getAccount, updateAccount, deleteAccount } = spendingManagementStore;
const { account, loading } = storeToRefs(spendingManagementStore);

const schema = yup.object({
    name: yup.string().required().label('Name'),
    status: yup.boolean().label('Status'),
    balance: yup.number().required().label('Balance'),
});

const { defineField, handleSubmit, errors } = useForm({
    validationSchema: schema,
});

const isValid = useIsFormValid();
const [id] = defineField('id');
const [name] = defineField('name');
const [status] = defineField('status');
const [balance] = defineField('balance');
const [createdAt] = defineField('createdAt');
const [updatedAt] = defineField('updatedAt');

const routeId = ref();
const route = useRoute();
onMounted(async () => {
    routeId.value = getIdFromRoute(route.params);
    await getAccount(routeId.value);
    setData();
});

const dayjs = useDayjs();
function setData() {
    id.value = account.value.id;
    name.value = account.value.name;
    status.value = account.value.status;
    balance.value = account.value.balance;
    createdAt.value = dayjs(account.value.createdAt).format('YYYY-MM-DD HH:mm');
    updatedAt.value = dayjs(account.value.updatedAt).format('YYYY-MM-DD HH:mm');
}

const save = handleSubmit(async ({ id, status, name, balance }) => {
    await updateAccount({
        id,
        status,
        name,
        balance,
    });
    await getAccount(routeId.value);
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
            await deleteAccount(routeId.value, true);
        },
    });
};
</script>
