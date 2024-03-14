import type {
    SpendingActualBalances,
    SpendingConfigs,
    TransactionType,
} from './types';

interface UserLoginRequest {
    name: string;
    password: string;
};

interface SpendingSettingsUpdateRequest {
    configs: SpendingConfigs;
    actualBalances: SpendingActualBalances;
};

interface SpendingDashboardRequest {
    year: string;
    month: string;
};

interface SpendingAccountCreateRequest {
    status: boolean;
    name: string;
    balance: number;
};

interface SpendingAccountUpdateRequest {
    id: number;
    status: boolean;
    name: string;
    balance: number;
};

interface SpendingTransactionCategoryCreateRequest {
    status: boolean;
    name: string;
    transactionType: TransactionType;
};

interface SpendingTransactionCategoryUpdateRequest {
    id: number;
    status: boolean;
    name: string;
    transactionType: TransactionType;
};

interface SpendingTransactionCreateRequest {
    status: boolean;
    date: string;
    amount: number;
    accountId: number;
    transactionCategoryId: number;
    comment: string | null;
    meta: string | null;
};

interface SpendingTransactionUpdateRequest {
    id: number;
    status: boolean;
    date: string;
    amount: number;
    accountId: number;
    transactionCategoryId: number;
    comment: string | null;
    meta: string | null;
};

interface RecipesRecipeCreateRequest {
    status: boolean;
    name: string;
    time: string;
    description: string;
};

interface RecipesRecipeUpdateRequest {
    id: number;
    status: boolean;
    name: string;
    time: string;
    description: string;
};

export {
    UserLoginRequest,
    SpendingSettingsUpdateRequest,
    SpendingDashboardRequest,
    SpendingAccountCreateRequest,
    SpendingAccountUpdateRequest,
    SpendingTransactionCategoryCreateRequest,
    SpendingTransactionCategoryUpdateRequest,
    SpendingTransactionCreateRequest,
    SpendingTransactionUpdateRequest,
    RecipesRecipeCreateRequest,
    RecipesRecipeUpdateRequest,
};
