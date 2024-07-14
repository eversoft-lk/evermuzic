<script setup lang="ts">
import YouTubePlayer from "youtube-player";
onMounted(async () => {
  YT.player = YouTubePlayer("yt-player", {
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      enablejsapi: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
    },
  });

  await YT.player.loadVideoById("tpCDwnmkeoY");

  YT.player.on("stateChange", (event) => {
    if (event.data === 1) {
      YT.isPlaying = true;
    } else {
      YT.isPlaying = false;
    }
  });

  if (YT.isPlaying) {
    YT.player?.seekTo(YT.lastPlayTime, false).then(() => {
      console.log("The video started from the last time");
    });
  }
});

const YT = usePlayer();
const volume = ref(45);
const volumeIcon = computed(() => {
  if (volume.value === 0) return "material-symbols:volume-off-rounded";
  if (volume.value < 50) return "material-symbols:volume-down-rounded";
  return "material-symbols:volume-up-rounded";
});

function playPause() {
  if (!YT.player) {
    return;
  }

  if (!YT.isPlaying) {
    YT.player.playVideo().then(() => {
      console.log("Playing");
    });
  } else {
    YT.player.pauseVideo();
  }

  YT.isPlaying = !YT.isPlaying;
}
</script>

<template>
  <div class="fixed bottom-0 left-0 w-full z-20 lg:z-50">
    <div id="yt-player" class="hidden"></div>
    <div
      class="relative grid grid-cols-6 md:grid-cols-12 lg:grid-cols-12 w-full h-16 bg-black"
    >
      <div
        class="absolute w-full h-1 bg-gradient-to-r from-indigo-700 via-purple-500 to-blue-500 top-0"
      ></div>
      <div
        class="px-8 col-span-3 md:col-span-3 lg:col-span-3 flex items-center gap-4"
      >
        <div class="flex w-9 h-9">
          <img
            src="https://lastfm.freetls.fastly.net/i/u/64s/ed23f05a0cd03adece8f20ff689d546d.png"
            class="h-full rounded-lg object-cover"
          />
        </div>
        <div class="flex flex-col justify-center">
          <p class="text-sm text-gray-200 uppercase font-bold line-clamp-1">
            Faded
          </p>
          <p class="text-xs text-gray-400 line-clamp-1">Alan Walker</p>
        </div>
      </div>

      <div
        class="col-span-3 md:col-span-6 lg:col-span-6 flex justify-center items-center text-xl gap-5 controllers"
      >
        <div class="sm:flex hidden">
          <Icon name="iconamoon:playlist-shuffle-bold" />
        </div>
        <Icon name="tabler:player-track-prev-filled" />
        <div
          class="w-9 h-9 rounded-full flex justify-center items-center bg-gray-100 text-gray-900 cursor-pointer"
          @click="playPause"
        >
          <Icon name="solar:play-bold" v-show="!YT.isPlaying" />
          <Icon name="solar:pause-bold" v-show="YT.isPlaying" />
        </div>
        <Icon name="tabler:player-track-next-filled" />
        <div class="sm:flex hidden">
          <Icon name="iconamoon:playlist-repeat-list-bold" />
        </div>
      </div>

      <div
        class="md:col-span-3 lg:col-span-3 px-8 items-center gap-3 justify-end hidden md:flex"
      >
        <Icon
          name="material-symbols-light:download-2"
          class="text-xl cursor-pointer"
        />
        <Icon name="solar:share-bold" class="text-xl cursor-pointer" />
        <div class="flex items-center gap-2">
          <Icon :name="volumeIcon" class="text-xl cursor-pointer" />
          <div class="w-20">
            <URange color="indigo" :min="0" :max="100" v-model="volume" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.controllers svg {
  @apply cursor-pointer;
}
</style>
