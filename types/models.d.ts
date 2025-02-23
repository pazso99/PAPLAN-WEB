import type {
    TransactionType,
    NotePriority,
} from './types';

interface User {
    id: number;
    name: string;
    email: string;
};

interface AccountBasic {
    id: number;
    name: string;
    balance: number;
};

interface Account extends AccountBasic {
    status: boolean;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

interface SelectableAccount extends AccountBasic {
    status: boolean;
};

interface TransactionCategoryBasic {
    id: number;
    name: string;
    transactionType: TransactionType;
};

interface TransactionCategory extends TransactionCategoryBasic {
    status: boolean;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

interface TransactionBasic {
    id: number;
    date: Date;
    amount: number;
    transactionCategory: TransactionCategoryBasic;
    account: SelectableAccount;
    comment: string;
    meta: string;
};

interface Transaction extends TransactionBasic {
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface CategoryGroupBasic {
    id: number;
    name: string;
};

interface CategoryGroup extends CategoryGroupBasic {
    status: boolean;
    slug: string;
    transactionCategories: TransactionCategory[];
    createdAt: Date;
    updatedAt: Date;
}

interface RecipeBasic {
    id: number;
    name: string;
    time: string;
    description: string;
};

interface Recipe extends RecipeBasic {
    status: boolean;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
};

interface NoteBasic {
    id: number;
    name: string;
    dueDate: Date | null;
    priority: NotePriority;
    description: string;
};

interface Note extends NoteBasic {
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
};

interface PackageUnitBasic {
    id: number;
    name: string;
};

interface PackageUnit extends PackageUnitBasic {
    status: boolean;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
};

interface ItemTypeBasic {
    id: number;
    name: string;
};

interface ItemType extends ItemTypeBasic {
    status: boolean;
    slug: string;
    items: Item[];
    createdAt: Date;
    updatedAt: Date;
};

interface ItemBasic {
    id: number;
    name: string;
    itemType: ItemTypeBasic;
    expectedLifetimeInDays: number;
    recommendedStock: number;
    isEssential: boolean;
};

interface Item extends ItemBasic {
    status: boolean;
    slug: string;
    packageUnits: PackageUnit[];
    createdAt: Date;
    updatedAt: Date;
};

interface PurchasedItemBasic {
    id: number;
    amount: number;
    price: number;
    purchaseDate: Date;
    expirationDate: Date;
    leftoverAmountPercentage: number;
    comment: string;
};

interface PurchasedItem extends PurchasedItemBasic {
    item: ItemBasic;
    packageUnit: PackageUnitBasic;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export {
    User,
    AccountBasic,
    Account,
    SelectableAccount,
    TransactionCategoryBasic,
    TransactionCategory,
    TransactionBasic,
    Transaction,
    CategoryGroupBasic,
    CategoryGroup,
    RecipeBasic,
    Recipe,
    NoteBasic,
    Note,
    PackageUnitBasic,
    PackageUnit,
    ItemTypeBasic,
    ItemType,
    ItemBasic,
    Item,
    PurchasedItemBasic,
    PurchasedItem,
};
