<template>
    <ContentBaseCard
        title="Edit stock item"
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

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div class="flex flex-col">
                    <label for="item" class="mb-1">Item</label>
                    <Select
                        v-model="item"
                        input-id="item"
                        :options="selectableItems"
                        filter
                        option-label="name"
                        option-group-label="label"
                        option-group-children="items"
                        placeholder="Select item"
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
                                    :value="slotProps.option.itemType"
                                />
                            </div>
                        </template>
                    </Select>
                </div>

                <div
                    v-if="item"
                    class="flex flex-col"
                >
                    <label for="packageUnit" class="mb-1">Unit</label>
                    <Select
                        v-model="packageUnit"
                        input-id="packageUnit"
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
                        v-model="amount"
                        input-id="amount"
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
                        v-model="price"
                        input-id="price"
                        suffix=" Ft"
                        placeholder="Price..."
                        :class="{ 'p-invalid': errors.price }"
                    />
                    <small class="p-error">{{ errors.price }}</small>
                </div>
                <div class="flex flex-col">
                    <label for="purchaseDate" class="mb-1">Purchase date</label>
                    <DatePicker
                        v-model="purchaseDate"
                        input-id="purchaseDate"
                        date-format="yy-mm-dd"
                    />
                    <small class="p-error">{{ errors.purchaseDate }}</small>
                </div>
                <div class="flex flex-col">
                    <label for="expirationDate" class="mb-1">Expiration date</label>
                    <DatePicker
                        v-model="expirationDate"
                        input-id="expirationDate"
                        date-format="yy-mm-dd"
                    />
                    <small class="p-error">{{ errors.expirationDate }}</small>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div class="flex flex-col">
                    <label for="leftoverAmountPercentage" class="mb-1">Leftover Amount</label>
                    <InputNumber
                        v-model="leftoverAmountPercentage"
                        input-id="leftoverAmountPercentage"
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

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div class="flex flex-col">
                    <label for="comment" class="mb-1">Comment</label>
                    <Textarea
                        v-model="comment"
                        input-id="comment"
                        rows="5"
                        cols="30"
                    />
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
import type { PackageUnitBasic } from '~/types/models';

definePageMeta({
    middleware: 'auth',
    layout: 'admin',
    navBackRoute: '/inventory/purchased-items',
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
    comment: yup.string().nullable().label('Comment'),
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
const [comment] = defineField('comment');
const [createdAt] = defineField('createdAt');
const [updatedAt] = defineField('updatedAt');

status.value = true;
leftoverAmountPercentage.value = 100;

const inventoryManagementStore = useInventoryManagementStore();
const { updatePurchasedItem, getPurchasedItem, getItems, deletePurchasedItem } = inventoryManagementStore;
const { purchasedItem, items, loading } = storeToRefs(inventoryManagementStore);

const routeId = ref();
const route = useRoute();
onMounted(async () => {
    routeId.value = getIdFromRoute(route.params);
    await getPurchasedItem(routeId.value);
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
    comment.value = purchasedItem.value.comment;
    createdAt.value = dayjs(purchasedItem.value.createdAt).format('YYYY-MM-DD HH:mm');
    updatedAt.value = dayjs(purchasedItem.value.updatedAt).format('YYYY-MM-DD HH:mm');

    setItemGroups();
}

const packageUnitOptions = ref<PackageUnitBasic[]>([]);
const firstLoad = ref(true);
watch(item, async (newItem) => {
    if (!firstLoad.value) {
        packageUnit.value = null;
        amount.value = null;
    }
    packageUnitOptions.value = items.value.find(i => i.id === newItem.id)!.packageUnits.map(({ id, name }) => ({ id, name }));
    firstLoad.value = false;
});

const save = handleSubmit(async ({ id, status, item, packageUnit, amount, price, purchaseDate, expirationDate, leftoverAmountPercentage, comment }) => {
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
        comment,
    });
});

const selectableItems: any = ref([]);
function setItemGroups() {
    const itemGroups: any = {};
    items.value.forEach((item: any) => {
        if (!itemGroups[item.itemType.name]) {
            itemGroups[item.itemType.name] = [];
        }

        itemGroups[item.itemType.name].push({
            id: item.id,
            name: item.name,
            itemType: item.itemType,
            expectedLifetimeInDays: item.expectedLifetimeInDays,
            recommendedStock: item.recommendedStock,
            isEssential: item.isEssential,
        });
    });

    selectableItems.value = Object.entries(itemGroups).map(
        ([itemType, items]) => ({ itemType, items }),
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
            await deletePurchasedItem(routeId.value, true);
        },
    });
};
</script>
