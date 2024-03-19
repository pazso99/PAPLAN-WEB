<template>
    <ContentBaseCard
        title="Edit note"
        :nav-buttons="[
            { icon: 'pi-eye', to: `/notes/notes/${note.id}/show` },
            { icon: 'pi-chevron-left', to: '/notes/notes' },
        ]"
        :loading="loading"
    >
        <form class="p-5">
            <div class="flex flex-col mb-4">
                <label for="status" class="mb-1">Status</label>
                <div class="flex items-center gap-2">
                    <InputSwitch
                        id="status"
                        v-model="status"
                        :pt="{
                            slider: { class: status ? 'bg-green-600' : 'bg-red-800' },
                        }"
                    />
                    <Tag
                        :value="status ? 'ACTIVE' : 'INACTIVE'"
                        :severity="status ? 'success' : 'danger'"
                    />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div class="flex flex-col mb-4">
                    <label for="id" class="mb-1">ID</label>
                    <InputNumber
                        id="id"
                        v-model="id"
                        disabled
                    />
                </div>
                <div class="flex flex-col mb-4">
                    <label for="createdAt" class="mb-1">Created at</label>
                    <Calendar
                        id="createdAt"
                        v-model="createdAt"
                        disabled
                    />
                </div>
                <div class="flex flex-col mb-4">
                    <label for="updatedAt" class="mb-1">Updated at</label>
                    <Calendar
                        id="updatedAt"
                        v-model="updatedAt"
                        disabled
                    />
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div class="flex flex-col">
                    <label for="name" class="mb-1">Name</label>
                    <InputText
                        id="name"
                        v-model="name"
                        name="name"
                        :class="{ 'p-invalid': errors.name }"
                        placeholder="Name..."
                    />
                    <small class="p-error">{{ errors.name }}</small>
                </div>

                <div class="flex flex-col">
                    <label for="priority" class="mb-1">Priority</label>
                    <Dropdown
                        id="priority"
                        v-model="priority"
                        :options="priorityOptions"
                        placeholder="Select a priority"
                    >
                        <template #value="slotProps">
                            <Tag
                                v-if="slotProps.value"
                                :value="getNotePriorityLabel(slotProps.value)"
                                :severity="getNotePriorityColor(slotProps.value)"
                            />
                        </template>
                        <template #option="slotProps">
                            <Tag
                                v-if="slotProps.option"
                                :value="getNotePriorityLabel(slotProps.option)"
                                :severity="getNotePriorityColor(slotProps.option)"
                            />
                        </template>
                    </Dropdown>
                </div>

                <div class="flex flex-col">
                    <label for="dueDate" class="mb-1">Due date</label>
                    <Calendar
                        id="dueDate"
                        v-model="dueDate"
                        date-format="yy-mm-dd"
                    />
                </div>
            </div>

            <div class="grid grid-cols-1 mb-4">
                <div class="flex flex-col">
                    <label for="description" class="mb-1">Description</label>
                    <Editor
                        v-model="description"
                        editor-style="height: 320px"
                    >
                        <template #toolbar>
                            <span class="ql-formats">
                                <button class="ql-header" value="1" />
                                <button class="ql-header" value="2" />
                            </span>
                            <span class="ql-formats">
                                <button class="ql-bold" />
                                <button class="ql-italic" />
                                <button class="ql-underline" />
                                <button class="ql-strike" />
                                <button class="ql-script" value="sub" />
                                <button class="ql-script" value="super" />
                            </span>
                            <span class="ql-formats">
                                <select class="ql-color" />
                                <select class="ql-background" />
                            </span>
                            <span class="ql-formats">
                                <button class="ql-list" value="ordered" />
                                <button class="ql-list" value="bullet" />
                                <button class="ql-indent" value="-1" />
                                <button class="ql-indent" value="+1" />
                            </span>
                            <span class="ql-formats">
                                <button class="ql-link" />
                                <button class="ql-image" />
                            </span>
                            <span class="ql-formats">
                                <button class="ql-clean" />
                            </span>
                        </template>
                    </Editor>
                    <small class="p-error">{{ errors.description }}</small>
                </div>
            </div>

            <Button
                size="small"
                label="Save"
                type="submit"
                :disabled="!isValid"
                @click="save"
            />
        </form>
    </ContentBaseCard>
</template>

<script setup lang="ts">
import * as yup from 'yup';
import Editor from 'primevue/editor';

definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});

useHead({
    title: 'Edit Note - Notes',
});

const notesManagementStore = useNotesManagementStore();
const { getNote, updateNote } = notesManagementStore;
const { note, loading } = storeToRefs(notesManagementStore);

const priorityOptions = ref(getNotePriorities());
const schema = yup.object({
    name: yup.string().required().label('Name'),
    status: yup.boolean().label('Status'),
    priority: yup.string().oneOf(priorityOptions.value).required().label('Priority'),
    dueDate: yup.date().nullable().label('Due date'),
    description: yup.string().nullable().label('Description'),
});

const { defineField, handleSubmit, errors } = useForm({
    validationSchema: schema,
});

const isValid = useIsFormValid();
const [id] = defineField('id');
const [name] = defineField('name');
const [status] = defineField('status');
const [priority] = defineField('priority');
const [dueDate] = defineField('dueDate');
const [description] = defineField('description');
const [createdAt] = defineField('createdAt');
const [updatedAt] = defineField('updatedAt');

const route = useRoute();
onMounted(async () => {
    await getNote(getIdFromRoute(route.params));
    setData();
});

const dayjs = useDayjs();
function setData() {
    id.value = note.value.id;
    name.value = note.value.name;
    status.value = note.value.status;
    priority.value = note.value.priority;
    dueDate.value = note.value.dueDate ? dayjs(note.value.dueDate).format('YYYY-MM-DD') : null;
    description.value = note.value.description;
    createdAt.value = dayjs(note.value.createdAt).format('YYYY-MM-DD HH:mm');
    updatedAt.value = dayjs(note.value.updatedAt).format('YYYY-MM-DD HH:mm');
}

const save = handleSubmit(async ({ id, status, name, priority, dueDate, description }) => {
    await updateNote({
        id,
        status,
        name,
        priority,
        dueDate: dueDate ? dayjs(dueDate).format('YYYY-MM-DD') : null,
        description,
    });
    setData();
});
</script>
