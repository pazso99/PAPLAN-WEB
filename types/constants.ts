const TransactionTypes = [
    'expense',
    'income',
    'transfer',
] as const;

const ExpenseCategoryTypes = [
    'basic',
    'premium',
] as const;

const NotePriorities = [
    'none',
    'low',
    'medium',
    'high',
    'critical',
] as const;

const ItemStockStatuses = [
    'in_stock',
    'running_out',
    'out',
] as const;

export {
    TransactionTypes,
    ExpenseCategoryTypes,
    NotePriorities,
    ItemStockStatuses,
};
