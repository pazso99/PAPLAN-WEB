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
        }
    ).catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
            token.value = null;
            navigateTo('/login');
            return;
        }
        throw error;
    });
}
