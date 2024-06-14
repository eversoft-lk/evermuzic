<script setup lang="ts">
type Options = {
  id: string;
  title: string;
  artist: string;
};

defineProps({
  options: {
    type: Object as PropType<Options>,
    required: true,
  },
});
</script>

<template>
  <div
    class="relative w-[150px] h-[150px] flex flex-col rounded-lg bg-slate-800 shadow-lg shadow-slate-950"
  >
    <div class="p-5">
      <h3 class="text-lg text-gray-300">{{ options.title }}</h3>
      <span class="text-sm text-gray-500">{{ options.artist }}</span>
    </div>

    <div
      class="absolute w-full px-5 bottom-5 flex items-center justify-between"
    >
      <Icon name="solar:play-bold-duotone" class="text-2xl cursor-pointer" />

      <div class="flex gap-2">
        <div class="w-1 h-1 rounded-full outline outline-slate-500"></div>
        <div class="w-1 h-1 rounded-full outline outline-slate-500"></div>
        <div class="w-1 h-1 rounded-full outline outline-slate-500"></div>
      </div>
    </div>
  </div>
</template>
