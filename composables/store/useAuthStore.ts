import { defineStore } from 'pinia';
import type { AuthState } from '~/types/stores';
import type { UserLoginRequest } from '~/types/requests';
import type {
    TokenResponse,
    UserResponse,
} from '~/types/responses';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuth: false,
        token: null,
        user: null,
        loading: true,
    } as AuthState),
    actions: {
        async login(data: UserLoginRequest) {
            const toast = useToastService();
            try {
                const response = await useApiFetch<TokenResponse>('login', {
                    method: 'POST',
                    body: data,
                });
                this.isAuth = true;
                this.token = response.data.token;
                useCookie('token').value = this.token;
                navigateTo('/');
            } catch (err: any) {
                toast.add({ severity: 'error', summary: 'Error!', detail: 'Login failed!', life: 3000 });
                throw err;
            }
        },
        async logout() {
            const toast = useToastService();
            try {
                await useApiFetch('logout', {
                    method: 'POST',
                });
            } catch (err: any) {
                toast.add({ severity: 'error', summary: 'Error!', detail: 'There was an error when logging out!', life: 3000 });
            } finally {
                this.isAuth = false;
                this.token = null;
                useCookie('token').value = this.token;
            }
        },
        async getUser() {
            const toast = useToastService();
            try {
                const response = await useApiFetch<UserResponse>('user');
                this.user = response.data;
            } catch (err: any) {
                toast.add({ severity: 'error', summary: 'Error!', detail: 'There was an error when getting user!', life: 3000 });
            }
        },
    },
});
