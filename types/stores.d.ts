import type { Account, Transaction, TransactionCategory, User } from './models';
import type { SpendingActualBalances, SpendingDashboardData, SpendingSettings } from './types';

interface NavigationState {
    isNavOpen: boolean;
};

interface AuthState {
    loading: boolean;
    isAuth: boolean;
    token: string;
    user: User;
};

interface SpendingManagementState {
    loading: boolean;
    accounts: Account[];
    account: Account;
    transactionCategories: TransactionCategory[];
    transactionCategory: TransactionCategory;
    transactions: Transaction[];
    transaction: Transaction;
};

interface SpendingDashboardState {
    loading: boolean;
    spendingSelectedDate: string;
    spendingDashboardData: SpendingDashboardData;
};

interface SpendingSettingsState {
    loading: boolean;
    actualBalances: SpendingActualBalances;
    settings: SpendingSettings;
};

export {
    NavigationState,
    AuthState,
    SpendingManagementState,
    SpendingDashboardState,
    SpendingSettingsState,
};
