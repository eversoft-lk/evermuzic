<script setup lang="ts">
import type { PropType } from "vue";

type Options = {
  name: string;
  options: {
    name: string;
    icon: string;
    to: string;
  }[];
};

defineProps({
  options: {
    type: Object as PropType<Options>,
    required: true,
  },
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <h4 class="text-sm font-bold uppercase text-gray-400">
      {{ options.name }}
    </h4>
    <div class="flex flex-col gap-3 pl-3">
      <NuxtLink
        v-for="option in options.options"
        :key="option.name"
        class="flex gap-3 items-center font-semibold"
        :to="option.to"
      >
        <Icon :name="option.icon" />
        <span class="text-sm">{{ option.name }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
