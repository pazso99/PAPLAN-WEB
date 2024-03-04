<template>
    <ContentListCard
        :title="'Accounts'"
        :buttons="[
            { icon: 'pi-plus', to: '/spending/accounts/create' },
            { icon: 'pi-chevron-left', to: '/spending' }
        ]"
        :items="accounts"
        :loading="loading"
        :multi-sort-meta="[
            { field: 'id', order: -1 }
        ]"
        :global-filter-fields="[
            'id',
            'name',
            'balance',
            'createdAt',
        ]"
        :filters="filters"
        :actionsColumnMeta="{
            width: '5%',
            editUrl: '/spending/accounts',
        }"
        @refresh-table="refreshTable"
        @delete-item="removeAccount"
    >
        <Column
            field="id"
            dataType="numeric"
            header="ID"
            sortable
            style="width: 10%"
        >
            <template #filter="{ filterModel }">
                <InputText
                    v-model="filterModel.value"
                    type="text"
                    class="p-column-filter"
                    placeholder="ID..."
                />
            </template>
        </Column>

        <Column
            field="status"
            header="Status"
            sortable
            :showFilterMatchModes="false"
            style="width: 10%"
        >
            <template #body="{ data }">
                <Tag
                    :value="data.status ? 'ACTIVE' : 'INACTIVE'"
                    :severity="data.status ? 'success' : 'danger'"
                />
            </template>
            <template #filter="{ filterModel }">
                <div class="flex gap-2 items-center">
                    <TriStateCheckbox
                        v-model="filterModel.value"
                        :pt="{
                            box: {
                                class: [
                                    'border-none',
                                    filterModel.value !== null ? filterModel.value ? 'bg-green-600' : 'bg-red-800' : ''
                                ]
                            },
                        }"
                    />
                    <Tag v-if="filterModel.value === true" value="ACTIVE" severity="success" />
                    <Tag v-else-if="filterModel.value === false" value="INACTIVE" severity="danger" />
                    <Tag v-else value="All" severity="info" />
                </div>
            </template>
        </Column>

        <Column
            field="name"
            header="Name"
            sortable
            style="width: 25%"
        >
            <template #body="{ data }">
                {{ data.name }}
            </template>
            <template #filter="{ filterModel }">
                <InputText
                    v-model="filterModel.value"
                    class="p-column-filter"
                    placeholder="Name..."
                />
            </template>
        </Column>

        <Column
            field="balance"
            header="Balance"
            dataType="numeric"
            sortable
            style="width: 25%"
        >
            <template #body="{ data }">
                <span>{{ $formatNumber(data.balance) }} Ft</span>
            </template>
            <template #filter="{ filterModel }">
                <InputNumber
                    v-model="filterModel.value"
                    placeholder="Balance..."
                />
            </template>
        </Column>

        <Column
            field="createdAt"
            header="CreatedAt"
            sortable
            style="width: 25%"
        >
            <template #body="{ data }">
                {{ $dayjs(data.createdAt).format('YYYY-MM-DD') }}
            </template>
            <template #filter="{ filterModel }">
                <InputText
                    v-model="filterModel.value"
                    class="p-column-filter"
                    placeholder="Date..."
                />
            </template>
        </Column>
    </ContentListCard>
</template>

<script lang="ts" setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';

definePageMeta({
    middleware: 'auth',
    layout: 'admin',
});

useHead({
    title: 'Accounts - Spending',
});

const { getAccounts, deleteAccount } = useSpendingCrudStore();
const { accounts, loading }: any = storeToRefs(useSpendingCrudStore());

const filters = ref({
    id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    createdAt: { value: null, matchMode: FilterMatchMode.CONTAINS },
    balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
});

onMounted(async () => {
    await getAccounts();
});

async function removeAccount(id: any) {
    await deleteAccount(id);
    await getAccounts();
}

async function refreshTable() {
    await getAccounts();
}
</script>
