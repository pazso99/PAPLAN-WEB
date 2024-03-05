import type { Configs, ExpenseCategory, User } from './types';

interface UserLoginRequest {
    name: string;
    password: string;
};

interface SpendingSettingsRequest {
    configs: Configs;
    actualBalances: Record<string, number>;
};

interface SpendingDashboardRequest {
    year: string;
    month: string;
};

interface SpendingTransactionRequest {
    status: boolean;
    date: string;
    amount: number;
    accountId: number;
    transactionCategoryId: number;
    comment: string | null;
    meta: string | null;
}

export {
    UserLoginRequest,
    SpendingSettingsRequest,
    SpendingDashboardRequest,
    SpendingTransactionRequest,
};
