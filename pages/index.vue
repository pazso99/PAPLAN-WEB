<template>
    <div></div>
</template>
<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});
const router: any = useRouter();
router.push('/spending');
</script>
