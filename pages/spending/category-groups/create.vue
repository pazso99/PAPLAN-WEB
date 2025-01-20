<template>
    <ContentBaseCard
        title="Create category group"
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
                    <label for="selectedTransactionCategories" class="mb-1">Transaction Categories</label>
                    <MultiSelect
                        v-model="selectedTransactionCategories"
                        input-id="selectedTransactionCategories"
                        :options="selectableTransactionCategories"
                        filter
                        option-label="label"
                        option-group-label="label"
                        option-group-children="items"
                        placeholder="Select transaction categories"
                        display="chip"
                        :max-selected-labels="6"
                        :pt="{
                            itemGroup: {
                                class: 'p-0',
                            },
                        }"
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
    navBackRoute: '/spending/category-groups',
});

useHead({
    title: 'Create Category group - Spending',
});

const schema = yup.object({
    name: yup.string().required().label('Name'),
    status: yup.boolean().label('Status'),
});

const { defineField, handleSubmit, errors } = useForm({
    validationSchema: schema,
});

const isValid = useIsFormValid();
const [name] = defineField('name');
const [status] = defineField('status');

status.value = true;

const spendingManagementStore = useSpendingManagementStore();
const { createCategoryGroup, getTransactionCategories } = spendingManagementStore;
const { transactionCategories, loading } = storeToRefs(spendingManagementStore);

onMounted(async () => {
    await getTransactionCategories();

    setTransactionTypeGroups();
});

const save = handleSubmit(async ({ name, status }) => {
    await createCategoryGroup({
        name,
        status,
        transactionCategoryIds: selectedTransactionCategories.value.map((item: any) => item.value),
    });
});

// TODO
const selectedTransactionCategories: any = ref([]);
const selectableTransactionCategories: any = ref([]);
function setTransactionTypeGroups() {
    const transactionTypeGroups: any = {};
    transactionCategories.value.forEach((item: any) => {
        if (!transactionTypeGroups[item.transactionType]) {
            transactionTypeGroups[item.transactionType] = [];
        }

        transactionTypeGroups[item.transactionType].push({
            status: item.status,
            label: item.name,
            value: item.id,
            transactionType: item.transactionType,
            severity: getTransactionTypeColor(item.transactionType),
        });
    });

    selectableTransactionCategories.value = Object.entries(transactionTypeGroups).map(
        ([transactionType, items]) => ({ transactionType, items }),
    );
}
</script>
