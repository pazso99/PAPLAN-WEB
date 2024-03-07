import { defineStore } from 'pinia';
import type { SpendingTransactionRequest } from '~/types/requests';
import type { Account, SpendingCrudStore, Transaction, TransactionCategory } from '~/types/types';

export const useSpendingCrudStore = defineStore('spending-crud', {
    state: () => ({
        loading: true,
        accounts: [],
        account: null,
        transactionCategories: [],
        transactionCategory: null,
        transactions: [],
        transaction: null,
    } as SpendingCrudStore),
    actions: {
        // ACCOUNTS
        async getAccounts() {
            this.loading = true;
            this.accounts = await useIndexCall<Account[]>('spending/accounts', 'spending') || [];
            this.loading = false;
        },
        async getAccount(id: number) {
            this.loading = true;
            this.account = await useShowCall<Account>(`spending/accounts/${id}`, 'spending/accounts') || null;
            this.loading = false;
        },
        async createAccount(data: any) {
            this.loading = true;
            await useStoreCall('spending/accounts', 'spending/accounts', {
                method: 'POST',
                body: data,
            });
            this.loading = false;
        },
        async updateAccount(data: any) {
            this.loading = true;
            await useUpdateCall(`spending/accounts/${data.id}`, 'spending/accounts', {
                method: 'PUT',
                body: data,
            });
            this.loading = false;
        },
        async deleteAccount(id: any) {
            this.loading = true;
            await useDeleteCall(`spending/accounts/${id}`, 'spending/accounts', {
                method: 'DELETE',
            });
            this.loading = false;
        },
        // TRANSACTION CATEGORIES
        async getTransactionCategories() {
            this.loading = true;
            this.transactionCategories = await useIndexCall<TransactionCategory[]>('spending/transaction-categories', 'spending') || [];
            this.loading = false;
        },
        async getTransactionCategory(id: any) {
            this.loading = true;
            this.transactionCategory = await useShowCall<TransactionCategory>(
                `spending/transaction-categories/${id}`,
                'spending/transaction-categories',
            ) || null;
            this.loading = false;
        },
        async createTransactionCategory(data: any) {
            this.loading = true;
            await useStoreCall('spending/transaction-categories', 'spending/transaction-categories', {
                method: 'POST',
                body: data,
            });
            this.loading = false;
        },
        async updateTransactionCategory(data: any) {
            this.loading = true;
            await useUpdateCall(`spending/transaction-categories/${data.id}`, 'spending/transaction-categories', {
                method: 'PUT',
                body: data,
            });
            this.loading = false;
        },
        async deleteTransactionCategory(id: any) {
            this.loading = true;
            await useDeleteCall(`spending/transaction-categories/${id}`, 'spending/transaction-categories', {
                method: 'DELETE',
            });
            this.loading = false;
        },
        // TRANSACTIONS
        async getTransactions() {
            this.loading = true;
            this.transactions = await useIndexCall<Transaction[]>('spending/transactions', 'spending') || [];
            this.loading = false;
        },
        async getTransaction(id: any) {
            this.loading = true;
            this.transaction = await useShowCall<Transaction>(`spending/transactions/${id}`, 'spending/transactions') || null;
            this.loading = false;
        },
        async createTransaction(data: SpendingTransactionRequest) {
            this.loading = true;
            await useStoreCall('spending/transactions', 'spending/transactions', {
                method: 'POST',
                body: data,
            });
            this.loading = false;
        },
        async updateTransaction(data: any) {
            this.loading = true;
            await useUpdateCall(`spending/transactions/${data.id}`, 'spending/transactions', {
                method: 'PUT',
                body: data,
            });
            this.loading = false;
        },
        async deleteTransaction(id: any) {
            this.loading = true;
            await useDeleteCall(`spending/transactions/${id}`, 'spending/transactions', {
                method: 'DELETE',
            });
            this.loading = false;
        },
    },
});
