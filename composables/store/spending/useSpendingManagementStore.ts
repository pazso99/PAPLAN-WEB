import { defineStore } from 'pinia';
import type { SpendingManagementState } from '~/types/stores';
import type {
    SpendingAccountCreateRequest,
    SpendingAccountUpdateRequest,
    SpendingTransactionCategoryCreateRequest,
    SpendingTransactionCategoryUpdateRequest,
    SpendingTransactionCreateRequest,
    SpendingTransactionUpdateRequest,
} from '~/types/requests';
import type {
    SpendingAccountResponse,
    SpendingAccountListResponse,
    SpendingTransactionCategoryResponse,
    SpendingTransactionCategoryListResponse,
    SpendingTransactionResponse,
    SpendingTransactionListResponse,
} from '~/types/responses';
import type { Account, Transaction, TransactionCategory } from '~/types/models';

export const useSpendingManagementStore = defineStore('spending-management', {
    state: () => ({
        loading: true,
        accounts: [],
        account: <Account>{},
        transactionCategories: [],
        transactionCategory: <TransactionCategory>{},
        transactions: [],
        transaction: <Transaction>{},
    } as SpendingManagementState),
    actions: {
        // ACCOUNTS
        async getAccounts() {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<SpendingAccountListResponse>('spending/accounts');

                this.accounts = response.data.map(account => ({
                    ...account,
                    createdAt: new Date(account.createdAt),
                    updatedAt: new Date(account.updatedAt),
                }));
            } catch (err: any) {
                navigateTo('/spending');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async getAccount(id: number) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<SpendingAccountResponse>(`spending/accounts/${id}`);
                this.account = response.data;
            } catch (err: any) {
                navigateTo('/spending/accounts');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async createAccount(data: SpendingAccountCreateRequest) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<SpendingAccountResponse>('spending/accounts', {
                    method: 'POST',
                    body: data,
                });
                this.account = response.data;
                toast.add({ summary: 'Record created!', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                navigateTo('/spending/accounts');
                this.loading = false;
            }
        },
        async updateAccount(data: SpendingAccountUpdateRequest) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<SpendingAccountResponse>(`spending/accounts/${data.id}`, {
                    method: 'PUT',
                    body: data,
                });
                this.account = response.data;
                toast.add({ summary: 'Record updated', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                navigateTo('/spending/accounts');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async deleteAccount(id: number) {
            const toast = useToastService();
            try {
                this.loading = true;
                await useApiFetch<SpendingAccountResponse>(`spending/accounts/${id}`, {
                    method: 'DELETE',
                });
                toast.add({ summary: 'Record deleted!', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        // TRANSACTION CATEGORIES
        async getTransactionCategories() {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<SpendingTransactionCategoryListResponse>('spending/transaction-categories');
                this.transactionCategories = response.data.map(transactionCategory => ({
                    ...transactionCategory,
                    createdAt: new Date(transactionCategory.createdAt),
                    updatedAt: new Date(transactionCategory.updatedAt),
                }));
            } catch (err: any) {
                navigateTo('/spending');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async getTransactionCategory(id: number) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<SpendingTransactionCategoryResponse>(`spending/transaction-categories/${id}`);
                this.transactionCategory = response.data;
            } catch (err: any) {
                navigateTo('/spending/transaction-categories');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async createTransactionCategory(data: SpendingTransactionCategoryCreateRequest) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<SpendingTransactionCategoryResponse>('spending/transaction-categories', {
                    method: 'POST',
                    body: data,
                });
                this.transactionCategory = response.data;
                toast.add({ summary: 'Record created!', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                navigateTo('/spending/transaction-categories');
                this.loading = false;
            }
        },
        async updateTransactionCategory(data: SpendingTransactionCategoryUpdateRequest) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<SpendingTransactionCategoryResponse>(`spending/transaction-categories/${data.id}`, {
                    method: 'PUT',
                    body: data,
                });
                this.transactionCategory = response.data;
                toast.add({ summary: 'Record updated', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                navigateTo('/spending/transaction-categories');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async deleteTransactionCategory(id: number) {
            const toast = useToastService();
            try {
                this.loading = true;
                await useApiFetch<SpendingTransactionCategoryResponse>(`spending/transaction-categories/${id}`, {
                    method: 'DELETE',
                });
                toast.add({ summary: 'Record deleted!', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        // TRANSACTIONS
        async getTransactions() {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<SpendingTransactionListResponse>('spending/transactions');
                this.transactions = response.data.map(transaction => ({
                    ...transaction,
                    date: new Date(transaction.date),
                    createdAt: new Date(transaction.createdAt),
                    updatedAt: new Date(transaction.updatedAt),
                }));
            } catch (err: any) {
                navigateTo('/spending');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async getTransaction(id: number) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<SpendingTransactionResponse>(`spending/transactions/${id}`);
                this.transaction = response.data;
            } catch (err: any) {
                navigateTo('/spending/transactions');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async createTransaction(data: SpendingTransactionCreateRequest) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<SpendingTransactionResponse>('spending/transactions', {
                    method: 'POST',
                    body: data,
                });
                this.transaction = response.data;
                toast.add({ summary: 'Record created!', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                navigateTo('/spending/transactions');
                this.loading = false;
            }
        },
        async updateTransaction(data: SpendingTransactionUpdateRequest) {
            const toast = useToastService();
            try {
                this.loading = true;
                const response = await useApiFetch<SpendingTransactionResponse>(`spending/transactions/${data.id}`, {
                    method: 'PUT',
                    body: data,
                });
                this.transaction = response.data;
                toast.add({ summary: 'Record updated', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                navigateTo('/spending/transactions');
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
        async deleteTransaction(id: number) {
            const toast = useToastService();
            try {
                this.loading = true;
                await useApiFetch<SpendingTransactionResponse>(`spending/transactions/${id}`, {
                    method: 'DELETE',
                });
                toast.add({ summary: 'Record deleted!', severity: 'success', detail: 'Successful', life: 3000 });
            } catch (err: any) {
                toast.add({ summary: 'Some error happened!', severity: 'error', detail: 'error', life: 3000 });
            } finally {
                this.loading = false;
            }
        },
    },
});
