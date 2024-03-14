<template>
    <Accordion
        :active-index="activeIndex"
    >
        <AccordionTab>
            <template #header>
                <span class="flex items-center gap-2 text-[15px]">
                    <i class="pi pi-credit-card text-green-600" />
                    <span class="font-bold white-space-nowrap">Spending</span>
                </span>
            </template>
            <PanelMenu
                v-model:expandedKeys="spendingExpandedKeys"
                :model="spendingItems"
                unstyled
            >
                <template #item="{ item, root, active }">
                    <NuxtLink
                        v-if="item.route"
                        :to="item.route"
                        class="flex items-center justify-between px-3 py-2 cursor-pointer"
                        :class="route.name === 'spending' ? item.key === 'spending-dashboard' ? 'text-white' : 'text-zinc-400' : route.name.includes(item.key) ? 'text-white' : 'text-zinc-400'"
                        @click="isMobile && toggleNav()"
                    >
                        <span class="text-sm" :class="[root ? 'ml-2' : 'ml-6']">{{ item.label }}</span>
                    </NuxtLink>
                    <a
                        v-else
                        v-ripple
                        class="flex items-center justify-between px-3 py-2 cursor-pointer text-zinc-400"
                    >
                        <span class="ml-2 text-sm">{{ item.label }}</span>
                        <span>
                            <i v-if="active" class="pi pi-angle-up" />
                            <i v-else class="pi pi-angle-down" />
                        </span>
                    </a>
                </template>
            </PanelMenu>
        </AccordionTab>

        <AccordionTab>
            <template #header>
                <span class="flex items-center gap-2 text-[15px]">
                    <i class="pi pi-book text-yellow-600" />
                    <span class="font-bold white-space-nowrap">Recipes</span>
                </span>
            </template>
            <PanelMenu
                v-model:expandedKeys="recipesExpandedKeys"
                :model="recipesItems"
                unstyled
            >
                <template #item="{ item, root, active }">
                    <NuxtLink
                        v-if="item.route"
                        :to="item.route"
                        class="flex items-center justify-between px-3 py-2 cursor-pointer"
                        :class="route.name === 'recipes' ? item.key === 'recipes-dashboard' ? 'text-white' : 'text-zinc-400' : route.name.includes(item.key) ? 'text-white' : 'text-zinc-400'"
                        @click="isMobile && toggleNav()"
                    >
                        <span class="text-sm" :class="[root ? 'ml-2' : 'ml-6']">{{ item.label }}</span>
                    </NuxtLink>
                    <a
                        v-else
                        v-ripple
                        class="flex items-center justify-between px-3 py-2 cursor-pointer text-zinc-400"
                    >
                        <span class="ml-2 text-sm">{{ item.label }}</span>
                        <span>
                            <i v-if="active" class="pi pi-angle-up" />
                            <i v-else class="pi pi-angle-down" />
                        </span>
                    </a>
                </template>
            </PanelMenu>
        </AccordionTab>

        <AccordionTab>
            <template #header>
                <span class="flex items-center gap-2 text-[15px]">
                    <i class="pi pi-home" />
                    <span class="font-bold white-space-nowrap">Inventory</span>
                </span>
            </template>
        </AccordionTab>

        <AccordionTab>
            <template #header>
                <span class="flex items-center gap-2 text-[15px]">
                    <i class="pi pi-table" />
                    <span class="font-bold white-space-nowrap">Notes</span>
                </span>
            </template>
        </AccordionTab>
    </Accordion>
</template>

<script setup lang="ts">
defineProps<{
    isMobile?: boolean;
}>();

const { toggleNav } = useNavigationStore();

const spendingItems = ref([
    {
        key: 'spending-dashboard',
        label: 'Dashboard',
        route: '/spending',
    },
    {
        key: 'spending-settings',
        label: 'Settings',
        route: '/spending/settings',
    },
    {
        key: 'spending-management',
        label: 'Management',
        items: [
            {
                key: 'spending-accounts',
                label: 'Accounts',
                route: '/spending/accounts',
            },
            {
                key: 'spending-transaction-categories',
                label: 'Transaction categories',
                route: '/spending/transaction-categories',
            },
            {
                key: 'spending-transactions',
                label: 'Transactions',
                route: '/spending/transactions',
            },
        ],
    },
]);

const recipesItems = ref([
    {
        key: 'recipes-dashboard',
        label: 'Dashboard',
        route: '/recipes',
    },
    {
        key: 'recipes-management',
        label: 'Management',
        items: [
            {
                key: 'recipes-recipes',
                label: 'Recipes',
                route: '/recipes/recipes',
            },
        ],
    },
]);

const route = useRoute();
const activeIndex = ref(0);
if (route.fullPath.startsWith('/recipes')) {
    activeIndex.value = 1;
}

const spendingExpandedKeys = ref({});
const recipesExpandedKeys = ref({});
watch(() => route.name, () => {
    if (
        [
            'spending-accounts',
            'spending-transaction-categories',
            'spending-transactions',
        ].some(e => route.name && typeof route.name === 'string' && route.name.includes(e))
    ) {
        spendingExpandedKeys.value = {
            'spending-management': true,
        };
    } else if (
        [
            'recipes-recipes',
        ].some(e => route.name && typeof route.name === 'string' && route.name.includes(e))
    ) {
        recipesExpandedKeys.value = {
            'recipes-management': true,
        };
    }
}, { immediate: true });
</script>

<style lang="scss" scoped>
:deep(.p-accordion-header-action) {
    padding: 12px;
}

:deep(.p-accordion-content) {
    padding: 0 6px 6px 18px;
}

:deep(.p-panelmenu-panel) {
    border: none;
}

:deep(.p-panelmenu) {
    font-weight: 0;
}
</style>
