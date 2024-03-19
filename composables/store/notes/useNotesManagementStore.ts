import { defineStore } from 'pinia';
import type { NotesManagementState } from '~/types/stores';
import type {
    NotesNoteCreateRequest,
    NotesNoteUpdateRequest,
} from '~/types/requests';
import type {
    NotesNoteListResponse,
    NotesNoteResponse,
} from '~/types/responses';
import type { Note } from '~/types/models';

export const useNotesManagementStore = defineStore('notes-management', {
    state: () => ({
        loading: true,
        notes: [],
        note: <Note>{},
    } as NotesManagementState),
    actions: {
        async getNotes() {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<NotesNoteListResponse>('notes/notes');

                this.notes = response.data.map(note => ({
                    ...note,
                    dueDate: note.dueDate ? new Date(note.dueDate) : null,
                    createdAt: new Date(note.createdAt),
                    updatedAt: new Date(note.updatedAt),
                }));
            } catch (err: any) {
                navigateTo('/notes');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async getNote(id: number) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<NotesNoteResponse>(`notes/notes/${id}`);
                this.note = response.data;
            } catch (err: any) {
                navigateTo('/notes/notes');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async createNote(data: NotesNoteCreateRequest) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<NotesNoteResponse>('notes/notes', {
                    method: 'POST',
                    body: data,
                });
                this.note = response.data;
                toast.add({ summary: 'Record created!', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                navigateTo('/notes/notes');
                this.loading = false;
            }
        },
        async updateNote(data: NotesNoteUpdateRequest) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<NotesNoteResponse>(`notes/notes/${data.id}`, {
                    method: 'PUT',
                    body: data,
                });
                this.note = response.data;
                toast.add({ summary: 'Record updated', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                navigateTo('/notes/notes');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async deleteNote(id: number) {
            const toast = useToastService();
            try {
                this.loading = true;
                await useApiFetch<NotesNoteResponse>(`notes/notes/${id}`, {
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
