import type { Account, Configs, ExpenseCategory, SpendingDashboardData, TransactionCategory, User } from './types';

interface ErrorResponse {
    message: string;
}

interface ApiResponse<Data> {
    data: Data;
    status: number;
}

type LoginResponse = ApiResponse<{
    token: string;
}>;

type UserResponse = ApiResponse<User>;

type SpendingSettingsResponse = ApiResponse<{
    configs: Configs;
    expenseCategories: ExpenseCategory[];
}>;

type SpendingActualBalancesResponse = ApiResponse<{
    actualBalances: Record<string, number>;
}>;

type SpendingDashboardResponse = ApiResponse<SpendingDashboardData>;

type SpendingTransactionResponse = ApiResponse<{
    id: number;
    status: boolean;
    date: string;
    transactionType: string;
    comment: string;
    meta: string;
    transactionCategory: TransactionCategory;
    account: Account;
    amount: number;
    createdAt: string;
    updatedAt: string;
}>;

type SpendingAccountResponse = ApiResponse<SpendingDashboardData>;

export {
    ApiResponse,
    ErrorResponse,
    LoginResponse,
    UserResponse,
    SpendingSettingsResponse,
    SpendingActualBalancesResponse,
    SpendingDashboardResponse,
    SpendingTransactionResponse,
    SpendingAccountResponse,
};
