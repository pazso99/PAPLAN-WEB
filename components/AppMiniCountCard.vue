<template>
    <div :class="containerClass">
        <div class="p-4 text-center bg-slate-800 rounded-2xl">
            <h1 :class="`text-${color}-500`">
                <span class="text-lg ms-n1">{{ prefix }}</span>
                {{ "" }}
                <CountTo class="text-3xl" :start-val="0" :end-val="count" :duration="duration" />
                {{ "" }}
                <span class="text-lg ms-n1">{{ suffix }}</span>
            </h1>
            <h6 class="mb-0 font-weight-bolder">{{ title }}</h6>
            <p class="mb-0 text-sm opacity-8">{{ description }}</p>
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
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    color: {
      type: String,
      required: true,
    },
  });
  </script>
