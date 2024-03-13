<template>
    <ContentBaseCard
        title="Account"
        :loading="loading"
    >
        <pre>{{ user }}</pre>
    </ContentBaseCard>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});

useHead({
    title: 'Account',
});

const authStore = useAuthStore();
const { user, loading } = storeToRefs(authStore);
const { getUser } = authStore;

onMounted(async () => {
    await getUser();
});
</script>
