<template>
    <ContentBaseCard
        title="Recipes dashboard"
        :nav-buttons="[
            { icon: 'pi-plus', to: '/recipes/recipes/create' },
        ]"
        :loading="loading"
    >
        <DataView
            :value="filteredItems"
            :layout="layout"
            data-key="id"
            paginator
            :rows="9"
            :rows-per-page-options="[9, 18, 50]"
        >
            <template #header>
                <div class="flex flex-col md:flex-row gap-2 justify-between items-center">
                    <IconField icon-position="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText
                            v-model="filter"
                            placeholder="Search..."
                            @input="filterList"
                        />
                    </IconField>
                    <SelectButton v-model="layout" />
                </div>
            </template>

            <template #empty>
                <p class="p-4">No recipes.</p>
            </template>

            <template #list="slotProps">
                <div class="grid grid-cols-1 gap-4 p-4">
                    <div
                        v-for="(item, index) in slotProps.items"
                        :key="index"
                        class="flex justify-between p-4 !bg-gradient-to-tl !from-gray-700 !to-gray-800"
                    >
                        <div>
                            <div class="text-xl">{{ item.name }}</div>
                            <div
                                v-if="item.time"
                                class="text-gray-400"
                            >
                                <i class="pi pi-stopwatch" />
                                {{ item.time }}
                            </div>
                        </div>
                        <div class="flex justify-end mt-1">
                            <NuxtLink
                                :to="{ name: 'recipes-recipes-id-show', params: { id: item.id }, query: { from: '/recipes' } }"
                            >
                                <Button icon="pi pi-eye" rounded />
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </template>

            <template #grid="slotProps">
                <div class="grid grid-cols-12 gap-4 p-4">
                    <Card
                        v-for="(item, index) in slotProps.items"
                        :key="index"
                        class="col-span-12 sm:col-span-6 md:col-span-4 !bg-gradient-to-tl !from-gray-700 !to-gray-800"
                        :pt="{
                            body: {
                                class: 'h-full justify-between',
                            },
                        }"
                    >
                        <template #title>
                            {{ item.name }}
                        </template>
                        <template #subtitle>
                            <div v-if="item.time">
                                <i class="pi pi-stopwatch" />
                                {{ item.time }}
                            </div>
                        </template>
                        <template #footer>
                            <div class="flex justify-end mt-1">
                                <NuxtLink
                                    :to="{ name: 'recipes-recipes-id-show', params: { id: item.id }, query: { from: '/recipes' } }"
                                >
                                    <Button icon="pi pi-eye" rounded />
                                </NuxtLink>
                            </div>
                        </template>
                    </Card>
                </div>
            </template>
        </DataView>

        <template #loading>
            <DataView
                :value="new Array(9)"
                data-key="id"
                layout="grid"
            >
                <template #grid="slotProps">
                    <div class="grid grid-cols-12 gap-4 p-4">
                        <Skeleton
                            v-for="(item, index) in slotProps.items"
                            :key="index"
                            class="col-span-12 sm:col-span-6 md:col-span-4 "
                            width="100%"
                            height="14rem"
                        />
                    </div>
                </template>
            </DataView>
        </template>
    </ContentBaseCard>
</template>

<script setup lang="ts">
import type { RecipeBasic } from '~/types/models';

definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});

useHead({
    title: 'Recipes Dashboard',
});

const layout = ref<'list' | 'grid'>('grid');

const recipesDashboardStore = useRecipesDashboardStore();
const { getRecipeDashboardData } = recipesDashboardStore;
const { recipes, loading } = storeToRefs(recipesDashboardStore);

const filteredItems = ref<RecipeBasic[]>([]);

onMounted(async () => {
    await getRecipeDashboardData();
    filteredItems.value = recipes.value;
});

const filter = ref<string>('');
function filterList() {
    filteredItems.value = recipes.value.filter(recipe => recipe.name.toLowerCase().includes(filter.value.toLowerCase()));
};
</script>
