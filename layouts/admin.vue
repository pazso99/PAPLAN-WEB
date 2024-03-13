<template>
    <NavigationHeader />
    <div class="flex h-[calc(100vh-60px)]">
        <aside class="w-1/6 h-full hidden lg:block bg-gradient-to-tr from-zinc-900 to-zinc-900">
            <NavigationMenu />
        </aside>
        <main class="w-full lg:w-5/6 sm:p-4 h-full overflow-y-auto">
            <NuxtPage />
        </main>
    </div>
    <Toast position="top-center" />
</template>

<script setup lang="ts">
useHead({
    titleTemplate: (titleChunk) => {
        return titleChunk ? `${titleChunk} - Paplan` : 'Paplan';
    },
});
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
    width: 4px;
    height: 80px;
}
::-webkit-scrollbar-track {
    background: #222A35;
}
::-webkit-scrollbar-thumb {
    background: #575c66;
    border-radius: 6px;
}
::-webkit-scrollbar-thumb:hover {
    background: #626970;
}
</style>
