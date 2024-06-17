<script setup lang="ts">
import type { PropType } from "vue";

const navbar = useNavbarStore();
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
    <div class="w-full border-t border-slate-800"></div>
    <h4
      v-show="navbar.isOpen === true"
      class="text-sm font-bold uppercase text-gray-400"
    >
      {{ options.name }}
    </h4>
    <div
      class="flex flex-col gap-3"
      :class="{
        'pl-3': navbar.isOpen,
      }"
    >
      <NuxtLink
        v-for="option in options.options"
        :key="option.name"
        class="flex gap-3 items-center font-semibold"
        :to="option.to"
      >
        <template v-if="navbar.isOpen">
          <Icon :name="option.icon" />
          <span class="text-sm">
            {{ option.name }}
          </span>
        </template>
        <template v-else>
          <div
            class="w-[50px] h-[50px] rounded-lg flex justify-center items-center hover:bg-slate-900/30 cursor-pointer transition-colors duration-300"
          >
            <Icon :name="option.icon" class="text-3xl" />
          </div>
        </template>
      </NuxtLink>
    </div>
  </div>
</template>
