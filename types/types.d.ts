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
    totals: Totals;
    accounts: Account[];
    transactionsByCategory: TransactionsByCategory;
    latestTransactions: LatestTransactions;
    diagrams: DiagramData;
}

interface Totals {
    balance: number;
    allIncome: number;
    allExpense: number;
    profit: number;
    basicExpense: number;
    premiumExpense: number;
}

interface Account {
    id: number;
    name: string;
    balance: number;
    income: number;
    expense: number;
    profit: number;
}

interface TransactionsByCategory {
    category: Category;
    amount: number;
    transactions: Transaction[];
}

interface Category {
    id: number;
    name: string;
    type: string;
}

interface LatestTransactions {
    transactions: Transaction[];
    amount: number;
}

// TODO BE.. refactor
interface Transaction {
    id?: number;
    type?: string;
    amount?: number;
    category: string;
    date: string;
    comment: string;
    account: string;
}

interface DiagramData {
    yearlyBalance: { date: string, amount: number }[];
}

interface TransactionCategory {
    id: number;
    name: string;
    slug: string;
}

interface Account {
    id: number;
    name: string;
    slug: string;
}

export {
    AuthState,
    User,
    ConfigState,
    Configs,
    ExpenseCategory,
    SpendingDashboardState,
    SpendingDashboardData,
    TransactionCategory,
    Account
};
