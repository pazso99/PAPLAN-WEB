<template>
    <UCard
        class="w-full"
        :ui="{
            base: 'overflow-visible',
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

            <div class="flex items-center justify-between gap-3 px-4 py-3">
                <UInput v-model="searchValue" icon="i-heroicons-magnifying-glass-20-solid" placeholder="Search..." />
                <div class="flex gap-2">
                    <USelectMenu
                        v-model="selectedColumns"
                        :options="tableData.columns"
                        multiple
                        class="w-36"
                    >
                        <UButton
                            icon="i-heroicons-view-columns"
                            color="gray"
                            size="xs"
                            class="w-full"
                        >
                            Columns
                        </UButton>

                        <template #option="{ option }">
                            <span class="text-md">{{ option.text }}</span>
                        </template>
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
        </template>

        <EasyDataTable
            :headers="columns"
            :items="tableData.items"
            table-class-name="paplan-list-table"
            theme-color="#0675d4"
            multi-sort
            :sort-by="sortBy"
            :sort-type="sortType"
            buttons-pagination
            :rows-per-page="12"
            :search-field="tableData.searchField"
            :search-value="searchValue"
        >
            <template #item-status="item">
                <UBadge size="xs" :label="item.status ? 'Active' : 'Inactive'" :color="item.status ? 'emerald' : 'red'" variant="subtle" />
            </template>

            <template #item-transactionType="item">
                <UBadge
                    size="xs"
                    :label="item.transactionType === 'income' ? 'income' : 'expense'"
                    :color="item.transactionType === 'income' ? 'green' : 'red'"
                    variant="subtle"
                />
            </template>

            <template #item-amount="item">
                {{ $formatNumber(item.amount) }}
            </template>

            <template #item-createdAt="item">
                {{ $dayjs(item.createdAt).format('YYYY-MM-DD HH:mm') }}
            </template>

            <template #item-actions="item">
                <UButton color="blue" variant="ghost" icon="i-heroicons-pencil-square-20-solid" :to="`${tableData.url}/${item.id}`" />
                <UButton color="red" variant="ghost" icon="i-heroicons-trash-20-solid" @click="openDeleteModal(item)" />
            </template>
        </EasyDataTable>


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
    </UCard>
</template>

<script setup>
const props = defineProps(['table-data']);
const emit = defineEmits(['deleteItem']);
const isDeleteModalOpen = ref(false);
const currentRowToDelete = ref({});
const searchValue = ref('');
const sortBy = ref(props.tableData.sortBy);
const sortType = ref(props.tableData.sortType);
const selectedColumns = ref(props.tableData.columns);
const columns = computed(() => props.tableData.columns.filter((column) => selectedColumns.value.includes(column)));

watch(selectedColumns, async (newSelectedColumns) => {
    sortBy.value = [];
    sortType.value = [];
});

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
</script>
