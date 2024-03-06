import { defineStore } from 'pinia';
import type { LoginResponse, UserResponse } from '~/types/responses';
import type { AuthState } from '~/types/types';
import type { userCredentials } from '~~/types';

const authState = {
    isAuth: false,
    token: null,
    user: null,
    loading: true,
} as AuthState;

export const useAuthStore = defineStore('auth', {
    state: () => authState,
    actions: {
        async login({ name, password }: userCredentials) {
            const toast = useToastService();
            try {
                const data = await useApiFetch<LoginResponse>('login', {
                    method: 'POST',
                    body: {
                        name,
                        password,
                    },
                });
                this.isAuth = true;
                this.token = data.data.token;
                useCookie('token').value = this.token;
                navigateTo('/');
            } catch (err: unknown) {
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
            } catch (err: unknown) {
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
                const data = await useApiFetch<UserResponse>('user');
                this.user = data.data;
            } catch (err: unknown) {
                toast.add({ severity: 'error', summary: 'Error!', detail: 'There was an error when getting user!', life: 3000 });
            }
        },
    },
});
