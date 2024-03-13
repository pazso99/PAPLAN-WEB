import type { RouteParams } from 'vue-router';
import { TransactionTypes } from '~/types/constants';
import type { TransactionType } from '~/types/types';

export function getIdFromRoute(routeParams: RouteParams) {
    return parseInt(routeParams.id.toString());
}

export function getTransactionTypeColor(transactionType: TransactionType) {
    switch (transactionType) {
        case 'income':
            return 'success';
        case 'expense':
            return 'danger';
        case 'transfer':
            return 'warning';
        default:
            return 'info';
    }
}

export function getTransactionTypeLabel(transactionType: TransactionType) {
    switch (transactionType) {
        case 'income':
            return 'INCOME';
        case 'expense':
            return 'EXPENSE';
        case 'transfer':
            return 'TRANSFER';
        default:
            return '-';
    }
}

export function parseYearAndMonth(dateString: string) {
    const [year, month] = dateString.split('-');

    return {
        year,
        month: month || '',
    };
}

export function getTransactionTypes() {
    return [...TransactionTypes];
}
