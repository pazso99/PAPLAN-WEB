<template>
    <UCard
        class="w-full"
        :ui="{
            divide: 'divide-y divide-gray-200 dark:divide-gray-700',
            header: { padding: '' },
            body: { padding: 'p-4', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
        }"
    >
        <template #header v-if="customHeader">
            <slot name="header"></slot>
        </template>
        <template #header v-else>
            <div class="flex items-center justify-between gap-3 px-4 py-3">
                <h2 class="font-semibold text-xl text-gray-900 dark:text-white leading-tight">
                    {{ title }}
                </h2>
                <UButton
                    v-for="button, i in buttons"
                    :key="i"
                    color="gray"
                    variant="ghost"
                    :icon="button.icon"
                    :to="button.to"
                />
            </div>
        </template>

        <div v-if="loading">
            <div class="space-y-2">
                <USkeleton class="h-4 w-[250px]" />
                <USkeleton class="h-4 w-[200px]" />
            </div>
            <div class="space-y-2 my-2">
                <USkeleton class="h-4 w-[250px]" />
                <USkeleton class="h-4 w-[200px]" />
            </div>
            <div class="space-y-2 my-4">
                <USkeleton class="h-4 w-[450px]" />
                <USkeleton class="h-4 w-[300px]" />
            </div>
            <div class="space-y-2 my-2">
                <USkeleton class="h-4 w-[250px]" />
                <USkeleton class="h-4 w-[200px]" />
            </div>
            <div class="space-y-2 my-2">
                <USkeleton class="h-4 w-[250px]" />
                <USkeleton class="h-4 w-[200px]" />
            </div>
            <div class="space-y-2 my-2">
                <USkeleton class="h-4 w-[450px]" />
                <USkeleton class="h-4 w-[300px]" />
            </div>
            <div class="space-y-2 my-2">
                <USkeleton class="h-4 w-[350px]" />
                <USkeleton class="h-4 w-[300px]" />
            </div>
            <div class="space-y-2 my-4">
                <USkeleton class="h-4 w-[450px]" />
                <USkeleton class="h-4 w-[300px]" />
            </div>
            <div class="space-y-2 my-2">
                <USkeleton class="h-4 w-[250px]" />
                <USkeleton class="h-4 w-[200px]" />
            </div>
        </div>
        <slot v-else></slot>

        <template #footer v-if="customFooter">
            <slot name="footer"></slot>
        </template>
    </UCard>
</template>

<script setup>
const props = defineProps(['title', 'actions', 'customHeader', 'customFooter', 'buttons', 'loading']);
</script>
