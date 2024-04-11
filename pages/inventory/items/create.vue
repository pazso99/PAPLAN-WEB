<template>
    <ContentBaseCard
        title="Create item"
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
                <label for="isEssential" class="my-2">Essential</label>
                <div class="flex items-center gap-2">
                    <InputSwitch
                        v-model="isEssential"
                        input-id="isEssential"
                        :pt="{
                            slider: { class: isEssential ? 'bg-yellow-600' : 'bg-red-800' },
                        }"
                    />
                    <Tag
                        :value="isEssential ? 'ESSENTIAL' : 'FALSE'"
                        :severity="isEssential ? 'warning' : 'danger'"
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

                <div class="flex flex-col">
                    <label for="itemType" class="mb-1">Item type</label>
                    <Dropdown
                        v-model="itemType"
                        input-id="itemType"
                        option-label="name"
                        :options="itemTypes"
                        placeholder="Select item type"
                    />
                </div>

                <div class="flex flex-col">
                    <label for="selectedPackageUnits" class="mb-1">Package units</label>
                    <MultiSelect
                        v-model="selectedPackageUnits"
                        input-id="selectedPackageUnits"
                        :options="packageUnits"
                        option-label="name"
                        option-value="id"
                        placeholder="Select Units"
                        :max-selected-labels="1"
                    />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div class="flex flex-col">
                    <label for="expectedLifetimeInDays" class="mb-1">Expected lifetime</label>
                    <InputNumber
                        v-model="expectedLifetimeInDays"
                        input-id="expectedLifetimeInDays"
                        :suffix="` day${expectedLifetimeInDays > 1 ? 's' : ''}`"
                        placeholder="Expected lifetime..."
                        :class="{ 'p-invalid': errors.expectedLifetimeInDays }"
                    />
                    <small class="p-error">{{ errors.expectedLifetimeInDays }}</small>
                </div>
                <div class="flex flex-col">
                    <label for="recommendedStock" class="mb-1">Recommended stock</label>
                    <InputNumber
                        v-model="recommendedStock"
                        input-id="recommendedStock"
                        placeholder="Recommended stock..."
                        :class="{ 'p-invalid': errors.recommendedStock }"
                    />
                    <small class="p-error">{{ errors.recommendedStock }}</small>
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
    navBackRoute: '/inventory/items',
});

useHead({
    title: 'Create Item - Inventory',
});

const schema = yup.object({
    name: yup.string().required().label('Name'),
    status: yup.boolean().label('Status'),
    itemType: yup.object().required().label('Item type'),
    expectedLifetimeInDays: yup.number().nullable().label('Expected lifetime'),
    recommendedStock: yup.number().nullable().label('Recommended stock'),
    isEssential: yup.boolean().label('Essential'),
});

const { defineField, handleSubmit, errors } = useForm({
    validationSchema: schema,
});

const isValid = useIsFormValid();
const [name] = defineField('name');
const [status] = defineField('status');
const [itemType] = defineField('itemType');
const [expectedLifetimeInDays] = defineField('expectedLifetimeInDays');
const [recommendedStock] = defineField('recommendedStock');
const [isEssential] = defineField('isEssential');
const selectedPackageUnits = ref<number[]>([]);

status.value = true;
isEssential.value = false;

const inventoryManagementStore = useInventoryManagementStore();
const { createItem, getItemTypes, getPackageUnits } = inventoryManagementStore;
const { itemTypes, packageUnits, loading } = storeToRefs(inventoryManagementStore);

onMounted(async () => {
    await getItemTypes();
    await getPackageUnits();
});

const save = handleSubmit(async ({ name, status, itemType, expectedLifetimeInDays, recommendedStock, isEssential }) => {
    await createItem({
        name,
        status,
        itemTypeId: itemType.id,
        packageUnitIds: selectedPackageUnits.value,
        expectedLifetimeInDays,
        recommendedStock,
        isEssential,
    });
});
</script>
