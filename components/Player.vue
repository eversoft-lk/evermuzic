<script setup lang="ts">
import YouTubePlayer from "youtube-player";
import type { Song } from "~/types/YT";

type SearchResultType = {
  result: Song[];
};

onMounted(async () => {
  if (!YT.player) {
    console.log("Player not found");
    return;
  }
});

const router = useRouter();
const YT = usePlayer();
const volume = ref(50);
const volumeIcon = computed(() => {
  if (volume.value === 0) return "material-symbols:volume-off-rounded";
  if (volume.value < 50) return "material-symbols:volume-down-rounded";
  return "material-symbols:volume-up-rounded";
});
const width = ref(0);
const duration = ref(0);
watch(volume, () => {
  if (!YT.player) {
    return;
  }

  YT.player.setVolume(volume.value);
});
watch(
  () => YT.player,
  () => {
    if (!YT.player) {
      return;
    }

    YT.player.setVolume(volume.value);

    // Handle thumb changes
    YT.player.on("stateChange", async (event) => {
      let widthWorker: NodeJS.Timeout | null = null;
      if (event.data === 1) {
        YT.isPlaying = true;
        await getDuration();
        widthWorker = setInterval(async () => {
          let currentTime = (await YT.player?.getCurrentTime()) || 0;
          width.value = (100 / duration.value) * currentTime;
        }, 1000);
      } else {
        YT.isPlaying = false;
        if (widthWorker) {
          clearInterval(widthWorker);
        }
      }
    });
  }
);

async function getDuration() {
  let dur = await YT.player?.getDuration();
  duration.value = dur || 0;
}

function navigateToSong() {
  YT.lastLocationBeforePlay = router.currentRoute.value.fullPath;
  router.push(`/song/${hyphenateText(YT.songs[YT.nowPlaying]?.name)}`);
}
</script>

<template>
  <div class="fixed bottom-0 left-0 w-full z-20 lg:z-50">
    <div
      class="relative grid grid-cols-6 md:grid-cols-12 lg:grid-cols-12 w-full h-16 bg-[#04010f]"
    >
      <div
        class="absolute h-1 bg-gradient-to-r from-indigo-700 via-purple-500 to-blue-500 top-0 transition-[width] ease-in-out duration-1000"
        :style="{
          width: `${width}%`,
        }"
      ></div>
      <div
        class="px-8 col-span-3 md:col-span-3 lg:col-span-3 flex items-center gap-4"
        v-if="YT.songs[YT.nowPlaying] === undefined"
      >
        <USkeleton class="w-9 h-9" />

        <div class="flex flex-col justify-center gap-2">
          <USkeleton class="w-20 h-2" />
          <USkeleton class="w-14 h-2" />
        </div>
      </div>

      <div
        class="px-8 col-span-3 md:col-span-3 lg:col-span-3 flex cursor-pointer items-center gap-4"
        @click="navigateToSong"
        v-else
      >
        <div class="flex w-9 h-9">
          <img
            :src="YT.songs[YT.nowPlaying]?.thumbnail"
            class="h-full rounded-lg object-cover"
          />
        </div>
        <div class="flex flex-col justify-center">
          <p class="text-sm text-gray-200 uppercase font-bold line-clamp-1">
            {{ YT.songs[YT.nowPlaying]?.name }}
          </p>
          <p class="text-xs text-gray-400 line-clamp-1">
            {{ YT.songs[YT.nowPlaying]?.artist }}
          </p>
        </div>
      </div>

      <div
        class="col-span-3 md:col-span-6 lg:col-span-6 flex justify-center items-center text-xl gap-5 controllers"
      >
        <div class="sm:flex hidden">
          <Icon name="iconamoon:playlist-shuffle-bold" />
        </div>
        <Icon name="tabler:player-track-prev-filled" @click="YT.prev" />
        <div
          class="w-9 h-9 rounded-full flex justify-center items-center bg-gray-100 text-gray-900 cursor-pointer"
          @click="YT.playOrPause"
        >
          <Icon name="solar:play-bold" v-show="!YT.isPlaying" />
          <Icon name="solar:pause-bold" v-show="YT.isPlaying" />
        </div>
        <Icon name="tabler:player-track-next-filled" @click="YT.next" />
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
