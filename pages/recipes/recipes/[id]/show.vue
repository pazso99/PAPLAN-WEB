<template>
    <ContentBaseCard
        :title="recipe.name ?? ''"
        :nav-buttons="[
            { icon: 'pi-pencil', to: `/recipes/recipes/${recipe.id}` },
        ]"
        nav-back-button
        :loading="loading"
    >
        <div class="grid grid-cols-1 mt-4">
            <div class="flex flex-col">
                <Editor
                    v-model="recipe.description"
                    readonly
                    :pt="{
                        toolbar: { class: '!border-0' },
                        content: { class: '!border-0' },
                    }"
                >
                    <template #toolbar>
                        <div class="flex justify-end items-center gap-2 px-2">
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
    navBackRoute: '/recipes/recipes',
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
