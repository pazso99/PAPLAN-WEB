<template>
    <ContentBaseCard
        :title="title"
        :nav-buttons="navButtons"
        :loading="loading"
    >
        <DataTable
            ref="table"
            v-model:filters="filters"
            :value="items"
            striped-rows
            size="small"
            paginator
            paginator-template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
            :rows="10"
            :rows-per-page-options="[10, 25, 50, 100]"
            sort-mode="multiple"
            :multi-sort-meta="multiSortMeta"
            removable-sort
            filter-display="menu"
            :global-filter-fields="globalFilterFields"
            state-storage="local"
            :state-key="`${listKey}_table_state`"
            :export-filename="getExportFilename()"
        >
            <template #empty>
                No data.
            </template>
            <template #header>
                <div class="flex justify-between pl-2">
                    <IconField icon-position="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText v-model="filters.global.value" placeholder="Search..." />
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

            <slot />

            <Column
                v-if="actionsColumnMeta"
                :style="`width: ${actionsColumnMeta.width}`"
            >
                <template #header>
                    <div class="md:hidden flex-1 text-center">
                        <i class="pi pi-cog" />
                    </div>
                </template>
                <template #body="{ data }">
                    <div class="flex justify-end">
                        <NuxtLink
                            v-if="actionsColumnMeta.showUrl"
                            :to="`${actionsColumnMeta.showUrl}/${data.id}/show`"
                        >
                            <Button
                                icon="pi pi-eye"
                                severity="contrast"
                                text
                                rounded
                            />
                        </NuxtLink>
                        <NuxtLink
                            v-if="actionsColumnMeta.editUrl"
                            :to="`${actionsColumnMeta.editUrl}/${data.id}`"
                        >
                            <Button
                                icon="pi pi-pencil"
                                severity="contrast"
                                text
                                rounded
                            />
                        </NuxtLink>
                        <Button
                            v-if="actionsColumnMeta.canDelete"
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
                <Button
                    type="button"
                    severity="contrast"
                    icon="pi pi-refresh"
                    text
                    @click="handleRefresh"
                />
                <Button
                    type="button"
                    severity="contrast"
                    icon="pi pi-download"
                    text
                    @click="exportCSV"
                />
            </template>
        </DataTable>
        <Dialog
            v-model:visible="deleteModalVisible"
            modal
            header="Warning!"
            class="w-full md:w-[25rem]"
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
                        <Skeleton width="16rem" height="2rem" />
                        <Skeleton size="2rem" />
                    </div>
                </template>
                <Column
                    sortable
                    style="width: 10%"
                >
                    <template #header>
                        <Skeleton />
                    </template>
                    <template #body>
                        <Skeleton />
                    </template>
                </Column>
                <Column
                    sortable
                    style="width: 30%"
                >
                    <template #header>
                        <Skeleton />
                    </template>
                    <template #body>
                        <Skeleton />
                    </template>
                </Column>
                <Column
                    sortable
                    style="width: 20%"
                >
                    <template #header>
                        <Skeleton />
                    </template>
                    <template #body>
                        <Skeleton />
                    </template>
                </Column>
                <Column
                    sortable
                    style="width: 15%"
                >
                    <template #header>
                        <Skeleton />
                    </template>
                    <template #body>
                        <Skeleton />
                    </template>
                </Column>
                <Column
                    sortable
                    style="width: 15%"
                >
                    <template #header>
                        <Skeleton />
                    </template>
                    <template #body>
                        <Skeleton />
                    </template>
                </Column>
                <Column
                    style="width: 10%"
                >
                    <template #body>
                        <Skeleton />
                    </template>
                </Column>
            </DataTable>
        </template>
    </ContentBaseCard>
</template>

<script setup lang="ts">
import { FilterMatchMode } from 'primevue/api';
import type { DataTableFilterMeta, DataTableSortMeta } from 'primevue/datatable';

const props = defineProps<{
    title: string;
    loading: boolean;
    navButtons: { icon: string; to: string }[];
    items: object[];
    multiSortMeta: DataTableSortMeta[];
    globalFilterFields: string[];
    filters: DataTableFilterMeta;
    actionsColumnMeta?: { width: string; editUrl?: string; showUrl?: string; canDelete?: boolean };
    listKey: string;
}>();

const emit = defineEmits<{
    (e: 'deleteItem', id: number): void;
    (e: 'refreshTable'): void;
}>();

const filters = ref();
function initFilters() {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        ...props.filters,
    };
};
initFilters();

function clearFilter() {
    initFilters();
}

const deleteModalVisible = ref(false);
const deletableItem = ref<{
    id: number;
    [key: string]: any;
}>({ id: -1 });

async function openDeleteModal(deletableData: any) {
    deletableItem.value = {
        id: deletableData.id,
        ...deletableData,
    };
    deleteModalVisible.value = true;
}

function handleDelete() {
    emit('deleteItem', deletableItem.value.id);
    deletableItem.value = { id: -1 };
    deleteModalVisible.value = false;
}

function handleRefresh() {
    emit('refreshTable');
}

const dayjs = useDayjs();
function getExportFilename() {
    return `${props.listKey}_${dayjs().format('YYYY_MM_DD_HHmm')}`;
}

const table = ref();
function exportCSV() {
    table.value.exportCSV();
}
</script>
