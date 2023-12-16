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
            const toast = useToast();
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
            } catch (err: any) {
                toast.add({ title: 'Login failed!', color: 'red', icon: 'i-heroicons-exclamation-triangle' });
                throw err;
            }
        },
        async logout() {
            const toast = useToast();
            try {
                await useApiFetch('logout', {
                    method: 'POST',
                });
            } catch (err: any) {
                toast.add({ title: 'There was an error when logging out!', color: 'red', icon: 'i-heroicons-exclamation-triangle' });
            } finally {
                this.isAuth = false;
                this.token = null;
                useCookie('token').value = this.token;
            }
        },
        async getUser() {
            const toast = useToast();
            try {
                const data: any = await useApiFetch('user');
                this.user = data.data;
            } catch (err: any) {
                toast.add({ title: 'There was an error when getting user!', color: 'red', icon: 'i-heroicons-exclamation-triangle' });
            }
        },
    },
});
