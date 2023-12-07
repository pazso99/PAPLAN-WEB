export function useApiFetch<T> (url: string, options: any = {}) {
    const runtimeConfig = useRuntimeConfig();
    const token = useCookie('token');

    return $fetch(`${runtimeConfig.public.API_BASE_URL}/${url}`, {
        headers: {
                'Content-Type': 'application/json',
                ...token.value ? { Authorization: `Bearer ${token.value}` } : {}
            },
            ...options,
        }
    );
}
