import type {
    User,
    Account,
    Transaction,
    TransactionCategory,
    Recipe,
    RecipeBasic,
    Note,
    NotesBasic,
} from './models';
import type {
    SpendingActualBalances,
    SpendingDashboardData,
    SpendingSettings,
} from './types';

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

interface RecipesManagementState {
    loading: boolean;
    recipes: Recipe[];
    recipe: Recipe;
};

interface RecipesDashboardState {
    loading: boolean;
    recipes: RecipeBasic[];
};

interface NotesManagementState {
    loading: boolean;
    notes: Note[];
    note: Note;
};

interface NotesDashboardState {
    loading: boolean;
    notes: NoteBasic[];
};

export {
    NavigationState,
    AuthState,
    SpendingManagementState,
    SpendingDashboardState,
    SpendingSettingsState,
    RecipesManagementState,
    RecipesDashboardState,
    NotesManagementState,
    NotesDashboardState,
};
