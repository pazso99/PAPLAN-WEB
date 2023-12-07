<template>
    <div class="relative flex items-center min-h-screen p-0 overflow-hidden bg-center bg-cover">
        <div class="mx-auto px-4 w-full lg:w-4/5 z-1">
            <div class="flex flex-wrap -mx-3">
                <div class="flex flex-col w-full max-w-full px-3 mx-auto lg:mx-0 shrink-0 md:flex-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
                    <NuxtPage />
                </div>
                <div class="absolute top-0 right-0 flex-col justify-center hidden w-6/12 h-full max-w-full px-3 pr-0 my-auto text-center flex-0 lg:flex">
                    <div class="relative flex flex-col justify-center h-full px-24 bg-cover paplan-bg">
                        <span class="absolute top-0 left-0 w-full h-full bg-cover opacity-60 bg-gradient-to-tl from-blue-500 to-violet-500"></span>
                    </div>
                </div>
            </div>
        </div>
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
