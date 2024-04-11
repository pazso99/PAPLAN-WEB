<template>
    <div class="flex items-center justify-center lg:justify-start min-h-screen">
        <div class="flex justify-center lg:w-1/2">
            <NuxtPage />
        </div>
        <div class="absolute top-0 right-0 hidden lg:flex lg:w-1/2 h-full">
            <div class="h-full w-full bg-cover paplan-bg">
                <div class="h-full w-full bg-cover opacity-60 bg-gradient-to-tl from-blue-500 to-violet-500" />
            </div>
        </div>
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
