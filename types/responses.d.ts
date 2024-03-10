import type {
    Account,
    Transaction,
    TransactionCategory,
} from './resources';
import type {
    SpendingDashboardData,
    SpendingSettings,
    SpendingActualBalances,
} from './types';

interface ErrorResponse {
    message: string;
}

interface ApiSuccessResponseStructure<Data> {
    data: Data;
    status: number;
}

type TokenResponse = ApiSuccessResponseStructure<{
    token: string;
}>;

type UserResponse = ApiSuccessResponseStructure<User>;
type SpendingSettingsResponse = ApiSuccessResponseStructure<SpendingSettings>;
type SpendingActualBalancesResponse = ApiSuccessResponseStructure<SpendingActualBalances>;
type SpendingDashboardResponse = ApiSuccessResponseStructure<SpendingDashboardData>;
type SpendingAccountResponse = ApiSuccessResponseStructure<Account>;
type SpendingAccountListResponse = ApiSuccessResponseStructure<Account[]>;
type SpendingTransactionCategoryResponse = ApiSuccessResponseStructure<TransactionCategory>;
type SpendingTransactionCategoryListResponse = ApiSuccessResponseStructure<TransactionCategory[]>;
type SpendingTransactionResponse = ApiSuccessResponseStructure<Transaction>;
type SpendingTransactionListResponse = ApiSuccessResponseStructure<Transaction[]>;

export {
    ApiSuccessResponseStructure,
    ErrorResponse,
    TokenResponse,
    SpendingSettingsResponse,
    SpendingActualBalancesResponse,
    SpendingDashboardResponse,
    UserResponse,
    SpendingAccountResponse,
    SpendingAccountListResponse,
    SpendingTransactionCategoryResponse,
    SpendingTransactionCategoryListResponse,
    SpendingTransactionResponse,
    SpendingTransactionListResponse,
};
