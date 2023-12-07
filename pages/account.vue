<template>
    <AppContent
        :title="'Account'"
    >
        <pre>{{ user }}</pre>
    </AppContent>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
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
