<template>
    <ContentBaseCard
        :title="recipe.name ?? ''"
        :nav-buttons="[
            { icon: 'pi-pencil', to: `/recipes/recipes/${recipe.id}` },
            { icon: 'pi-chevron-left', to: '/recipes/recipes' },
        ]"
        :loading="loading"
    >
        <div class="grid grid-cols-1 mt-4">
            <div class="flex flex-col">
                <Editor
                    v-model="recipe.description"
                    readonly
                >
                    <template #toolbar>
                        <div class="flex justify-between items-center gap-2 px-2">
                            <h1 class="text-lg">
                                Description
                            </h1>
                            <div>
                                <span>
                                    <i class="pi pi-stopwatch" />
                                    {{ recipe.time }}
                                </span>
                            </div>
                        </div>
                    </template>
                </Editor>
            </div>
        </div>
    </ContentBaseCard>
</template>

<script setup lang="ts">
import Editor from 'primevue/editor';

definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});

useHead({
    title: 'Recipe - Recipes',
});

const recipesManagementStore = useRecipesManagementStore();
const { getRecipe } = recipesManagementStore;
const { recipe, loading } = storeToRefs(recipesManagementStore);

const route = useRoute();
onMounted(async () => {
    await getRecipe(getIdFromRoute(route.params));
});
</script>
