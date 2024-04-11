<template>
    <ContentBaseCard
        title="Inventory dashboard"
        :loading="loading"
    >
        <div class="flex flex-col gap-2 justify-center p-4">
            <IconField icon-position="left">
                <InputIcon>
                    <i class="pi pi-search" />
                </InputIcon>
                <InputText
                    v-model="filter"
                    placeholder="Search..."
                    @input="filterList(true)"
                />
            </IconField>
            <Divider />
        </div>

        <Accordion
            v-model:active-index="activeTabs"
            multiple
        >
            <AccordionTab
                v-for="inventoryItemType in filteredInventoryItemTypes"
                :key="inventoryItemType.id"
                :disabled="inventoryItemType.items.length === 0"
            >
                <template #header>
                    <div class="w-full flex items-center justify-between gap-2">
                        <span class="font-bold">{{ inventoryItemType.name }}</span>
                        <div class="flex justify-between items-center mr-4">
                            <div
                                v-if="inventoryItemType.items.length > 0"
                                class="flex items-center"
                            >
                                <Badge
                                    severity="danger"
                                    :value="inventoryItemType.outOfStockNumber"
                                    class="mr-2"
                                />
                                <Badge
                                    severity="success"
                                    :value="inventoryItemType.inStockNumber"
                                />
                                <span class="text-sm mr-2 ml-4">|</span>
                            </div>
                            <Badge :value="inventoryItemType.items.length" />
                        </div>
                    </div>
                </template>
                <div class="flex flex-wrap">
                    <template
                        v-for="(inventoryItem, index) in inventoryItemType.items"
                        :key="inventoryItem.id"
                    >
                        <div
                            v-if="index === 0 && inventoryItem.isEssential"
                            :key="`e_${inventoryItem.id}`"
                            class="w-[80%] m-auto p-2 text-lg font-bold text-center text-yellow-500 mt-1 mb-4 border border-x-0 border-t-0 border-b-1 border-yellow-500"
                        >
                            Essentials
                        </div>
                        <div
                            v-if="!inventoryItem.isEssential && inventoryItemType.items[index - 1]?.isEssential"
                            :key="`ne_${inventoryItem.id}`"
                            class="w-[80%] m-auto p-2 text-center mt-2 mb-4 border border-x-0 border-t-0 border-b-1 border-white"
                        >
                            Non Essentials
                        </div>
                        <div
                            class="w-full md:w-1/4 p-2"
                        >
                            <Card :class="`bg-gradient-to-tr ${getStockStatusClass(inventoryItem)}`">
                                <template #header>
                                    <div :class="`flex items-center text-bold text-xl p-3 gap-1 bg-gradient-to-tr ${getEssentialItemClass(inventoryItem)}`">
                                        <div class="flex-1 text-center">
                                            <NuxtLink
                                                :to="{ name: 'inventory-items-id', params: { id: inventoryItem.id }, query: { from: '/inventory' } }"
                                            >
                                                <span
                                                    :class="getEssentialTextClass(inventoryItem.isEssential)"
                                                >
                                                    {{ inventoryItem.name }}
                                                </span>
                                            </NuxtLink>
                                        </div>
                                        <div class="flex flex-col justify-center gap-2">
                                            <Button
                                                class="w-6 h-6 text-xs text-white bg-gradient-to-tr from-green-800 to-green-600 border-none"
                                                icon="pi pi-plus"
                                                rounded
                                                @click="openNewItemDialog(inventoryItem.id)"
                                            />
                                        </div>
                                    </div>
                                </template>
                                <template #content>
                                    <div class="flex justify-between gap-5">
                                        <div
                                            v-if="inventoryItem.stockStatus === 'in_stock'"
                                            class="text-sm"
                                        >
                                            <b>In stock</b>
                                            <div
                                                v-if="inventoryItem.recommendedStock"
                                            >
                                                Recommended stock: <b>{{ inventoryItem.recommendedStock }}</b>
                                            </div>
                                            <div
                                                v-if="inventoryItem.expectedRunOutDate"
                                            >
                                                Expected to run out at: <b>{{ inventoryItem.expectedRunOutDate }}</b>
                                            </div>
                                        </div>
                                        <div
                                            v-if="inventoryItem.stockStatus === 'running_out'"
                                            class="text-sm"
                                        >
                                            <b>Running out</b>
                                            <div
                                                v-if="inventoryItem.recommendedStock"
                                            >
                                                Recommended stock: <b>{{ inventoryItem.recommendedStock }}</b>
                                            </div>
                                            <div
                                                v-if="inventoryItem.expectedRunOutDate"
                                            >
                                                Expected to run out at: <b>{{ inventoryItem.expectedRunOutDate }}</b>
                                            </div>
                                        </div>
                                        <div
                                            v-if="inventoryItem.stockStatus === 'out'"
                                            class="text-sm"
                                        >
                                            <b>Ran out</b>
                                            <div
                                                v-if="inventoryItem.ranOutDate"
                                            >
                                                Ran out: <b>{{ inventoryItem.ranOutDate }}</b>
                                            </div>
                                            <div
                                                v-if="inventoryItem.recommendedStock"
                                            >
                                                Recommended stock: <b>{{ inventoryItem.recommendedStock }}</b>
                                            </div>
                                        </div>
                                        <div class="flex flex-col gap-1">
                                            <Button
                                                class="w-full bg-gradient-to-tr from-blue-950 to-zinc-950 text-gray-300 border-none shadow-sm"
                                                size="small"
                                                label="IN_STOCK"
                                                :disabled="inventoryItem.inStockItems.length === 0"
                                                :badge="inventoryItem.inStockItems.length.toString()"
                                                @click="openItemListDialog(inventoryItem, 'inStock')"
                                            />
                                            <Button
                                                class="w-full bg-gradient-to-tr from-blue-950 to-zinc-950 text-gray-300 border-none shadow-sm"
                                                size="small"
                                                label="USED"
                                                :disabled="inventoryItem.usedItems.length === 0"
                                                :badge="inventoryItem.usedItems.length.toString()"
                                                @click="openItemListDialog(inventoryItem, 'used')"
                                            />
                                        </div>
                                    </div>
                                </template>
                            </Card>
                        </div>
                    </template>
                </div>
            </AccordionTab>
        </Accordion>

        <Dialog
            v-model:visible="itemListDialog"
            class="w-full md:w-[60rem]"
            modal
        >
            <template #header>
                <div class="text-xl">
                    <b>
                        <span :class="selectedStockItem!.isEssential ? 'text-yellow-600' : 'text-blue-500'">
                            {{ selectedStockItem!.name }}
                        </span>
                    </b>
                    {{ selectedStockType === 'inStock' ? 'in stock' : 'used' }}
                    items
                </div>
            </template>
            <DataTable
                :value="selectedStockType === 'inStock' ? selectedStockItem!.inStockItems : selectedStockItem!.usedItems"
            >
                <Column
                    field="amount"
                    header="Amount"
                    sortable
                >
                    <template #body="{ data }">
                        {{ data.amount }} {{ data.packageUnit }}
                    </template>
                </Column>
                <Column
                    field="price"
                    header="Price"
                    sortable
                />
                <Column
                    field="purchaseDate"
                    header="PurchaseDate"
                    sortable
                />
                <Column
                    field="expirationDate"
                    header="ExpirationDate"
                    sortable
                />
                <Column
                    field="leftoverAmountPercentage"
                    header="Leftover%"
                    data-type="numeric"
                    sortable
                >
                    <template #body="{ data }">
                        <div class="flex items-center">
                            <div class="w-1/5 text-xs">{{ data.leftoverAmountPercentage }}</div>
                            <ProgressBar
                                class="w-4/5"
                                :value="data.leftoverAmountPercentage"
                                :show-value="false"
                                :pt="{
                                    value: {
                                        class: getLeftoverPercentageClass(data.leftoverAmountPercentage),
                                    },
                                }"
                            />
                        </div>
                    </template>
                </Column>
                <Column>
                    <template #body="{ data }">
                        <div class="flex justify-end">
                            <NuxtLink
                                :to="{ name: 'inventory-purchased-items-id', params: { id: data.id }, query: { from: '/inventory' } }"
                            >
                                <Button
                                    icon="pi pi-eye"
                                    severity="contrast"
                                    text
                                    rounded
                                />
                            </NuxtLink>
                            <Button
                                v-if="selectedStockType === 'inStock'"
                                icon="pi pi-minus-circle"
                                severity="danger"
                                text
                                rounded
                                @click="confirmUse(data.id)"
                            />
                        </div>
                    </template>
                </Column>
            </DataTable>
        </Dialog>

        <ConfirmDialog group="positioned" />

        <Dialog
            v-model:visible="newItemDialog"
            class="w-full md:w-[60rem]"
            modal
        >
            <template #header>
                <div class="text-xl">
                    Add new
                    <b>
                        <span :class="item.isEssential ? 'text-yellow-600' : 'text-blue-500'">
                            {{ item.name }}
                        </span>
                    </b>
                    item
                </div>
            </template>

            <form class="p-5">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div class="flex flex-col">
                        <label for="packageUnit" class="mb-1">Unit</label>
                        <Dropdown
                            v-model="packageUnit"
                            input-input-id="packageUnit"
                            option-label="name"
                            :options="item.packageUnits"
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
                            input-input-id="amount"
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

                <div class="flex flex-col md:flex-row items-center gap-3">
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
        </Dialog>
        <template #loading>
            <Accordion>
                <AccordionTab
                    v-for="index in 15"
                    :key="index"
                >
                    <template #header>
                        <Skeleton width="10rem" height="1.25rem" />
                    </template>
                </AccordionTab>
            </Accordion>
        </template>
    </ContentBaseCard>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import { useConfirm } from 'primevue/useconfirm';
