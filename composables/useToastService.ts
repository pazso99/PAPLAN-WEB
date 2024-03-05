import type { useToast } from 'primevue/usetoast';

// https://github.com/primefaces/primevue/issues/3942
export function useToastService() {
    const nuxtApp = useNuxtApp();
    const getToast: typeof useToast = () => nuxtApp.vueApp.config.globalProperties.$toast;
    const toastService = getToast();
    return toastService;
}
