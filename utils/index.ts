import type { RouteParams } from 'vue-router';
import {
    TransactionTypes,
    NotePriorities,
} from '~/types/constants';
import type {
    TransactionType,
    NotePriority,
} from '~/types/types';

export function getIdFromRoute(routeParams: RouteParams) {
    return parseInt(routeParams.id.toString());
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

export function getNotePriorities() {
    return [...NotePriorities];
}

export function getNotePriorityColor(priority: NotePriority) {
    switch (priority) {
        case 'none':
            return 'none';
        case 'low':
            return 'success';
        case 'medium':
            return 'warning';
        case 'high':
            return 'danger';
        case 'critical':
            return 'contrast';
        default:
            return 'none';
    }
}

export function getNotePriorityLabel(priority: NotePriority) {
    switch (priority) {
        case 'none':
            return 'none';
        case 'low':
            return 'low';
        case 'medium':
            return 'medium';
        case 'high':
            return 'high';
        case 'critical':
            return 'critical';
        default:
            return 'none';
    }
}