import type {
    InventoryItem,
    InventoryItemTypeWithItems,
} from '~/types/types';

definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});

useHead({
    title: 'Inventory Dashboard',
});

const inventoryDashboardStore = useInventoryDashboardStore();
const inventoryManagementStore = useInventoryManagementStore();
const { getInventoryDashboardData, useInStockItem } = inventoryDashboardStore;
const { getItem, createPurchasedItem } = inventoryManagementStore;
const { inventoryItemTypes, activeTabs, loading } = storeToRefs(inventoryDashboardStore);
const { item } = storeToRefs(inventoryManagementStore);

const filteredInventoryItemTypes = ref<InventoryItemTypeWithItems[]>([]);
onMounted(async () => {
    await getInventoryDashboardData();
    filteredInventoryItemTypes.value = inventoryItemTypes.value;
});

const filter = ref<string>('');
function filterList(setActiveTabs: boolean = true) {
    const filterText = filter.value.toLowerCase();
    const arrCopy: InventoryItemTypeWithItems[] = JSON.parse(JSON.stringify(inventoryItemTypes.value));
    filteredInventoryItemTypes.value = arrCopy.filter((inventoryItemType, index) => {
        inventoryItemType.items = inventoryItemType.items.filter(item => item.name.toLowerCase().includes(filterText));
        const hasItems = inventoryItemType.items.length > 0;
        if (!hasItems && setActiveTabs) {
            activeTabs.value = activeTabs.value.filter(num => num !== index);
        }
        return hasItems || inventoryItemType.name.toLowerCase().includes(filterText);
    });
};

