<template>
    <AppContent
        :title="'Spending dashboard'"
        :buttons="[
            { icon: 'i-heroicons-arrow-left-20-solid', to: '/' }
        ]"
    >
        <p>Spending dashboard</p>
    </AppContent>

  </template>
<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});
useHead({
    title: 'Spending Dashboard',
});
</script>
