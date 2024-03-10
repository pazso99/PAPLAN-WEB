import type {
    TransactionBasic,
    TransactionCategoryBasic,
} from './models';

enum TransactionTypeEnum {
    expense,
    income,
    transfer,
};

type TransactionType = keyof typeof TransactionTypeEnum;

interface SpendingDashboardData {
    totals: SpendingDashboardTotals;
    accounts: SpendingDashboardAccountInfo[];
    categories: SpendingDashboardCategoryInfo[];
    latestTransactions: TransactionBasic[];
    diagrams: {
        yearlyBalance: {
            date: string;
            amount: number;
        }[];
    };
};

interface SpendingDashboardTotals {
    balance: number;
    income: number;
    expense: number;
    profit: number;
    basicExpense: number;
    premiumExpense: number;
};

interface SpendingDashboardAccountInfo {
    id: number;
    name: string;
    balance: number;
    income: number;
    expense: number;
    profit: number;
};

interface SpendingDashboardCategoryInfo {
    id: number;
    name: string;
    type: TransactionType;
    sumTransactionAmount: number;
};

interface SpendingSettings {
    configs: SpendingConfigs;
};

interface SpendingConfigs {
    spending_basic_transaction_categories: number[];
    spending_premium_transaction_categories: number[];
};

type SpendingActualBalances = Record<string, number>;

export {
    TransactionTypeEnum,
    TransactionType,
    SpendingDashboardAccountInfo,
    SpendingDashboardCategoryInfo,
    SpendingDashboardData,
    SpendingConfigs,
    SpendingSettings,
    SpendingActualBalances,
};