const itemListDialog = ref(false);
const selectedStockType = ref('');
const selectedStockItem = ref<InventoryItem>();
function openItemListDialog(item: InventoryItem, stockType: 'inStock' | 'used') {
    selectedStockItem.value = item;
    selectedStockType.value = stockType;
    itemListDialog.value = true;
}

function getStockStatusClass(item: InventoryItem) {
    switch (item.stockStatus) {
        case 'in_stock':
            return 'from-green-900 to-green-950';
        case 'running_out':
            return 'from-yellow-600 to-yellow-800';
        case 'out':
            return 'from-red-900 to-red-950';
        default:
            return 'from-blue-900 to-blue-950';
    }
}

function getEssentialItemClass(item: InventoryItem) {
    let className = '';

    if (item.isEssential) {
        className += 'from-zinc-950 to-amber-950 border border-b-0 border-x-0 border-t-2 border-yellow-500 ';
    } else {
        className += 'from-slate-800 to-zinc-400';
    }

    return className;
}

function getEssentialTextClass(isEssential: boolean) {
    return isEssential ? 'text-yellow-500' : 'text-white';
}

const newItemDialog = ref(false);
async function openNewItemDialog(id: number) {
    resetForm();
    leftoverAmountPercentage.value = 100;
    newItemDialog.value = true;
    await getItem(id);
}

const schema = yup.object({
    packageUnit: yup.object().required().label('Package unit'),
    amount: yup.number().required().label('Amount'),
    price: yup.number().nullable().label('Price'),
    purchaseDate: yup.date().nullable().label('Purchase date'),
    expirationDate: yup.date().nullable().label('Expiration date'),
    leftoverAmountPercentage: yup.number().nullable().label('Leftover amount percentage'),
    comment: yup.string().label('Comment'),
});

const { defineField, handleSubmit, resetForm, errors } = useForm({
    validationSchema: schema,
});

const isValid = useIsFormValid();
const [packageUnit] = defineField('packageUnit');
const [amount] = defineField('amount');
const [price] = defineField('price');
const [purchaseDate] = defineField('purchaseDate');
const [expirationDate] = defineField('expirationDate');
const [leftoverAmountPercentage] = defineField('leftoverAmountPercentage');
const [comment] = defineField('comment');
const createAmount = ref(1);

const dayjs = useDayjs();
const save = handleSubmit(async ({ packageUnit, amount, price, purchaseDate, expirationDate, leftoverAmountPercentage, comment }) => {
    await createPurchasedItem({
        status: true,
        itemId: item.value.id,
        packageUnitId: packageUnit.id,
        amount,
        price,
        purchaseDate: purchaseDate ? dayjs(purchaseDate).format('YYYY-MM-DD') : null,
        expirationDate: expirationDate ? dayjs(expirationDate).format('YYYY-MM-DD') : null,
        leftoverAmountPercentage,
        comment,
        createAmount: createAmount.value,
    }, false);
    await getInventoryDashboardData();
    newItemDialog.value = false;
    createAmount.value = 1;
    filterList(false);
});

const confirm = useConfirm();
function confirmUse(id: number) {
    confirm.require({
        message: 'Are you sure you want to use this item?',
        group: 'positioned',
        header: 'Attention!',
        position: 'bottom',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'bg-green-600 border-none',
        acceptLabel: 'Use',
        accept: async () => {
            itemListDialog.value = false;
            await useInStockItem(id);
            await getInventoryDashboardData();
            filterList(false);
        },
    });
};
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
