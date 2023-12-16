<template>
    <UAccordion
        :items="items"
        color="white"
        variant="ghost"
    >
        <template #default="{ item, open }">
            <UButton
                color="gray"
                variant="ghost"
                class="border-b border-gray-200 dark:border-gray-700"
                :ui="{
                    rounded: 'rounded-none',
                    padding: {
                        sm: 'p-3'
                    }
                }"
            >
                <template #leading>
                    <div class="w-6 h-6   flex items-center justify-center -my-1">
                        <UIcon :name="item.icon" class="w-5 h-5 text-blue-400" />
                    </div>
                </template>

                <span class="truncate">{{ item.label }}</span>

                <template #trailing>
                    <UIcon
                        name="i-heroicons-chevron-right-20-solid"
                        class="w-5 h-5 ms-auto transform transition-transform duration-200 text-blue-500"
                        :class="[open && 'rotate-90']"
                    />
                </template>
            </UButton>
        </template>
        <template #spending>
            <UVerticalNavigation :links="addToggle([
                {
                    label: 'Dashboard',
                    to: '/spending',
                },
                {
                    label: 'Settings',
                    to: '/spending/settings',
                }
            ])" />
            <UAccordion
                :items="[
                    {
                        label: 'Management',
                        slot: 'management',
                    },
                ]"
                color="white"
            >
                <template #default="{ item, open }">
                    <UButton
                        color="gray"
                        variant="ghost"
                        class="border-b border-gray-200 dark:border-gray-700 text-white inner-accordion"
                        :ui="{
                            rounded: 'rounded-none',
                            padding: {
                                sm: 'p-3'
                            }
                        }"
                    >
                        <span
                            class="text-gray-400 truncate inner-accordion-label"
                            :class="isInnerAccordionActive(open)"
                        >
                            {{ item.label }}
                        </span>

                        <template #trailing>
                            <UIcon
                                name="i-heroicons-chevron-right-20-solid"
                                class="w-5 h-5 ms-auto transform transition-transform duration-200 text-blue-500"
                                :class="[open && 'rotate-90']"
                            />
                        </template>
                    </UButton>
                </template>
                <template #management>
                    <UVerticalNavigation :links="addToggle(spendingLinks)" />
                </template>
            </UAccordion>
        </template>
    </UAccordion>
</template>

<script setup lang="ts">
const { toggleNav } = useNavigationStore();
const props = defineProps(['isMobile']);
const route: any = useRoute();

const items = [
    {
        label: 'Spending',
        icon: 'i-heroicons-credit-card',
        slot: 'spending',
    },
    {
        label: 'Inventory',
        icon: 'i-heroicons-home',
        slot: 'inventory',
    },
    {
        label: 'Recipes',
        icon: 'i-heroicons-book-open',
        slot: 'recipes',
    },
    {
        label: 'Notes',
        icon: 'i-heroicons-clipboard',
        slot: 'notes',
    }
];


const spendingLinks = [
    {
        label: 'Accounts',
        to: '/spending/accounts',
    },
    {
        label: 'Transaction categories',
        to: '/spending/transaction-categories',
    },
    {
        label: 'Transactions',
        to: '/spending/transactions',
    }
];

function addToggle(links: any) {
    return links.map((link: any) => ({
            ...link,
            ...(props.isMobile ? { click: () => toggleNav() } : {})
        }
    ));
}

function isInnerAccordionActive(open: boolean) {
    if (open && route.path.split('/').length > 2) {
        return 'text-white';
    }
}

</script>
