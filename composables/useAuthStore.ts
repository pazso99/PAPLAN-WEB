import { defineStore } from 'pinia';
import { type userCredentials } from '~~/types';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuth: false,
        token: null,
        user: null,
        loading: true,
    }),
    actions: {
        async login({ name, password }: userCredentials) {
            const toast = useToastService();
            try {
                const data: any = await useApiFetch('login', {
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
                const data: any = await useApiFetch('user');
                this.user = data.data;
            } catch (err: any) {
                toast.add({ severity: 'error', summary: 'Error!', detail: 'There was an error when getting user!', life: 3000 });
            }
        },
    },
});
