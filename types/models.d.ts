import type { TransactionType } from './types';

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
    account: AccountBasic;
    comment: string;
    meta: string;
};

interface Transaction extends TransactionBasic {
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
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
