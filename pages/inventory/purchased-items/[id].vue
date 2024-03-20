<template>
    <ContentBaseCard
        title="Edit purchased item"
        :nav-buttons="[
            { icon: 'pi-chevron-left', to: '/inventory/purchased-items' },
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

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div class="flex flex-col">
                    <label for="item" class="mb-1">Item</label>
                    <Dropdown
                        id="item"
                        v-model="item"
                        option-label="name"
                        :options="itemOptions"
                        placeholder="Select item"
                    />
                </div>

                <div
                    v-if="item"
                    class="flex flex-col"
                >
                    <label for="packageUnit" class="mb-1">Unit</label>
                    <Dropdown
                        id="packageUnit"
                        v-model="packageUnit"
                        option-label="name"
                        :options="packageUnitOptions"
                        placeholder="Select unit"
                    />
                </div>

                <div
                    v-if="packageUnit"
                    class="flex flex-col"
                >
                    <label for="amount" class="mb-1">Amount</label>
                    <InputNumber
                        id="amount"
                        v-model="amount"
                        input-id="minmaxfraction"
                        :suffix="` ${packageUnit.name}`"
                        :max-fraction-digits="3"
                        placeholder="Amount..."
                        :class="{ 'p-invalid': errors.amount }"
                    />
                    <small class="p-error">{{ errors.amount }}</small>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div class="flex flex-col">
                    <label for="price" class="mb-1">Price</label>
                    <InputNumber
                        id="price"
                        v-model="price"
                        suffix=" Ft"
                        placeholder="Price..."
                        :class="{ 'p-invalid': errors.price }"
                    />
                    <small class="p-error">{{ errors.price }}</small>
                </div>
                <div class="flex flex-col">
                    <label for="purchaseDate" class="mb-1">Purchase date</label>
                    <Calendar
                        id="purchaseDate"
                        v-model="purchaseDate"
                        date-format="yy-mm-dd"
                    />
                    <small class="p-error">{{ errors.purchaseDate }}</small>
                </div>
                <div class="flex flex-col">
                    <label for="expirationDate" class="mb-1">Expiration date</label>
                    <Calendar
                        id="expirationDate"
                        v-model="expirationDate"
                        date-format="yy-mm-dd"
                    />
                    <small class="p-error">{{ errors.expirationDate }}</small>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div class="flex flex-col">
                    <label for="leftoverAmountPercentage" class="mb-1">Leftover Amount</label>
                    <InputNumber
                        id="leftoverAmountPercentage"
                        v-model="leftoverAmountPercentage"
                        suffix=" %"
                        :min="0"
                        :max="100"
                        placeholder="Leftover Amount..."
                        :class="{ 'p-invalid': errors.leftoverAmountPercentage }"
                    />
                    <Slider v-model="leftoverAmountPercentage" />
                    <small class="p-error">{{ errors.leftoverAmountPercentage }}</small>
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
import type { ItemBasic, PackageUnit, PackageUnitBasic } from '~/types/models';

definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});

useHead({
    title: 'Create Item - Inventory',
});

const schema = yup.object({
    status: yup.boolean().label('Status'),
    item: yup.object().required().label('Item'),
    packageUnit: yup.object().required().label('Package unit'),
    amount: yup.number().required().label('Amount'),
    price: yup.number().nullable().label('Price'),
    purchaseDate: yup.date().nullable().label('Purchase date'),
    expirationDate: yup.date().nullable().label('Expiration date'),
    leftoverAmountPercentage: yup.number().nullable().label('Leftover amount percentage'),
});

const { defineField, handleSubmit, errors } = useForm({
    validationSchema: schema,
});

const isValid = useIsFormValid();
const [id] = defineField('id');
const [status] = defineField('status');
const [item] = defineField('item');
const [packageUnit] = defineField('packageUnit');
const [amount] = defineField('amount');
const [price] = defineField('price');
const [purchaseDate] = defineField('purchaseDate');
const [expirationDate] = defineField('expirationDate');
const [leftoverAmountPercentage] = defineField('leftoverAmountPercentage');
const [createdAt] = defineField('createdAt');
const [updatedAt] = defineField('updatedAt');

status.value = true;
leftoverAmountPercentage.value = 100;

const inventoryManagementStore = useInventoryManagementStore();
const { updatePurchasedItem, getPurchasedItem, getItems } = inventoryManagementStore;
const { purchasedItem, items, loading } = storeToRefs(inventoryManagementStore);

const route = useRoute();
onMounted(async () => {
    await getPurchasedItem(getIdFromRoute(route.params));
    await getItems();
    setData();
});

const dayjs = useDayjs();
function setData() {
    id.value = purchasedItem.value.id;
    status.value = purchasedItem.value.status;
    item.value = purchasedItem.value.item;
    packageUnit.value = purchasedItem.value.packageUnit;
    amount.value = purchasedItem.value.amount;
    price.value = purchasedItem.value.price;
    purchaseDate.value = purchasedItem.value.purchaseDate ? dayjs(purchasedItem.value.purchaseDate).format('YYYY-MM-DD') : null;
    expirationDate.value = purchasedItem.value.expirationDate ? dayjs(purchasedItem.value.expirationDate).format('YYYY-MM-DD') : null;
    leftoverAmountPercentage.value = purchasedItem.value.leftoverAmountPercentage;
    createdAt.value = dayjs(purchasedItem.value.createdAt).format('YYYY-MM-DD HH:mm');
    updatedAt.value = dayjs(purchasedItem.value.updatedAt).format('YYYY-MM-DD HH:mm');

    setItemOptions();
}

const itemOptions = ref<ItemBasic[]>([]);
function setItemOptions() {
    itemOptions.value = items.value.map(({ id, name, itemType, expectedLifetimeInDays, recommendedStock }) => ({
        id,
        name,
        itemType,
        expectedLifetimeInDays,
        recommendedStock,
    }));
}

const packageUnitOptions = ref<PackageUnitBasic[]>([]);
watch(item, async (newItem) => {
    packageUnitOptions.value = items.value.find(i => i.id === newItem.id)!.packageUnits.map(({ id, name }) => ({ id, name }));
});

const save = handleSubmit(async ({ id, status, item, packageUnit, amount, price, purchaseDate, expirationDate, leftoverAmountPercentage }) => {
    await updatePurchasedItem({
        id,
        status,
        itemId: item.id,
        packageUnitId: packageUnit.id,
        amount,
        price,
        purchaseDate: purchaseDate ? dayjs(purchaseDate).format('YYYY-MM-DD') : null,
        expirationDate: expirationDate ? dayjs(expirationDate).format('YYYY-MM-DD') : null,
        leftoverAmountPercentage,
    });
});
</script>
