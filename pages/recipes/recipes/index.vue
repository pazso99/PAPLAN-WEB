<template>
    <ContentListCard
        title="Recipes"
        :nav-buttons="[
            { icon: 'pi-plus', to: '/recipes/recipes/create' },
            { icon: 'pi-chevron-left', to: '/recipes' },
        ]"
        :items="recipes"
        :loading="loading"
        :multi-sort-meta="[
            { field: 'id', order: -1 },
        ]"
        :global-filter-fields="[
            'id',
            'name',
            'time',
            'createdAt',
        ]"
        :filters="filters"
        :actions-column-meta="{
            width: '5%',
            editUrl: '/recipes/recipes',
            showUrl: '/recipes/recipes',
            canDelete: true,
        }"
        export-filename="recipes"
        @refresh-table="refreshTable"
        @delete-item="removeRecipe"
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
            field="time"
            header="Time"
            sortable
            :show-filter-match-modes="false"
            style="width: 25%"
        >
            <template #body="{ data }">
                {{ data.time }}
            </template>
            <template #filter="{ filterModel }">
                <InputText
                    v-model="filterModel.value"
                    class="p-column-filter"
                    placeholder="Time..."
                />
            </template>
        </Column>

        <Column
            field="createdAt"
            header="CreatedAt"
            data-type="date"
            sortable
            style="width: 25%"
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
    title: 'Recipes - Recipes',
});

const recipesManagementStore = useRecipesManagementStore();
const { getRecipes, deleteRecipe } = recipesManagementStore;
const { recipes, loading } = storeToRefs(recipesManagementStore);

const filters = ref({
    id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    time: { value: null, matchMode: FilterMatchMode.CONTAINS },
    createdAt: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
});

onMounted(async () => {
    await getRecipes();
});

async function removeRecipe(id: number) {
    await deleteRecipe(id);
    await getRecipes();
}

async function refreshTable() {
    await getRecipes();
}
</script>
