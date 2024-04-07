<template>
    <ContentBaseCard
        title="Create stock item"
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

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div class="flex flex-col">
                    <label for="item" class="mb-1">Item</label>
                    <Dropdown
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
                    </Dropdown>
                </div>

                <div
                    v-if="item"
                    class="flex flex-col"
                >
                    <label for="packageUnit" class="mb-1">Unit</label>
                    <Dropdown
                        v-model="packageUnit"
                        input-id="packageUnit"
                        option-label="name"
                        :options="packageUnitOptions"
                        placeholder="Select unit"
                    />
                    <small class="p-error">{{ errors.packageUnit }}</small>
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
                    <Calendar
                        v-model="purchaseDate"
                        input-id="purchaseDate"
                        date-format="yy-mm-dd"
                    />
                    <small class="p-error">{{ errors.purchaseDate }}</small>
                </div>
                <div class="flex flex-col">
                    <label for="expirationDate" class="mb-1">Expiration date</label>
                    <Calendar
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

            <div class="flex items-center gap-3">
                <InputNumber
                    id="createAmount"
                    v-model="createAmount"
                    show-buttons
                    :min="1"
                    :max="99"
                >
                    <template #incrementbuttonicon>
                        <span class="pi pi-plus" />
                    </template>
                    <template #decrementbuttonicon>
                        <span class="pi pi-minus" />
                    </template>
                </InputNumber>
                <Button
                    size="small"
                    label="Save"
                    type="submit"
                    :disabled="!isValid"
                    @click="save"
                />
            </div>
        </form>
    </ContentBaseCard>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import type { PackageUnit } from '~/types/models';

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
    comment: yup.string().label('Comment'),
});

const { defineField, handleSubmit, errors } = useForm({
    validationSchema: schema,
});

const isValid = useIsFormValid();
const [status] = defineField('status');
const [item] = defineField('item');
const [packageUnit] = defineField('packageUnit');
const [amount] = defineField('amount');
const [price] = defineField('price');
const [purchaseDate] = defineField('purchaseDate');
const [expirationDate] = defineField('expirationDate');
const [leftoverAmountPercentage] = defineField('leftoverAmountPercentage');
const [comment] = defineField('comment');
const createAmount = ref(1);

status.value = true;
leftoverAmountPercentage.value = 100;

const inventoryManagementStore = useInventoryManagementStore();
const { createPurchasedItem, getItems } = inventoryManagementStore;
const { items, loading } = storeToRefs(inventoryManagementStore);

onMounted(async () => {
    await getItems();

    setItemGroups();
});

const packageUnitOptions = ref<PackageUnit[]>([]);
watch(item, async (newItem) => {
    packageUnit.value = null;
    amount.value = null;
    packageUnitOptions.value = newItem.packageUnits;
});

const dayjs = useDayjs();
const save = handleSubmit(async ({ status, item, packageUnit, amount, price, purchaseDate, expirationDate, leftoverAmountPercentage, comment }) => {
    await createPurchasedItem({
        status,
        itemId: item.id,
        packageUnitId: packageUnit.id,
        amount,
        price,
        purchaseDate: purchaseDate ? dayjs(purchaseDate).format('YYYY-MM-DD') : null,
        expirationDate: expirationDate ? dayjs(expirationDate).format('YYYY-MM-DD') : null,
        leftoverAmountPercentage,
        comment,
        createAmount: createAmount.value,
    });
    createAmount.value = 1;
});

const selectableItems: any = ref([]);
function setItemGroups() {
    const itemGroups: any = {};
    items.value.forEach((item: any) => {
        if (!itemGroups[item.itemType.name]) {
            itemGroups[item.itemType.name] = [];
        }

        itemGroups[item.itemType.name].push(item);
    });

    selectableItems.value = Object.entries(itemGroups).map(
        ([itemType, items]) => ({ itemType, items }),
    );
}
</script>

<style lang="scss" scoped>
:deep(#createAmount) {
    width: 5rem;

    & input {
        width: 100% !important;
    }

    & span.pi {
        font-size: 10px !important;
    }
}
</style>
