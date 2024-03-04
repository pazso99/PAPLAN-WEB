<template>
    <ContentBaseCard
        :title="title"
        :navButtons="buttons"
        :loading="loading"
    >
        <DataTable
            :value="items"
            stripedRows
            size="small"
            paginator
            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
            :rows="10"
            :rowsPerPageOptions="[10, 25, 50, 100]"
            sortMode="multiple"
            :multiSortMeta="multiSortMeta"
            removableSort
            v-model:filters="filters"
            filterDisplay="menu"
            :globalFilterFields="globalFilterFields"
        >
            <template #empty>No data.</template>
            <template #header>
                <div class="flex justify-between pl-2">
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Search..." />
                    </IconField>
                    <Button
                        type="button"
                        size="small"
                        severity="contrast"
                        icon="pi pi-filter-slash"
                        text
                        rounded
                        @click="clearFilter()"
                    />
                </div>
            </template>

            <slot></slot>

            <Column
                :style="`width: ${actionsColumnMeta.width}`"
            >
                <template #header>
                    <div class="md:hidden flex-1 text-center">
                        <i class="pi pi-cog"></i>
                    </div>
                </template>
                <template #body="{ data }">
                    <div class="flex justify-end">
                        <NuxtLink :to="`${actionsColumnMeta.editUrl}/${data.id}`">
                            <Button
                                icon="pi pi-pencil"
                                severity="contrast"
                                text
                                rounded
                            />
                        </NuxtLink>
                        <Button
                            icon="pi pi-trash"
                            severity="danger"
                            text
                            rounded a
                            @click="openDeleteModal(data)"
                        />
                    </div>
                </template>
            </Column>

            <template #paginatorstart>
                <!-- <Button
                    type="button"
                    severity="contrast"
                    icon="pi pi-download"
                    text
                /> -->
                <Button
                    type="button"
                    severity="contrast"
                    icon="pi pi-refresh"
                    text
                    @click="handleRefresh"
                />
            </template>
        </DataTable>
        <Dialog
            v-model:visible="deleteModalVisible"
            modal
            header="Warning!"
            class="w-[25rem]"
        >
            <span class="p-text-secondary block mb-5">
                Are you sure want to delete this item? (<b>{{ deletableItem.id }}</b>)
            </span>
            <div class="flex justify-between gap-2">
                <Button
                    type="button"
                    label="Cancel"
                    severity="secondary"
                    @click="deleteModalVisible = false"
                />
                <Button
                    type="button"
                    label="Delete"
                    severity="danger"
                    @click="handleDelete"
                />
            </div>
        </Dialog>

        <template #loading>
            <DataTable :value="new Array(10)">
                <template #header>
                    <div class="flex justify-between pl-2 gap-5">
                        <Skeleton width="16rem" height="2rem"></Skeleton>
                        <Skeleton size="2rem"></Skeleton>
                    </div>
                </template>
                <Column
                    sortable
                    style="width: 10%"
                >
                    <template #header>
                        <Skeleton></Skeleton>
                    </template>
                    <template #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column
                    sortable
                    style="width: 30%"
                >
                    <template #header>
                        <Skeleton></Skeleton>
                    </template>
                    <template #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column
                    sortable
                    style="width: 20%"
                >
                    <template #header>
                        <Skeleton></Skeleton>
                    </template>
                    <template #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column
                    sortable
                    style="width: 15%"
                >
                    <template #header>
                        <Skeleton></Skeleton>
                    </template>
                    <template #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column
                    sortable
                    style="width: 15%"
                >
                    <template #header>
                        <Skeleton></Skeleton>
                    </template>
                    <template #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
                <Column
                    style="width: 10%"
                >
                    <template #body>
                        <Skeleton></Skeleton>
                    </template>
                </Column>
            </DataTable>
        </template>
    </ContentBaseCard>
</template>

<script setup lang="ts">
import { FilterMatchMode } from 'primevue/api';

const props = defineProps([
    'title',
    'buttons',
    'loading',
    'items',
    'multiSortMeta',
    'globalFilterFields',
    'filters',
    'actionsColumnMeta'
]);

const filters = ref();
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        ...props.filters
    };
};
initFilters();

const clearFilter = () => {
    initFilters();
};

const emit = defineEmits(['deleteItem', 'refreshTable']);
const deleteModalVisible = ref(false);
const deletableItem = ref({ id: null });

async function openDeleteModal(deletableData: any) {
    deletableItem.value = deletableData;
    deleteModalVisible.value = true;
}

const handleDelete = () => {
    emit('deleteItem', deletableItem.value.id);
    deletableItem.value = { id: null };
    deleteModalVisible.value = false;
};

const handleRefresh = () => {
    emit('refreshTable');
};
</script>
