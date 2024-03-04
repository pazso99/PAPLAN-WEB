<template>
    <div :class="containerClass">
        <div :class="backgroundClass">
            <h1 :class="numberClass">
                <CountTo
                    class="text-2xl md:text-3xl"
                    :start-val="0"
                    :end-val="number"
                    :duration="duration"
                />
                {{ "" }}
                <span class="text-lg ms-n1">{{ suffix }}</span>
            </h1>
            <h6 :class="labelClass">{{ label }}</h6>
        </div>
    </div>
</template>

<script setup>
import CountTo from 'vue-count-to/src';

defineProps([
    'containerClass',
    'backgroundClass',
    'number',
    'numberClass',
    'label',
    'labelClass',
    'duration',
    'suffix'
]);
</script>
