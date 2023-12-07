<template>
    <nav class="p-2 bg-gray-800 border-b border-gray-200">
        <ul class="flex justify-between align-items-center gap-4 px-3">
            <li class="leading-loose font-bold text-transparent bg-clip-text bg-gradient-to-r to-cyan-500 from-blue-500">
                <NuxtLink to="/">PAPLAN</NuxtLink>
            </li>
            <div class="flex gap-4">
                <template v-if="isAuth">
                    <li>
                        <UButton
                            to="/account"
                            icon="i-heroicons-user"
                            size="sm"
                            color="white"
                            square
                            variant="ghost"
                        />
                    </li>
                    <li>
                        <UButton
                            icon="i-heroicons-arrow-left-on-rectangle"
                            size="sm"
                            color="white"
                            square
                            variant="ghost"
                            :disabled="disabled"
                            @click="handleLogout"
                        />
                    </li>
                </template>

                <li class="md:hidden">
                    <UButton
                        :icon="isNavOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
                        size="sm"
                        color="white"
                        square
                        variant="ghost"
                        @click="toggleNav"
                    />
                    <USlideover
                        v-model="isNavOpen"
                        side="left"
                        :ui="{
                            wrapper: 'w-4/5',
                        }"
                    >
                        <AppNavigation :isMobile="true" />
                    </USlideover>
                </li>
            </div>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

const router: any = useRouter();
const disabled = ref(false);
const { logout, isAuth } = useAuthStore();
const { toggleNav } = useNavigationStore();
const { isNavOpen } = storeToRefs(useNavigationStore());

async function handleLogout() {
    disabled.value = true;
    await logout();
    router.push('/login');
};
</script>
