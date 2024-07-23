<script setup lang="ts">
const artistImage = ref<HTMLImageElement>();
defineProps({
  name: {
    type: String,
    required: true,
  },
  followers: {
    type: Number,
    required: true,
  },
  popularity: {
    type: Number,
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
watch(artistImage, () => {
  if (!artistImage.value) {
    return;
  }
  if (artistImage.value.complete) {
    artistImage.value.classList.remove("opacity-0");
    return;
  }
  artistImage.value.addEventListener("load", () => {
    artistImage.value?.classList.remove("opacity-0");
  });
});
</script>

<template>
  <NuxtLink
    class="main-box w-[240px] h-[320px] bg-[#05060eaa] hover:bg-[#05060e] border border-slate-900 rounded-lg shadow shadow-gray-950 p-4 flex flex-col gap-2"
    :to="to"
  >
    <div
      class="relative w-full h-[200px] overflow-hidden bg-[url(/img/artist-loading.webp)] bg-cover"
    >
      <div class="absolute w-full h-full bg-black/40 z-20"></div>
      <img
        :src="image"
        class="w-full h-full object-cover playlist-img duration-300 z-10 opacity-0 transition-[opacity,transform]"
        ref="artistImage"
      />
      <div
        class="play-button absolute w-14 h-14 flex justify-center items-center opacity-0 -bottom-5 right-3 rounded-full bg-indigo-600 z-30 duration-300"
      >
        <Icon name="solar:play-bold" class="text-white" />
      </div>
    </div>
    <div class="flex-1 flex flex-col">
      <p class="text-white uppercase font-bold font-kanit">{{ name }}</p>
      <div class="mt-2 grid grid-cols-5 text-gray-400 text-sm">
        <div class="col-span-2 flex gap-1">
          <!-- <Icon name="material-symbols:person" /> -->
          <span>Followers</span>
        </div>
        <div class="col-span-3 font-semibold">
          {{ followers.toLocaleString() }}
        </div>

        <div class="col-span-2 flex gap-1">
          <!-- <Icon name="ic:round-music-note" /> -->
          <span>Popularity</span>
        </div>
        <div class="col-span-3 font-semibold">
          {{ popularity.toLocaleString() }}%
        </div>
      </div>
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
