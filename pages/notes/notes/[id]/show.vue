<template>
    <ContentBaseCard
        :title="note.name ?? ''"
        :nav-buttons="[
            { icon: 'pi-pencil', to: `/notes/notes/${note.id}` },
        ]"
        nav-back-button
        :loading="loading"
    >
        <div class="grid grid-cols-1 mt-4">
            <div class="flex flex-col">
                <Editor
                    v-model="note.description"
                    readonly
                >
                    <template #toolbar>
                        <div class="flex justify-between items-center gap-2 px-2">
                            <h1 class="text-lg">
                                Description
                            </h1>
                            <div class="flex flex-col gap-2">
                                <Tag
                                    :value="getNotePriorityLabel(note.priority)"
                                    :severity="getNotePriorityColor(note.priority)"
                                />
                                <span v-if="note.dueDate">
                                    <i class="pi pi-stopwatch" />
                                    {{ $dayjs(note.dueDate).format('YYYY-MM-DD') }}
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
    navBackRoute: '/notes/notes',
});

useHead({
    title: 'Note - Notes',
});

const notesManagementStore = useNotesManagementStore();
const { getNote } = notesManagementStore;
const { note, loading } = storeToRefs(notesManagementStore);

const route = useRoute();
onMounted(async () => {
    await getNote(getIdFromRoute(route.params));
});
</script>
