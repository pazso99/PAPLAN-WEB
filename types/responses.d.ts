import type {
    Account,
    Transaction,
    TransactionCategory,
    Recipe,
    Note,
} from './models';
import type {
    SpendingDashboardData,
    SpendingSettings,
    SpendingActualBalances,
    RecipesDashboardData,
    NotesDashboardData,
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
type SpendingActualBalancesResponse = ApiSuccessResponse<SpendingActualBalances>;
type SpendingDashboardResponse = ApiSuccessResponse<SpendingDashboardData>;
type SpendingAccountResponse = ApiSuccessResponse<Account>;
type SpendingAccountListResponse = ApiSuccessResponse<Account[]>;
type SpendingTransactionCategoryResponse = ApiSuccessResponse<TransactionCategory>;
type SpendingTransactionCategoryListResponse = ApiSuccessResponse<TransactionCategory[]>;
type SpendingTransactionResponse = ApiSuccessResponse<Transaction>;
type SpendingTransactionListResponse = ApiSuccessResponse<Transaction[]>;

type RecipesRecipeResponse = ApiSuccessResponse<Recipe>;
type RecipesRecipeListResponse = ApiSuccessResponse<Recipe[]>;
type RecipesDashboardResponse = ApiSuccessResponse<RecipesDashboardData>;

type NotesNoteResponse = ApiSuccessResponse<Note>;
type NotesNoteListResponse = ApiSuccessResponse<Note[]>;
type NotesDashboardResponse = ApiSuccessResponse<NotesDashboardData>;

export {
    ErrorResponse,
    TokenResponse,
    SpendingSettingsResponse,
    SpendingActualBalancesResponse,
    SpendingDashboardResponse,
    UserResponse,
    SpendingAccountResponse,
    SpendingAccountListResponse,
    SpendingTransactionCategoryResponse,
    SpendingTransactionCategoryListResponse,
    SpendingTransactionResponse,
    SpendingTransactionListResponse,
    RecipesRecipeResponse,
    RecipesRecipeListResponse,
    RecipesDashboardResponse,
    NotesNoteResponse,
    NotesNoteListResponse,
    NotesDashboardResponse,
};
