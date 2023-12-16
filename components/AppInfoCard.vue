<template>
    <div :class="containerClass">
        <div class="flex justify-between p-4 bg-slate-800 rounded-2xl">
            <slot name="body"></slot>
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['containerClass']);
</script>
