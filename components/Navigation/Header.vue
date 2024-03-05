<template>
    <Menubar
        :model="items"
        class="h-[60px] border-t-0 border-x-0 rounded-none border-white p-5"
    >
        <template #start>
            <NuxtLink to="/">
                <span class="text-xl leading-loose font-bold text-transparent bg-clip-text bg-gradient-to-r to-cyan-500 from-blue-500">
                    PAPLAN
                </span>
            </NuxtLink>
        </template>
        <template #item="{ item }">
            <NuxtLink :to="item.route">
                {{ item.label }}
            </NuxtLink>
        </template>
        <template #end>
            <div class="flex gap-4">
                <Button
                    icon="pi pi-sign-out"
                    severity="contrast"
                    text
                    rounded
                    @click="handleLogout"
                />
                <div class="md:hidden">
                    <Button
                        icon="pi pi-bars"
                        @click="toggleNav"
                    />
                    <Sidebar v-model:visible="isNavOpen">
                        <template #container>
                            <NavigationMenu :is-mobile="true" />
                        </template>
                    </Sidebar>
                </div>
            </div>
        </template>
    </Menubar>
</template>

<script setup lang="ts">
const items = ref([]);
const router: any = useRouter();
const { logout } = useAuthStore();
const { toggleNav } = useNavigationStore();
const { isNavOpen } = storeToRefs(useNavigationStore());

async function handleLogout() {
    await logout();
    router.push('/login');
};
</script>
