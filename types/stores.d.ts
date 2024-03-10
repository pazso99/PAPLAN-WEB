import type {
    User,
} from './resources';
import type {
    Account,
    ExpenseCategory,
    SpendingDashboardData,
    Transaction,
    TransactionCategory,
    SpendingSettings,
} from './types';

interface NavigationState {
    isNavOpen: boolean;
};

interface AuthState {
    loading: boolean;
    isAuth: boolean;
    token: string | null;
    user: User | null;
};

interface SpendingManagementState {
    loading: boolean;
    accounts: Account[];
    account: Account | null;
    transactionCategories: TransactionCategory[];
    transactionCategory: TransactionCategory | null;
    transactions: Transaction[];
    transaction: Transaction | null;
};

interface SpendingDashboardState {
    loading: boolean;
    spendingSelectedDate: string;
    spendingDashboardData: SpendingDashboardData;
};

interface SpendingSettingsState {
    loading: boolean;
    actualBalances: ActualBalances | null;
    settings: SpendingSettings | null;
};

export {
    NavigationState,
    AuthState,
    SpendingManagementState,
    SpendingDashboardState,
    SpendingSettingsState,
};
