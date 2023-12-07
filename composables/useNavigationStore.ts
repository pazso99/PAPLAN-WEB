import { defineStore } from 'pinia';

export const useNavigationStore = defineStore('navigation', {
    state: () => ({
        isNavOpen: false,
    }),
    actions: {
        toggleNav() {
            this.isNavOpen = !this.isNavOpen;
        },
    },
});
