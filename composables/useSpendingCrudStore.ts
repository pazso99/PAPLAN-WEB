import { defineStore } from 'pinia';

export const useSpendingCrudStore = defineStore('spending-crud', {
    state: () => ({
        loading: true,
        accounts: [],
        account: null,
        transactionCategories: [],
        transactionCategory: null,
        transactions: [],
        transaction: null,
    }),
    actions: {
        // ACCOUNTS
        async getAccounts() {
            this.loading = true;
            this.accounts = await useCrudCall('index', 'spending/accounts', 'spending');
            this.loading = false;
        },
        async getAccount(id: any) {
            this.loading = true;
            this.account = await useCrudCall('show', `spending/accounts/${id}`, 'spending/accounts');
            this.loading = false;
        },
        async createAccount(data: any) {
            this.loading = true;
            await useCrudCall('store', 'spending/accounts', 'spending/accounts', {
                method: 'POST',
                body: data,
            });
            this.loading = false;
        },
        async updateAccount(data: any) {
            this.loading = true;
            await useCrudCall('update', `spending/accounts/${data.id}`, 'spending/accounts', {
                method: 'PUT',
                body: data,
            });
            this.loading = false;
        },
        async deleteAccount(id: any) {
            this.loading = true;
            await useCrudCall('delete', `spending/accounts/${id}`, 'spending/accounts', {
                method: 'DELETE',
            });
            this.loading = false;
        },
        // TRANSACTION CATEGORIES
        async getTransactionCategories() {
            this.loading = true;
            this.transactionCategories = await useCrudCall('index', 'spending/transaction-categories', 'spending');
            this.loading = false;
        },
        async getTransactionCategory(id: any) {
            this.loading = true;
            this.transactionCategory = await useCrudCall('show', `spending/transaction-categories/${id}`, 'spending/transaction-categories');
            this.loading = false;
        },
        async createTransactionCategory(data: any) {
            this.loading = true;
            await useCrudCall('store', 'spending/transaction-categories', 'spending/transaction-categories', {
                method: 'POST',
                body: data,
            });
            this.loading = false;
        },
        async updateTransactionCategory(data: any) {
            this.loading = true;
            await useCrudCall('update', `spending/transaction-categories/${data.id}`, 'spending/transaction-categories', {
                method: 'PUT',
                body: data,
            });
            this.loading = false;
        },
        async deleteTransactionCategory(id: any) {
            this.loading = true;
            await useCrudCall('delete', `spending/transaction-categories/${id}`, 'spending/transaction-categories', {
                method: 'DELETE',
            });
            this.loading = false;
        },
        // TRANSACTIONS
        async getTransactions() {
            this.loading = true;
            this.transactions = await useCrudCall('index', 'spending/transactions', 'spending');
            this.loading = false;
        },
        async getTransaction(id: any) {
            this.loading = true;
            this.transaction = await useCrudCall('show', `spending/transactions/${id}`, 'spending/transactions');
            this.loading = false;
        },
        async createTransaction(data: any) {
            this.loading = true;
            await useCrudCall('store', 'spending/transactions', 'spending/transactions', {
                method: 'POST',
                body: data,
            });
            this.loading = false;
        },
        async updateTransaction(data: any) {
            this.loading = true;
            await useCrudCall('update', `spending/transactions/${data.id}`, 'spending/transactions', {
                method: 'PUT',
                body: data,
            });
            this.loading = false;
        },
        async deleteTransaction(id: any) {
            this.loading = true;
            await useCrudCall('delete', `spending/transactions/${id}`, 'spending/transactions', {
                method: 'DELETE',
            });
            this.loading = false;
        },
    },
});
