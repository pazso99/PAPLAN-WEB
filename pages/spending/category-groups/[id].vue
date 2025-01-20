<template>
    <ContentBaseCard
        title="Edit category group"
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
                        placeholder="Category group name..."
                    />
                    <small class="p-error">{{ errors.name }}</small>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="flex flex-col">
                    <label for="selectedTransactionCategories" class="mb-1">Transaction categories</label>
                    <MultiSelect
                        v-model="selectedTransactionCategories"
                        input-id="selectedTransactionCategories"
                        :options="selectableTransactionCategories"
                        filter
                        option-label="label"
                        option-group-label="label"
                        option-group-children="items"
                        placeholder="Select a category"
                        :pt="{
                            itemGroup: {
                                class: 'p-0',
                            },
                        }"
                        display="chip"
                        :max-selected-labels="6"
                    >
                        <template #optiongroup="slotProps">
                            <div class="py-1 text-center">
                                <Tag
                                    class="w-full"
                                    :value="getTransactionTypeLabel(slotProps.option.transactionType)"
                                    :severity="getTransactionTypeColor(slotProps.option.transactionType)"
                                />
                            </div>
                        </template>
                        <template #option="slotProps">
                            <div class="flex gap-2">
                                <span>{{ slotProps.option.label }}</span>
                                <Tag
                                    v-if="!slotProps.option.status"
                                    severity="danger"
                                >
                                    INACTIVE
                                </Tag>
                            </div>
                        </template>
                    </MultiSelect>
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
    navBackRoute: '/spending/category-groups',
});

useHead({
    title: 'Edit Category group - Spending',
});

const spendingManagementStore = useSpendingManagementStore();
const { getCategoryGroup, updateCategoryGroup, deleteCategoryGroup, getTransactionCategories } = spendingManagementStore;
const { categoryGroup, transactionCategories, loading } = storeToRefs(spendingManagementStore);

const schema = yup.object({
    name: yup.string().required().label('Name'),
    status: yup.boolean().label('Status'),
});

const { defineField, handleSubmit, errors } = useForm({
    validationSchema: schema,
});

const isValid = useIsFormValid();
const [id] = defineField('id');
const [name] = defineField('name');
const [status] = defineField('status');
const [createdAt] = defineField('createdAt');
const [updatedAt] = defineField('updatedAt');

const routeId = ref();
const route = useRoute();
onMounted(async () => {
    routeId.value = getIdFromRoute(route.params);
    await getCategoryGroup(routeId.value);
    await getTransactionCategories();
    setData();
});

const dayjs = useDayjs();
function setData() {
    id.value = categoryGroup.value.id;
    name.value = categoryGroup.value.name;
    status.value = categoryGroup.value.status;
    createdAt.value = dayjs(categoryGroup.value.createdAt).format('YYYY-MM-DD HH:mm');
    updatedAt.value = dayjs(categoryGroup.value.updatedAt).format('YYYY-MM-DD HH:mm');

    setTransactionTypeGroups();
}

const save = handleSubmit(async ({ id, status, name }) => {
    await updateCategoryGroup({
        id,
        status,
        name,
        transactionCategoryIds: selectedTransactionCategories.value.map((category: any) => category.value),
    });
    setData();
});

// TODO
const transactionCategoryIds: any = ref([]);
const selectedTransactionCategories: any = ref([]);
const selectableTransactionCategories: any = ref([]);
function setTransactionTypeGroups() {
    const transactionTypeGroups: any = {};
    selectedTransactionCategories.value = [];

    transactionCategoryIds.value = categoryGroup.value.transactionCategories.map(cat => cat.id);
    transactionCategories.value.forEach((item: any) => {
        if (!transactionTypeGroups[item.transactionType]) {
            transactionTypeGroups[item.transactionType] = [];
        }

        const category = {
            status: item.status,
            label: item.name,
            value: item.id,
            transactionType: item.transactionType,
            severity: getTransactionTypeColor(item.transactionType),
        };
        transactionTypeGroups[item.transactionType].push(category);

        if (transactionCategoryIds.value.includes(item.id)) {
            selectedTransactionCategories.value.push(category);
        }
    });

    selectableTransactionCategories.value = Object.entries(transactionTypeGroups).map(
        ([transactionType, items]) => ({ transactionType, items }),
    );
}

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
            await deleteCategoryGroup(routeId.value, true);
        },
    });
};
</script>
