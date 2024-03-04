<template>
    <Accordion
        :activeIndex="activeIndex"
    >
        <AccordionTab>
            <template #header>
                <span class="flex items-center gap-2 text-[15px]">
                    <i class="pi pi-credit-card text-green-600"></i>
                    <span class="font-bold white-space-nowrap">Spending</span>
                </span>
            </template>
            <PanelMenu
                :model="items"
                v-model:expandedKeys="expandedKeys"
                unstyled
            >
                <template #item="{ item, root, active }">
                    <NuxtLink
                        v-if="item.route"
                        v-slot="{ href, navigate }"
                        :to="item.route"
                        custom
                    >
                        <a
                            v-ripple
                            class="flex items-center justify-between px-3 py-2 cursor-pointer"
                            :class="route.name === 'spending' ? item.key === 'spending-dashboard' ? 'text-white' : 'text-zinc-400' : route.name.includes(item.key) ? 'text-white' : 'text-zinc-400'"
                            :href="href"
                            @click="navigate"
                        >
                            <span :class="['text-sm', root ? 'ml-2' : 'ml-6']">{{ item.label }}</span>
                        </a>
                    </NuxtLink>
                    <a
                        v-else
                        v-ripple
                        class="flex items-center justify-between px-3 py-2 cursor-pointer text-zinc-400"
                    >
                        <span class="ml-2 text-sm">{{ item.label }}</span>
                        <span>
                            <i v-if="active" class="pi pi-angle-up"></i>
                            <i v-else class="pi pi-angle-down"></i>
                        </span>
                    </a>
                </template>
            </PanelMenu>
        </AccordionTab>

        <AccordionTab>
            <template #header>
                <span class="flex items-center gap-2 text-[15px]">
                    <i class="pi pi-home"></i>
                    <span class="font-bold white-space-nowrap">Inventory</span>
                </span>
            </template>
        </AccordionTab>

        <AccordionTab>
            <template #header>
                <span class="flex items-center gap-2 text-[15px]">
                    <i class="pi pi-book"></i>
                    <span class="font-bold white-space-nowrap">Recipes</span>
                </span>
            </template>
        </AccordionTab>

        <AccordionTab>
            <template #header>
                <span class="flex items-center gap-2 text-[15px]">
                    <i class="pi pi-table"></i>
                    <span class="font-bold white-space-nowrap">Notes</span>
                </span>
            </template>
        </AccordionTab>
    </Accordion>
</template>

<script setup lang="ts">
defineProps(['isMobile']);

const items = ref([
    {
        key: 'spending-dashboard',
        label: 'Dashboard',
        route: '/spending'
    },
    {
        key: 'spending-settings',
        label: 'Settings',
        route: '/spending/settings'
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
            }
        ]
    },
]);

const route: any = useRoute();
const activeIndex: any = ref(0);
if (route.fullPath.startsWith('/inventory')) {
    activeIndex.value = 1
}

const expandedKeys = ref({});
if (
    route.fullPath.includes('/spending/accounts') ||
    route.fullPath.includes('/spending/transaction-categories') ||
    route.fullPath.includes('/spending/transactions')
) {
    expandedKeys.value = {
        'spending-management': true
    }
}
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
