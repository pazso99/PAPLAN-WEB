<template>
    <Card
        :pt="{
            body: { class: 'p-0' },
        }"
    >
        <template #title>
            <template v-if="customHeader">
                <slot name="header" />
            </template>
            <template v-else>
                <div class="flex items-center justify-between gap-3 pr-2 pl-5 py-3 h-[50px]">
                    <h2 class="font-semibold text-xl text-white leading-tight">
                        {{ title }}
                    </h2>
                    <div
                        v-if="navButtons"
                        class="flex"
                    >
                        <template v-for="button, i in navButtons">
                            <NuxtLink
                                v-if="button.to"
                                :key="i"
                                :to="button.to"
                            >
                                <Button
                                    text
                                    rounded
                                    severity="contrast"
                                    :icon="`pi ${button.icon}`"
                                />
                            </NuxtLink>
                        </template>
                    </div>
                </div>
            </template>
            <Divider class="m-0" />
        </template>
        <template #content>
            <div v-if="loading">
                <slot name="loading" />
            </div>
            <slot v-else />
        </template>
    </Card>
</template>

<script setup lang="ts">
defineProps([
    'title',
    'actions',
    'customHeader',
    'navButtons',
    'loading',
]);
</script>
