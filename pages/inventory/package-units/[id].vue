<template>
    <ContentBaseCard
        title="Edit Package unit"
        :nav-buttons="[
            { icon: 'pi-chevron-left', to: '/inventory/package-units' },
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
                        placeholder="PackageUnit name..."
                    />
                    <small class="p-error">{{ errors.name }}</small>
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
    title: 'Edit Package unit - Inventory',
});

const inventoryManagementStore = useInventoryManagementStore();
const { getPackageUnit, updatePackageUnit } = inventoryManagementStore;
const { packageUnit, loading } = storeToRefs(inventoryManagementStore);

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

const route = useRoute();
onMounted(async () => {
    await getPackageUnit(getIdFromRoute(route.params));
    setData();
});

const dayjs = useDayjs();
function setData() {
    id.value = packageUnit.value.id;
    name.value = packageUnit.value.name;
    status.value = packageUnit.value.status;
    createdAt.value = dayjs(packageUnit.value.createdAt).format('YYYY-MM-DD HH:mm');
    updatedAt.value = dayjs(packageUnit.value.updatedAt).format('YYYY-MM-DD HH:mm');
}

const save = handleSubmit(async ({ id, status, name }) => {
    await updatePackageUnit({
        id,
        status,
        name,
    });
    setData();
});
</script>
