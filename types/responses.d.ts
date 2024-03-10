import type {
    Account,
    Transaction,
    TransactionCategory,
} from './models';
import type {
    SpendingDashboardData,
    SpendingSettings,
    SpendingActualBalances,
} from './types';

interface ErrorResponse {
    message: string;
}

interface ApiSuccessResponse<Data> {
    data: Data;
    status: number;
}

type TokenResponse = ApiSuccessResponse<{
    token: string;
}>;

type UserResponse = ApiSuccessResponse<User>;
type SpendingSettingsResponse = ApiSuccessResponse<SpendingSettings>;
type SpendingActualBalancesResponse = ApiSuccessResponse<SpendingActualBalances>;
type SpendingDashboardResponse = ApiSuccessResponse<SpendingDashboardData>;
type SpendingAccountResponse = ApiSuccessResponse<Account>;
type SpendingAccountListResponse = ApiSuccessResponse<Account[]>;
type SpendingTransactionCategoryResponse = ApiSuccessResponse<TransactionCategory>;
type SpendingTransactionCategoryListResponse = ApiSuccessResponse<TransactionCategory[]>;
type SpendingTransactionResponse = ApiSuccessResponse<Transaction>;
type SpendingTransactionListResponse = ApiSuccessResponse<Transaction[]>;

export {
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
