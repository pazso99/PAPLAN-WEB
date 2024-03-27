import type {
    TransactionTypes,
    NotePriorities,
    ItemStockStatuses,
} from './constants';
import type {
    TransactionBasic,
    TransactionCategoryBasic,
    RecipeBasic,
    NoteBasic,
    ItemTypeBasic,
    PurchasedItemWithRelations,
    PurchasedItemBasic,
} from './models';

type TransactionType = typeof TransactionTypes[number];

type NotePriority = typeof NotePriorities[number];

type ItemStockStatus = typeof ItemStockStatuses[number];

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

interface RecipesDashboardData {
    recipes: RecipeBasic[];
};

interface NotesDashboardData {
    notes: NoteBasic[];
};

interface InventoryDashboardData {
    inventoryItemTypes: InventoryItemTypeWithItems[];
};

interface InventoryItemTypeWithItems extends ItemTypeBasic {
    items: InventoryItem[];
    outOfStockNumber: number;
    inStockNumber: number;
};

interface InventoryItem extends ItemTypeBasic {
    id: number;
    name: string;
    recommendedStock: number;
    isEssential: boolean;
    stockStatus: ItemStockStatus;
    ranOutDate: Date | null;
    expectedRunOutDate: Date | null;
    inStockItems: InventoryItemWithUnit[];
    usedItems: InventoryItemWithUnit[];
};

interface InventoryItemWithUnit extends PurchasedItemBasic {
    packageUnit: string;
};

export {
    TransactionType,
    NotePriority,
    ItemStockStatus,
    SpendingDashboardAccountInfo,
    SpendingDashboardCategoryInfo,
    SpendingDashboardData,
    SpendingConfigs,
    SpendingSettings,
    SpendingActualBalances,
    RecipesDashboardData,
    NotesDashboardData,
    InventoryItemWithUnit,
    InventoryItem,
    InventoryItemTypeWithItems,
    InventoryDashboardData,
};
