import type {
    TransactionBasic,
    TransactionCategoryBasic
} from './resources';

enum EnumTransactionType {
    expense,
    income,
    transfer,
};

type TransactionType = keyof typeof EnumTransactionType;

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
}

interface SpendingConfigs {
    spending_basic_transaction_categories: number[];
    spending_premium_transaction_categories: number[];
}

interface SpendingSettings {
    configs: SpendingConfigs;
}

type SpendingActualBalances = Record<string, number>;

export {
    EnumTransactionType,
    TransactionType,
    SpendingDashboardAccountInfo,
    SpendingDashboardCategoryInfo,
    SpendingDashboardData,
    SpendingConfigs,
    SpendingSettings,
    SpendingActualBalances,
};
