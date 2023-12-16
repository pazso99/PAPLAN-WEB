<template>
    <AppContent
        :title="'Spending settings'"
        :buttons="[
            { icon: 'i-heroicons-arrow-left-20-solid', to: '/spending' }
        ]"
    >
    settings
    </AppContent>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
});
useHead({
    title: 'Spending settings',
});
</script>
