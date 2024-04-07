import type {
    User,
    Account,
    Transaction,
    TransactionCategory,
    Recipe,
    RecipeBasic,
    Note,
    NotesBasic,
    PackageUnit,
    ItemType,
    Item,
    PurchasedItem,
} from './models';
import type {
    SpendingDashboardData,
    SpendingSettings,
    SpendingMonthlyMetadata,
    InventoryItemTypeWithItems,
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
    settings: SpendingSettings;
    monthlyMetadata: SpendingMonthlyMetadata[];
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

interface InventoryManagementState {
    loading: boolean;
    packageUnits: PackageUnit[];
    packageUnit: PackageUnit;
    itemTypes: ItemType[];
    itemType: ItemType;
    items: Item[];
    item: Item;
    purchasedItems: PurchasedItem[];
    purchasedItem: PurchasedItem;
};

interface InventoryDashboardState {
    loading: boolean;
    inventoryItemTypes: InventoryItemTypeWithItems[];
    activeTabs: integer[];
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
    InventoryManagementState,
    InventoryDashboardState,
};
