<template>
    <li class="flex gap-2 justify-between items-center p-1 w-50">
        {{ month }}
        <InputGroup class="w-48">
            <InputNumber
                :modelValue="modelValue"
                placeholder="Amount..."
                integeronly
                @update:modelValue="newValue => $emit('update:modelValue', newValue)"
            />
            <InputGroupAddon>
                <span class="text-gray-500 dark:text-gray-400 text-xs">Ft</span>
            </InputGroupAddon>
        </InputGroup>
    </li>
</template>

<script setup>
defineProps(['month', 'modelValue']);
</script>
