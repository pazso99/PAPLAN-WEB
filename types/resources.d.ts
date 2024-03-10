import type { TransactionType } from './types';

interface User {
    id: string;
    name: string;
    email: string;
};

interface AccountBasic {
    id: string;
    name: string;
    balance: number;
};

interface Account extends AccountBasic {
    status: boolean;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

interface TransactionCategoryBasic {
    id: number;
    name: string;
    transactionType: TransactionType;
};

interface TransactionCategory extends TransactionCategoryBasic {
    status: boolean;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

interface TransactionBasic {
    id: number;
    date: string;
    amount: number;
    transactionCategory: TransactionCategoryBasic;
    account: AccountBasic;
    comment: string;
    meta: string;
};

interface Transaction extends TransactionBasic {
    status: boolean;
    createdAt: string;
    updatedAt: string;
}

export {
    User,
    AccountBasic,
    Account,
    TransactionCategoryBasic,
    TransactionCategory,
    TransactionBasic,
    Transaction,
};
