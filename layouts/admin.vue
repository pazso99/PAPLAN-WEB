<template>
    <AppHeader />
    <div class="flex h-full">
        <aside class="w-1/6 bg-gray-800 h-full hidden md:block">
            <AppNavigation />
        </aside>

        <main class="w-full md:w-5/6 p-4 pb-1 h-full overflow-y-auto">
            <NuxtPage />
        </main>
    </div>
    <UNotifications />
</template>

<script setup>
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - Paplan` : 'Paplan';
    }
})
</script>
