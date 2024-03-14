import { defineStore } from 'pinia';
import type { RecipesDashboardResponse } from '~/types/responses';
import type { RecipesDashboardState } from '~/types/stores';

export const useRecipesDashboardStore = defineStore('recipes-dashboard', {
    state: () => ({
        loading: true,
        recipes: [],
    } as RecipesDashboardState),
    actions: {
        async getRecipeDashboardData() {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<RecipesDashboardResponse>('dashboard/recipes-data');

                this.recipes = response.data.recipes;
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
    },
});
