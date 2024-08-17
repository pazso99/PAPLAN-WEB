<template>
    <Accordion
        :value="activeIndex"
    >
        <AccordionPanel value="0">
            <AccordionHeader>
                <span class="flex items-center gap-2 text-[15px]">
                    <i class="pi pi-credit-card text-green-600" />
                    <span class="font-bold white-space-nowrap">Spending</span>
                </span>
            </AccordionHeader>
            <AccordionContent>
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
                                <i v-if="active" class="pi pi-angle-down" />
                                <i v-else class="pi pi-angle-up" />
                            </span>
                        </a>
                    </template>
                </PanelMenu>
            </AccordionContent>
        </AccordionPanel>

        <AccordionPanel value="1">
            <AccordionHeader>
                <span class="flex items-center gap-2 text-[15px]">
                    <i class="pi pi-book text-gray-400" />
                    <span class="font-bold white-space-nowrap">Recipes</span>
                </span>
            </AccordionHeader>
            <AccordionContent>
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
                                <i v-if="active" class="pi pi-angle-down" />
                                <i v-else class="pi pi-angle-up" />
                            </span>
                        </a>
                    </template>
                </PanelMenu>
            </AccordionContent>
        </AccordionPanel>

        <AccordionPanel value="2">
            <AccordionHeader>
                <span class="flex items-center gap-2 text-[15px]">
                    <i class="pi pi-table text-blue-600" />
                    <span class="font-bold white-space-nowrap">Notes</span>
                </span>
            </AccordionHeader>
            <AccordionContent>
                <PanelMenu
                    v-model:expandedKeys="notesExpandedKeys"
                    :model="notesItems"
                    unstyled
                >
                    <template #item="{ item, root, active }">
                        <NuxtLink
                            v-if="item.route"
                            :to="item.route"
                            class="flex items-center justify-between px-3 py-2 cursor-pointer"
                            :class="route.name === 'notes' ? item.key === 'notes-dashboard' ? 'text-white' : 'text-zinc-400' : route.name.includes(item.key) ? 'text-white' : 'text-zinc-400'"
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
                                <i v-if="active" class="pi pi-angle-down" />
                                <i v-else class="pi pi-angle-up" />
                            </span>
                        </a>
                    </template>
                </PanelMenu>
            </AccordionContent>
        </AccordionPanel>

        <AccordionPanel value="3">
            <AccordionHeader>
                <span class="flex items-center gap-2 text-[15px]">
                    <i class="pi pi-box text-yellow-600" />
                    <span class="font-bold white-space-nowrap">Inventory</span>
                </span>
            </AccordionHeader>
            <AccordionContent>
                <PanelMenu
                    v-model:expandedKeys="inventoryExpandedKeys"
                    :model="inventoryItemTypes"
                    unstyled
                >
                    <template #item="{ item, root, active }">
                        <NuxtLink
                            v-if="item.route"
                            :to="item.route"
                            class="flex items-center justify-between px-3 py-2 cursor-pointer"
                            :class="route.name === 'inventory' ? item.key === 'inventory-dashboard' ? 'text-white' : 'text-zinc-400' : route.name.includes(item.key) ? 'text-white' : 'text-zinc-400'"
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
                                <i v-if="active" class="pi pi-angle-down" />
                                <i v-else class="pi pi-angle-up" />
                            </span>
                        </a>
                    </template>
                </PanelMenu>
            </AccordionContent>
        </AccordionPanel>
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

const notesItems = ref([
    {
        key: 'notes-dashboard',
        label: 'Dashboard',
        route: '/notes',
    },
    {
        key: 'notes-management',
        label: 'Management',
        items: [
            {
                key: 'notes-notes',
                label: 'Notes',
                route: '/notes/notes',
            },
        ],
    },
]);

const inventoryItemTypes = ref([
    {
        key: 'inventory-dashboard',
        label: 'Dashboard',
        route: '/inventory',
    },
    {
        key: 'inventory-management',
        label: 'Management',
        items: [
            {
                key: 'inventory-package-units',
                label: 'Package units',
                route: '/inventory/package-units',
            },
            {
                key: 'inventory-item-types',
                label: 'Item types',
                route: '/inventory/item-types',
            },
            {
                key: 'inventory-items',
                label: 'Items',
                route: '/inventory/items',
            },
            {
                key: 'inventory-purchased-items',
                label: 'Stock items',
                route: '/inventory/purchased-items',
            },
        ],
    },
]);

const route = useRoute();
const activeIndex = ref('0');
if (route.fullPath.startsWith('/recipes')) {
    activeIndex.value = '1';
} else if (route.fullPath.startsWith('/notes')) {
    activeIndex.value = '2';
} else if (route.fullPath.startsWith('/inventory')) {
    activeIndex.value = '3';
}

const spendingExpandedKeys = ref({});
const recipesExpandedKeys = ref({});
const notesExpandedKeys = ref({});
const inventoryExpandedKeys = ref({});
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
    } else if (
        [
            'notes-notes',
        ].some(e => route.name && typeof route.name === 'string' && route.name.includes(e))
    ) {
        notesExpandedKeys.value = {
            'notes-management': true,
        };
    } else if (
        [
            'inventory-item-types',
            'inventory-package-units',
            'inventory-items',
            'inventory-purchased-items',
        ].some(e => route.name && typeof route.name === 'string' && route.name.includes(e))
    ) {
        inventoryExpandedKeys.value = {
            'inventory-management': true,
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
</style>
