<template>
    <div :class="containerClass">
        <div class="p-4 text-center bg-slate-800 rounded-2xl">
            <h1 :class="titleClass">
                <span class="text-lg ms-n1">{{ prefix }}</span>
                {{ "" }}
                <CountTo class="text-3xl" :start-val="0" :end-val="count" :duration="duration" />
                {{ "" }}
                <span class="text-lg ms-n1">{{ suffix }}</span>
            </h1>
            <slot />
        </div>
    </div>
</template>

<script setup>
import CountTo from "vue-count-to/src";

defineProps({
    containerClass: {
        type: String,
        default: "",
    },
    titleClass: {
        type: String,
        default: "",
    },
    count: {
        type: Number,
        required: true,
    },
    prefix: {
        type: String,
        default: "",
    },
    suffix: {
        type: String,
        default: "",
    },
    duration: {
        type: Number,
        default: 300,
    },
    description: {
        type: String,
    },
});
</script>
