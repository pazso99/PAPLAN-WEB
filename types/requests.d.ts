import type {
    SpendingConfigs,
    TransactionType,
    NotePriority,
} from './types';

interface UserLoginRequest {
    name: string;
    password: string;
};

interface SpendingSettingsUpdateRequest {
    configs: SpendingConfigs;
};

interface SpendingMonthMetadataUpdateRequest {
    id: number;
    year: string;
    month: string;
    totalBalance: number;
    totalIncome: number;
    totalBasicExpense: number;
    totalPremiumExpense: number;
    accounts: {
        id: number;
        balance: number;
        income: number;
        basicExpense: number;
        premiumExpense: number;
        transfer: number;
    }[];
};

interface SpendingCalculateMonthMetadataRequest {
    year: string;
    month: string;
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

interface NotesNoteCreateRequest {
    status: boolean;
    name: string;
    dueDate: string | null;
    priority: NotePriority;
    description: string;
};

interface NotesNoteUpdateRequest {
    id: number;
    status: boolean;
    name: string;
    dueDate: string | null;
    priority: NotePriority;
    description: string;
};

interface InventoryPackageUnitCreateRequest {
    status: boolean;
    name: string;
};

interface InventoryPackageUnitUpdateRequest {
    id: number;
    status: boolean;
    name: string;
};

interface InventoryItemTypeCreateRequest {
    status: boolean;
    name: string;
};

interface InventoryItemTypeUpdateRequest {
    id: number;
    status: boolean;
    name: string;
};

interface InventoryItemCreateRequest {
    status: boolean;
    name: string;
    itemTypeId: number;
    packageUnitIds: number[];
    expectedLifetimeInDays: number;
    recommendedStock: number;
    isEssential: boolean;
};

interface InventoryItemUpdateRequest {
    id: number;
    status: boolean;
    name: string;
    itemTypeId: number;
    packageUnitIds: number[];
    expectedLifetimeInDays: number;
    recommendedStock: number;
    isEssential: boolean;
};

interface InventoryPurchasedItemCreateRequest {
    status: boolean;
    itemId: number;
    packageUnitId: number;
    amount: number;
    price: number | null;
    purchaseDate: string | null;
    expirationDate: string | null;
    leftoverAmountPercentage: number;
    comment: string;
    createAmount: number;
};

interface InventoryPurchasedItemUpdateRequest {
    id: number;
    status: boolean;
    itemId: number;
    packageUnitId: number;
    amount: number;
    price: number | null;
    purchaseDate: string | null;
    expirationDate: string | null;
    leftoverAmountPercentage: number;
    comment: string;
};

export {
    UserLoginRequest,
    SpendingSettingsUpdateRequest,
    SpendingMonthMetadataUpdateRequest,
    SpendingCalculateMonthMetadataRequest,
    SpendingDashboardRequest,
    SpendingAccountCreateRequest,
    SpendingAccountUpdateRequest,
    SpendingTransactionCategoryCreateRequest,
    SpendingTransactionCategoryUpdateRequest,
    SpendingTransactionCreateRequest,
    SpendingTransactionUpdateRequest,
    RecipesRecipeCreateRequest,
    RecipesRecipeUpdateRequest,
    NotesNoteCreateRequest,
    NotesNoteUpdateRequest,
    InventoryPackageUnitCreateRequest,
    InventoryPackageUnitUpdateRequest,
    InventoryItemTypeCreateRequest,
    InventoryItemTypeUpdateRequest,
    InventoryItemCreateRequest,
    InventoryItemUpdateRequest,
    InventoryPurchasedItemCreateRequest,
    InventoryPurchasedItemUpdateRequest,
};
