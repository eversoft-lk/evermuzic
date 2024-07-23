<script setup lang="ts">
const playlistImg = ref<HTMLImageElement | null>(null);
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
watch(playlistImg, () => {
  if (!playlistImg.value) {
    return;
  }
  if (playlistImg.value.complete) {
    playlistImg.value.classList.remove("opacity-0");
    return;
  }
  playlistImg.value.addEventListener("load", () => {
    playlistImg.value?.classList.remove("opacity-0");
  });
});
</script>

<template>
  <NuxtLink
    class="main-box w-[240px] h-[320px] bg-[#05060eaa] hover:bg-[#05060e] border border-slate-900 rounded-lg shadow shadow-gray-950 p-4 flex flex-col gap-2"
    :to="to"
  >
    <div
      class="relative w-full h-[200px] overflow-hidden bg-[url(/img/playlist-loading.webp)] bg-cover"
    >
      <div class="absolute w-full h-full bg-black/40 z-20"></div>
      <img
        :src="image"
        class="w-full h-full object-cover playlist-img duration-300 z-10 opacity-0 transition-[opacity,transform]"
        ref="playlistImg"
      />
      <div
        class="play-button absolute w-14 h-14 flex justify-center items-center opacity-0 -bottom-5 right-3 rounded-full bg-indigo-600 z-30 duration-300"
      >
        <Icon name="solar:play-bold" class="text-white" />
      </div>
    </div>
    <div class="flex-1 flex flex-col">
      <p class="text-white uppercase font-bold font-kanit">
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

.main-box:hover .play-button {
  @apply opacity-100 bottom-3;
}
</style>
