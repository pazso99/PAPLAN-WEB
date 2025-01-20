import type {
    Account,
    Transaction,
    TransactionCategory,
    CategoryGroup,
    Recipe,
    Note,
    PackageUnit,
    ItemType,
    Item,
    PurchasedItem,
} from './models';
import type {
    SpendingDashboardData,
    SpendingSettings,
    SpendingMonthlyData,
    RecipesDashboardData,
    NotesDashboardData,
    InventoryDashboardData,
} from './types';

interface ErrorResponse {
    message: string;
}

interface ApiSuccessResponse<Data> {
    data: Data;
    status: number;
}

type TokenResponse = ApiSuccessResponse<{
    token: string;
}>;

type UserResponse = ApiSuccessResponse<User>;
type SpendingSettingsResponse = ApiSuccessResponse<SpendingSettings>;
type SpendingMonthlyDataResponse = ApiSuccessResponse<SpendingMonthlyData>;
type SpendingDashboardResponse = ApiSuccessResponse<SpendingDashboardData>;
type SpendingAccountResponse = ApiSuccessResponse<Account>;
type SpendingAccountListResponse = ApiSuccessResponse<Account[]>;
type SpendingTransactionCategoryResponse = ApiSuccessResponse<TransactionCategory>;
type SpendingTransactionCategoryListResponse = ApiSuccessResponse<TransactionCategory[]>;
type SpendingTransactionResponse = ApiSuccessResponse<Transaction>;
type SpendingTransactionListResponse = ApiSuccessResponse<Transaction[]>;
type SpendingCategoryGroupResponse = ApiSuccessResponse<CategoryGroup>;
type SpendingCategoryGroupListResponse = ApiSuccessResponse<CategoryGroup[]>;

type RecipesRecipeResponse = ApiSuccessResponse<Recipe>;
type RecipesRecipeListResponse = ApiSuccessResponse<Recipe[]>;
type RecipesDashboardResponse = ApiSuccessResponse<RecipesDashboardData>;

type NotesNoteResponse = ApiSuccessResponse<Note>;
type NotesNoteListResponse = ApiSuccessResponse<Note[]>;
type NotesDashboardResponse = ApiSuccessResponse<NotesDashboardData>;

type InventoryDashboardResponse = ApiSuccessResponse<InventoryDashboardData>;
type InventoryPackageUnitResponse = ApiSuccessResponse<PackageUnit>;
type InventoryPackageUnitListResponse = ApiSuccessResponse<PackageUnit[]>;
type InventoryItemTypeResponse = ApiSuccessResponse<ItemType>;
type InventoryItemTypeListResponse = ApiSuccessResponse<ItemType[]>;
type InventoryItemResponse = ApiSuccessResponse<Item>;
type InventoryItemListResponse = ApiSuccessResponse<Item[]>;
type InventoryPurchasedItemResponse = ApiSuccessResponse<PurchasedItem>;
type InventoryPurchasedItemListResponse = ApiSuccessResponse<PurchasedItem[]>;

export {
    ErrorResponse,
    TokenResponse,
    SpendingSettingsResponse,
    SpendingMonthlyDataResponse,
    SpendingDashboardResponse,
    UserResponse,
    SpendingAccountResponse,
    SpendingAccountListResponse,
    SpendingTransactionCategoryResponse,
    SpendingTransactionCategoryListResponse,
    SpendingTransactionResponse,
    SpendingTransactionListResponse,
    SpendingCategoryGroupResponse,
    SpendingCategoryGroupListResponse,
    RecipesRecipeResponse,
    RecipesRecipeListResponse,
    RecipesDashboardResponse,
    NotesNoteResponse,
    NotesNoteListResponse,
    NotesDashboardResponse,
    InventoryDashboardResponse,
    InventoryPackageUnitResponse,
    InventoryPackageUnitListResponse,
    InventoryItemTypeResponse,
    InventoryItemTypeListResponse,
    InventoryItemResponse,
    InventoryItemListResponse,
    InventoryPurchasedItemResponse,
    InventoryPurchasedItemListResponse,
};
