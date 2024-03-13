<template>
    <div />
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});

const router = useRouter();
router.push('/spending');
</script>
