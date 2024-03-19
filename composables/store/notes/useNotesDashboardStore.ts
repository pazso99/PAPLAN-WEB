import { defineStore } from 'pinia';
import type { NotesDashboardResponse } from '~/types/responses';
import type { NotesDashboardState } from '~/types/stores';

export const useNotesDashboardStore = defineStore('notes-dashboard', {
    state: () => ({
        loading: true,
        notes: [],
    } as NotesDashboardState),
    actions: {
        async getNoteDashboardData() {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<NotesDashboardResponse>('dashboard/notes-data');

                this.notes = response.data.notes;
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
    },
});
