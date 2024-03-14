import { defineStore } from 'pinia';
import type { RecipesManagementState } from '~/types/stores';
import type {
    RecipesRecipeCreateRequest,
    RecipesRecipeUpdateRequest,
} from '~/types/requests';
import type {
    RecipesRecipeListResponse,
    RecipesRecipeResponse,
} from '~/types/responses';
import type { Recipe } from '~/types/models';

export const useRecipesManagementStore = defineStore('recipes-management', {
    state: () => ({
        loading: true,
        recipes: [],
        recipe: <Recipe>{},
    } as RecipesManagementState),
    actions: {
        async getRecipes() {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<RecipesRecipeListResponse>('recipes/recipes');

                this.recipes = response.data.map(recipe => ({
                    ...recipe,
                    createdAt: new Date(recipe.createdAt),
                    updatedAt: new Date(recipe.updatedAt),
                }));
            } catch (err: any) {
                navigateTo('/recipes');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async getRecipe(id: number) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<RecipesRecipeResponse>(`recipes/recipes/${id}`);
                this.recipe = response.data;
            } catch (err: any) {
                navigateTo('/recipes/recipes');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async createRecipe(data: RecipesRecipeCreateRequest) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<RecipesRecipeResponse>('recipes/recipes', {
                    method: 'POST',
                    body: data,
                });
                this.recipe = response.data;
                toast.add({ summary: 'Record created!', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                navigateTo('/recipes/recipes');
                this.loading = false;
            }
        },
        async updateRecipe(data: RecipesRecipeUpdateRequest) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<RecipesRecipeResponse>(`recipes/recipes/${data.id}`, {
                    method: 'PUT',
                    body: data,
                });
                this.recipe = response.data;
                toast.add({ summary: 'Record updated', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                navigateTo('/recipes/recipes');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async deleteRecipe(id: number) {
            const toast = useToastService();
            try {
                this.loading = true;
                await useApiFetch<RecipesRecipeResponse>(`recipes/recipes/${id}`, {
                    method: 'DELETE',
                });
                toast.add({ summary: 'Record deleted!', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
    },
});
