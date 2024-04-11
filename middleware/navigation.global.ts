export default defineNuxtRouteMiddleware((to, from) => {
    const { previousRoute } = storeToRefs(useNavigationStore());
    previousRoute.value = to.query.from ? to.query.from as string : to.meta.navBackRoute as string;
});
