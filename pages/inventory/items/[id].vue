<template>
    <ContentBaseCard
        title="Edit Item"
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
                        placeholder="ItemType name..."
                    />
                    <small class="p-error">{{ errors.name }}</small>
                </div>

                <div class="flex flex-col">
                    <label for="itemType" class="mb-1">Item type</label>
                    <Dropdown
                        v-model="itemType"
                        input-id="itemType"
                        option-label="name"
                        :options="selectableItemTypes"
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
import type { ItemTypeBasic } from '~/types/models';

definePageMeta({
    middleware: 'auth',
    layout: 'admin',
    navBackRoute: '/inventory/items',
});

useHead({
    title: 'Edit Item - Inventory',
});

const inventoryManagementStore = useInventoryManagementStore();
const { getItem, getItemTypes, getPackageUnits, updateItem, deleteItem } = inventoryManagementStore;
const { item, itemTypes, packageUnits, loading } = storeToRefs(inventoryManagementStore);
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
const [id] = defineField('id');
const [name] = defineField('name');
const [status] = defineField('status');
const [itemType] = defineField('itemType');
const [expectedLifetimeInDays] = defineField('expectedLifetimeInDays');
const [recommendedStock] = defineField('recommendedStock');
const [isEssential] = defineField('isEssential');
const [createdAt] = defineField('createdAt');
const [updatedAt] = defineField('updatedAt');

const routeId = ref();
const route = useRoute();
onMounted(async () => {
    routeId.value = getIdFromRoute(route.params);
    await getItem(routeId.value);
    await getItemTypes();
    await getPackageUnits();
    setData();
});

const dayjs = useDayjs();
function setData() {
    id.value = item.value.id;
    name.value = item.value.name;
    status.value = item.value.status;
    itemType.value = item.value.itemType;
    expectedLifetimeInDays.value = item.value.expectedLifetimeInDays;
    recommendedStock.value = item.value.recommendedStock;
    isEssential.value = item.value.isEssential;
    createdAt.value = dayjs(item.value.createdAt).format('YYYY-MM-DD HH:mm');
    updatedAt.value = dayjs(item.value.updatedAt).format('YYYY-MM-DD HH:mm');
    setSelectablePackageUnits();
    setSelectableItemTypes();
}

const selectedPackageUnits = ref<number[]>([]);
function setSelectablePackageUnits() {
    selectedPackageUnits.value = item.value.packageUnits.map(({ id }) => (id));
}

const selectableItemTypes = ref<ItemTypeBasic[]>([]);
function setSelectableItemTypes() {
    selectableItemTypes.value = itemTypes.value.map(({ id, name }) => ({
        id,
        name,
    }));
}

const save = handleSubmit(async ({ id, status, name, itemType, expectedLifetimeInDays, recommendedStock, isEssential }) => {
    await updateItem({
        id,
        name,
        status,
        itemTypeId: itemType.id,
        packageUnitIds: selectedPackageUnits.value,
        expectedLifetimeInDays,
        recommendedStock,
        isEssential,
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
            await deleteItem(routeId.value, true);
        },
    });
};
</script>
