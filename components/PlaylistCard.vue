<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <NuxtLink
    class="main-box w-[240px] h-[320px] bg-[#05060eaa] hover:bg-[#05060e] border border-slate-900 rounded-lg shadow shadow-gray-950 p-4 flex flex-col gap-2"
    :to="to"
  >
    <div class="relative w-full h-[200px] overflow-hidden">
      <div class="absolute w-full h-full bg-black/40 z-20"></div>
      <img
        :src="image"
        alt="playlist"
        class="w-full h-full object-cover playlist-img duration-300 z-10"
      />
      <div
        class="absolute w-14 h-14 flex justify-center items-center bottom-3 right-3 rounded-full bg-indigo-600 z-30"
      >
        <Icon name="solar:play-bold" class="text-white" />
      </div>
    </div>
    <div class="flex-1 flex flex-col">
      <p class="text-white uppercase font-bold">
        {{ wordLimit(name, 3) }}
      </p>
      <p class="text-gray-400 text-sm" v-html="wordLimit(description, 8)" />
    </div>
  </NuxtLink>
</template>

<style scoped>
.main-box:hover .playlist-img {
  transform: scale(1.1) rotate(5deg);
}
</style>
