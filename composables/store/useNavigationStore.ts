import { defineStore } from 'pinia';
import type { NavigationState } from '~/types/stores';

export const useNavigationStore = defineStore('navigation', {
    state: () => ({
        isNavOpen: false,
        previousRoute: '',
    } as NavigationState),
    actions: {
        toggleNav() {
            this.isNavOpen = !this.isNavOpen;
        },
    },
});
