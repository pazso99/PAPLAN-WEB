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
                        class="flex"
                    >
                        <template v-if="navButtons">
                            <NuxtLink
                                v-for="button, i in navButtons"
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
                        <NuxtLink
                            v-if="navBackButton"
                            :to="previousRoute"
                        >
                            <Button
                                text
                                rounded
                                severity="contrast"
                                icon="pi pi-chevron-left"
                            />
                        </NuxtLink>
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
withDefaults(defineProps<{
    loading?: boolean;
    title: string;
    customHeader?: boolean;
    navButtons?: { icon: string; to: string }[];
    navBackButton?: boolean;
}>(), {
    loading: false,
    navBackButton: false,
});

const navigationStore = useNavigationStore();
const { previousRoute } = storeToRefs(navigationStore);
</script>
