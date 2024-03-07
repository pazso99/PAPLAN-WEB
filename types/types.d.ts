interface AuthState {
    loading: boolean;
    isAuth: boolean;
    token: string | null;
    user: User | null;
};

interface User {
    id: string;
    name: string;
    email: string;
}

interface ConfigState {
    loading: boolean;
    spendingActualBalances: Record<string, number> | null;
    spendingSettings: SpendingSettings | null;
};

interface SpendingSettings {
    configs: Configs;
    expenseCategories: ExpenseCategory[];
}

interface Configs {
    spending_basic_transaction_categories: number[];
    spending_premium_transaction_categories: number[];
};

interface ExpenseCategory {
    id: number;
    name: string;
};

/* Spending Dashboard */
interface SpendingDashboardState {
    loading: boolean;
    spendingSelectedDate: string | null;
    spending: SpendingDashboardData | null;
}

interface SpendingDashboardData {
    totals: DashboardTotals;
    accounts: DashboardAccount[];
    categories: DashboardCategory[];
    latestTransactions: DashboardLatestTransaction[];
    diagrams: DashboardDiagramData;
}

interface DashboardTotals {
    balance: number;
    income: number;
    expense: number;
    profit: number;
    basicExpense: number;
    premiumExpense: number;
}

interface DashboardAccount {
    id: number;
    name: string;
    balance: number;
    income: number;
    expense: number;
    profit: number;
}

interface DashboardCategory {
    amount: number; // TODO rename to total
    category: {
        id: number;
        name: string;
        type: 'income' | 'expense' | 'transfer';
    };
    transactions: {
        date: string;
        amount: number;
        comment: string | null;
        account: string;
        // TODO meta
    }[];
}

interface DashboardLatestTransaction {
    amount: number;
    transaction: { // TODO flat
        id: number;
        type: 'income' | 'expense' | 'transfer';
        category: string;
        comment: string;
        account: string;
        date: string;
    };
}

interface DashboardDiagramData {
    yearlyBalance: { date: string; amount: number }[];
}

interface TransactionCategory {
    id: number;
    name: string;
    slug: string;
}

interface Account {
    id: string;
    status: string;
    name: string;
    slug: string;
    balance: number;
    createdAt: string;
    updatedAt: string;
}

interface SpendingCrudStore {
    loading: boolean;
    accounts: Account[];
    account: Account | null;
    transactionCategories: TransactionCategory[];
    transactionCategory: TransactionCategory | null;
    transactions: Transaction[];
    transaction: Transaction | null;
}

interface Transaction {
    id: string;
    status: string;
    date: string;
    transactionType: string;
    comment: string;
    meta: string;
    transactionCategory: any;
    account: any;
    amount: string;
    createdAt: string;
    updatedAt: string;
}

// TODO w/ different Transaction / Account type
// TODO all data | base info
/*
[Account | Transaction | Category ] --> all prop
[BasicAccount | BasicTransaction | BasicCategory] --> id, name, slug...
*/

export {
    AuthState,
    User,
    ConfigState,
    Configs,
    ExpenseCategory,
    SpendingDashboardState,
    SpendingDashboardData,
    Transaction,
    TransactionCategory,
    Account,
    SpendingCrudStore,
};
