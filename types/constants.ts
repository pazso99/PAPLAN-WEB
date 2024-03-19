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

export {
    TransactionTypes,
    NotePriorities,
};
