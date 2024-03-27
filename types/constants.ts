const TransactionTypes = [
    'expense',
    'income',
    'transfer',
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
    NotePriorities,
    ItemStockStatuses,
};
