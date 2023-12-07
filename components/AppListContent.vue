<template>
    <UCard
        class="w-full"
        :ui="{
            divide: 'divide-y divide-gray-200 dark:divide-gray-700',
            header: { padding: '' },
            body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
            footer: { padding: 'p-4' }
        }"
    >
        <template #header>
            <div class="flex items-center justify-between gap-3 px-4 py-3">
                <h2 class="font-semibold text-xl text-gray-900 dark:text-white leading-tight">
                    {{ tableData.title }}
                </h2>
                <UButton color="gray" variant="ghost" icon="i-heroicons-plus-20-solid" :to="`${tableData.url}/create`" />
            </div>
        </template>

        <div class="flex items-center justify-between gap-3 px-4 py-3">
            <div class="flex gap-1.5 items-center">
                <USelectMenu v-model="selectedColumns" :options="tableData.columns" multiple>
                    <UButton
                        icon="i-heroicons-view-columns"
                        color="gray"
                        size="xs"
                    >
                        Columns
                    </UButton>
                </USelectMenu>
                <UButton
                    icon="i-heroicons-funnel"
                    color="gray"
                    size="xs"
                    :disabled="selectedColumns.length === tableData.columns.length"
                    @click="resetFilters"
                >
                    Reset
                </UButton>
            </div>
        </div>

        <UTable
            v-model:sort="sort"
            :rows="filteredRows"
            :columns="columnsTable"
            sort-asc-icon="i-heroicons-arrow-up"
            sort-desc-icon="i-heroicons-arrow-down"
            class="w-full"
            :ui="{ td: { base: 'max-w-[0] truncate' } }"
        >
            <template #status-data="{ row }">
                <UBadge size="xs" :label="row.status ? 'Active' : 'Inactive'" :color="row.status ? 'emerald' : 'red'" variant="subtle" />
            </template>

            <template #transactionType-data="{ row: { transactionType, amount } }">
                <UBadge
                    v-if="tableData.url === '/spending/transaction-categories'"
                    size="xs"
                    :label="transactionType === 'income' ? 'income' : 'expense'"
                    :color="transactionType === 'income' ? 'green' : 'red'"
                    variant="subtle"
                />
                <UBadge
                    v-if="tableData.url === '/spending/transactions'"
                    size="xs"
                    :color="transactionType === 'income' ? 'green' : 'red'"
                    variant="subtle"
                >
                    {{ amount }}
                </UBadge>
            </template>

            <template #createdAt-data="{ row }">
                {{ $dayjs(row.createdAt).format('YYYY-MM-DD HH:mm') }}
            </template>

            <template #actions-data="{ row }">
                <UButton color="gray" variant="ghost" icon="i-heroicons-pencil-square-20-solid" :to="`${tableData.url}/${row.id}`" />
                <UButton color="red" variant="ghost" icon="i-heroicons-trash-20-solid" @click="openDeleteModal(row)" />
            </template>
        </UTable>
        <UModal v-model="isDeleteModalOpen" prevent-close>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Are you sure want to delete this item?
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="closeDeleteModal" />
                    </div>
                </template>

                <div class="flex items-center justify-between">
                    <UButton label="Delete" color="red" @click="deleteItem" />
                    <UButton label="Cancel" color="gray" variant="ghost" @click="closeDeleteModal" />
                </div>
            </UCard>
        </UModal>
        <!-- <template #footer>
            <div class="flex flex-wrap justify-between items-center">
                <UPagination
                    v-model="page"
                    :page-count="pageCount"
                    :total="tableData.items.length"
                    :ui="{
                        wrapper: 'flex items-center gap-1',
                        rounded: '!rounded-full min-w-[32px] justify-center',
                        default: {
                            activeButton: {
                                variant: 'outline'
                            }
                        }
                    }"
                />
                <div class="flex items-center gap-1.5">
                    <span class="text-sm leading-5">Rows per page:</span>
                    <USelect
                        v-model="pageCount"
                        :options="[10, 20, 30, 40, 50]"
                        class="me-2 w-20"
                        size="xs"
                    />
                </div>
            </div>
        </template> -->
    </UCard>
</template>

<script setup>
const props = defineProps(['table-data']);
const emit = defineEmits(['deleteItem']);
// FIXME
const page = ref(1);
const pageCount = ref(10);
const selectedColumns = ref(props.tableData.columns);
const filteredRows = ref();
/* const filteredRows = computed(() => {
    return props.tableData.items.slice((page.value - 1) * pageCount.value, (page.value) * pageCount.value);
}); */
const columnsTable = computed(() => props.tableData.columns.filter((column) => selectedColumns.value.includes(column)));
const isDeleteModalOpen = ref(false)
const currentRowToDelete = ref({})
const sort = ref();

function resetFilters() {
    selectedColumns.value = props.tableData.columns;
};

function openDeleteModal(rowToDelete) {
    currentRowToDelete.value = rowToDelete;
    isDeleteModalOpen.value = true;
}

function closeDeleteModal() {
    isDeleteModalOpen.value = false;
}

function deleteItem() {
    isDeleteModalOpen.value = false;
    emit('deleteItem', currentRowToDelete.value)
}

onMounted(() => {
    filteredRows.value = props.tableData.items;
});

// TODO
/* watch(sort, (newSort, oldSort) => {
    console.log('Sort changed:', newSort, oldSort);
    // Perform actions based on the new sort value
    filteredRows.value = props.tableData.items.slice((page.value - 1) * pageCount.value, (page.value) * pageCount.value);
}, { deep: true }); */
</script>
