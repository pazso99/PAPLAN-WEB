export function useApiFetch<T> (url: string, options: any = {}) {
    const runtimeConfig = useRuntimeConfig();
    const token = useCookie('token');

    return $fetch(`${runtimeConfig.public.API_BASE_URL}/${url}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...token.value ? { Authorization: `Bearer ${token.value}` } : {}
        },
        ...options,
        async onResponseError({ request, response }: any) {
            if (response.status === 401 && !request.includes('/login')) {
                token.value = null;
                await reloadNuxtApp({ path: '/login?expired=1'});
            }
        },
    });
};
