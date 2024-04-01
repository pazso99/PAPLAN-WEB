<template>
    <ContentListCard
        title="Notes"
        :nav-buttons="[
            { icon: 'pi-plus', to: '/notes/notes/create' },
            { icon: 'pi-chevron-left', to: '/notes' },
        ]"
        :items="notes"
        :loading="loading"
        :multi-sort-meta="[
            { field: 'id', order: -1 },
        ]"
        :global-filter-fields="[
            'id',
            'name',
            'priority',
            'dueDate',
            'createdAt',
        ]"
        :filters="filters"
        :actions-column-meta="{
            width: '5%',
            editUrl: '/notes/notes',
            showUrl: '/notes/notes',
            canDelete: true,
        }"
        export-filename="notes"
        @refresh-table="refreshTable"
        @delete-item="removeNote"
    >
        <Column
            field="id"
            data-type="numeric"
            header="ID"
            sortable
            style="width: 10%"
        >
            <template #filter="{ filterModel }">
                <InputText
                    v-model="filterModel.value"
                    type="text"
                    class="p-column-filter"
                    placeholder="ID..."
                />
            </template>
        </Column>

        <Column
            field="status"
            header="Status"
            sortable
            :show-filter-match-modes="false"
            style="width: 10%"
        >
            <template #body="{ data }">
                <Tag
                    :value="data.status ? 'ACTIVE' : 'INACTIVE'"
                    :severity="data.status ? 'success' : 'danger'"
                />
            </template>
            <template #filter="{ filterModel }">
                <div class="flex gap-2 items-center">
                    <TriStateCheckbox
                        v-model="filterModel.value"
                        :pt="{
                            box: {
                                class: [
                                    'border-none',
                                    filterModel.value !== null ? filterModel.value ? 'bg-green-600' : 'bg-red-800' : '',
                                ],
                            },
                        }"
                    />
                    <Tag v-if="filterModel.value === true" value="ACTIVE" severity="success" />
                    <Tag v-else-if="filterModel.value === false" value="INACTIVE" severity="danger" />
                    <Tag v-else value="All" severity="info" />
                </div>
            </template>
        </Column>

        <Column
            field="name"
            header="Name"
            sortable
            :show-filter-match-modes="false"
            style="width: 25%"
        >
            <template #body="{ data }">
                {{ data.name }}
            </template>
            <template #filter="{ filterModel }">
                <InputText
                    v-model="filterModel.value"
                    class="p-column-filter"
                    placeholder="Name..."
                />
            </template>
        </Column>

        <Column
            header="Priority"
            field="priority"
            sortable
            :show-filter-match-modes="false"
            style="width: 15%"
        >
            <template #body="{ data }">
                <Tag
                    :value="getNotePriorityLabel(data.priority)"
                    :severity="getNotePriorityColor(data.priority)"
                />
            </template>
            <template #filter="{ filterModel }">
                <MultiSelect
                    v-model="filterModel.value"
                    :options="getNotePriorities()"
                    placeholder="Any"
                    class="p-column-filter"
                    :max-selected-labels="1"
                >
                    <template #option="slotProps">
                        <span>{{ slotProps.option }}</span>
                    </template>
                </MultiSelect>
            </template>
        </Column>

        <Column
            field="dueDate"
            header="DueDate"
            data-type="date"
            sortable
            style="width: 20%"
        >
            <template #body="{ data }">
                <div v-if="data.dueDate">
                    {{ $dayjs(data.dueDate).format('YYYY-MM-DD') }}
                    (<b>{{ $dayjs(data.dueDate).diff($dayjs(), 'days') }}</b> left)
                </div>
            </template>
            <template #filter="{ filterModel }">
                <Calendar
                    v-model="filterModel.value"
                    date-format="yy-mm-dd"
                    placeholder="2024-01-01"
                    mask="9999-99-99"
                />
            </template>
        </Column>

        <Column
            field="createdAt"
            header="CreatedAt"
            data-type="date"
            sortable
            style="width: 15%"
        >
            <template #body="{ data }">
                {{ $dayjs(data.createdAt).format('YYYY-MM-DD') }}
            </template>
            <template #filter="{ filterModel }">
                <Calendar
                    v-model="filterModel.value"
                    date-format="yy-mm-dd"
                    placeholder="2024-01-01"
                    mask="9999-99-99"
                />
            </template>
        </Column>
    </ContentListCard>
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterOperator } from 'primevue/api';

definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});

useHead({
    title: 'Notes - Notes',
});

const notesManagementStore = useNotesManagementStore();
const { getNotes, deleteNote } = notesManagementStore;
const { notes, loading } = storeToRefs(notesManagementStore);

const filters = ref({
    id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    priority: { value: null, matchMode: FilterMatchMode.IN },
    dueDate: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
    createdAt: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
});

onMounted(async () => {
    await getNotes();
});

async function removeNote(id: number) {
    await deleteNote(id);
    await getNotes();
}

async function refreshTable() {
    await getNotes();
}
</script>
