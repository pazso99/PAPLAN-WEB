export function useApiFetch<Response>(url: string, options: object = {}) {
    const runtimeConfig = useRuntimeConfig();
    const token = useCookie('token');

    return $fetch<Response>(`${runtimeConfig.public.API_BASE_URL}/${url}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...token.value ? { Authorization: `Bearer ${token.value}` } : {},
        },
        ...options,
        onResponseError: async ({ request, response }) => {
            if (
                response.status === 401
                && !request.toString().includes('/login')
            ) {
                token.value = null;
                await reloadNuxtApp({ path: '/login?expired=1' });
            }
        },
    });
};
