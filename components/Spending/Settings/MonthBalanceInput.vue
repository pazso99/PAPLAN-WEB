<template>
    <li class="flex gap-2 justify-between items-center p-1 w-50">
        {{ month }}
        <InputGroup class="w-48">
            <InputNumber
                :model-value="modelValue"
                placeholder="Amount..."
                @update:model-value="(newValue: string) => $emit('update:modelValue', newValue)"
            />
            <InputGroupAddon>
                <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
            </InputGroupAddon>
        </InputGroup>
    </li>
</template>

<script setup lang="ts">
defineProps<{
    month: string;
    modelValue: number;
}>();

defineEmits<{
    (e: 'update:modelValue', newValue: string): string;
}>();
</script>
