<template>
    <ContentBaseCard
        title="Edit recipe"
        :nav-buttons="[
            { icon: 'pi-eye', to: `/recipes/recipes/${recipe.id}/show` },
            { icon: 'pi-chevron-left', to: '/recipes/recipes' },
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
                    <label for="time" class="mb-1">Time</label>
                    <InputText
                        id="time"
                        v-model="time"
                        name="time"
                        :class="{ 'p-invalid': errors.time }"
                        placeholder="Time..."
                    />
                    <small class="p-error">{{ errors.time }}</small>
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
    title: 'Edit Recipe - Recipes',
});

const recipesManagementStore = useRecipesManagementStore();
const { getRecipe, updateRecipe } = recipesManagementStore;
const { recipe, loading } = storeToRefs(recipesManagementStore);

const schema = yup.object({
    name: yup.string().required().label('Name'),
    status: yup.boolean().label('Status'),
    time: yup.string().nullable().label('Time'),
    description: yup.string().nullable().label('Description'),
});

const { defineField, handleSubmit, errors } = useForm({
    validationSchema: schema,
});

const isValid = useIsFormValid();
const [id] = defineField('id');
const [name] = defineField('name');
const [status] = defineField('status');
const [time] = defineField('time');
const [description] = defineField('description');
const [createdAt] = defineField('createdAt');
const [updatedAt] = defineField('updatedAt');

const route = useRoute();
onMounted(async () => {
    await getRecipe(getIdFromRoute(route.params));
    setData();
});

const dayjs = useDayjs();
function setData() {
    id.value = recipe.value.id;
    name.value = recipe.value.name;
    status.value = recipe.value.status;
    time.value = recipe.value.time;
    description.value = recipe.value.description;
    createdAt.value = dayjs(recipe.value.createdAt).format('YYYY-MM-DD HH:mm');
    updatedAt.value = dayjs(recipe.value.updatedAt).format('YYYY-MM-DD HH:mm');
}

const save = handleSubmit(async ({ id, status, name, time, description }) => {
    await updateRecipe({
        id,
        status,
        name,
        time,
        description,
    });
    setData();
});
</script>
