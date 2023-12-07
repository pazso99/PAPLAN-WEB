export default defineNuxtRouteMiddleware((to) => {
    const { isAuth } = storeToRefs(useAuthStore());
    const token = useCookie('token');

    if (token.value) {
        isAuth.value = true;
    }

    if (token.value && to?.name === 'login') {
        return navigateTo('/');
    }

    if (!token.value && to?.name !== 'login') {
        abortNavigation();
        return navigateTo('/login');
    }
});
