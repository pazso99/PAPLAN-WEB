<template>
    <AppContent
        :title="'Account'"
    >
        <pre>{{ user }}</pre>
    </AppContent>
</template>
<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});

useHead({
    title: 'Account',
});

const { user } = storeToRefs(useAuthStore());
const { getUser } = useAuthStore();

onMounted(async () => {
    await getUser();
});
</script>
