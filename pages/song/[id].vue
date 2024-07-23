<script setup lang="ts">
import type { Track } from "~/types/Spotify";

type SearchResultType = {
  tracks: {
    items: Track[];
  };
};

type SongType = {
  name: string;
  artist: string;
  image: string;
  durationMs: number;
} | null;

const YT = usePlayer();
const app = useRuntimeConfig();
const spotify = useSpotify();
const route = useRoute();
const router = useRouter();
const song = ref<SongType>(null);
const isLoading = ref(true);
const width = ref(0);
const currentTime = ref(0);
const widthWorker = ref<NodeJS.Timeout | null>(null);
const songImage = ref<HTMLImageElement>();

onMounted(async () => {
  isLoading.value = true;

  const name = (route.params.id as string).replace(/-/g, " ");

  if (YT.songs[YT.nowPlaying] !== undefined) {
    song.value = {
      name: YT.songs[YT.nowPlaying].name,
      artist: YT.songs[YT.nowPlaying].artist,
      image: YT.songs[YT.nowPlaying].thumbnail,
      durationMs: ((await YT.player?.getDuration()) || 0) * 1000,
    };
    moveThumb();
    isLoading.value = false;
    return;
  }

  const { data } = await useFetch<SearchResultType>(
    app.public.spotifyApi +
      `/search?query=${name}&type=track&locale=en-US&offset=0&limit=20`,
    {
      headers: {
        Authorization: `Bearer ${spotify.accessToken}`,
      },
    }
  );
  if (!data.value) {
    return;
  }
  const track = data.value.tracks.items[0];
  if (track === undefined) {
    if (YT.songs[YT.nowPlaying] === undefined) {
      fecthFromYT(name);
    } else {
      song.value = {
        name: YT.songs[YT.nowPlaying].name,
        artist: YT.songs[YT.nowPlaying].artist,
        image: YT.songs[YT.nowPlaying].thumbnail,
        durationMs: ((await YT.player?.getDuration()) || 0) * 1000,
      };
      isLoading.value = false;
    }
    return;
  }
  let artist = track.artists[0].name;
  if (track.artists.length > 1) {
    artist = track.artists
      .slice(0, 2)
      .map((artist) => artist.name)
      .join(", & ");
  }

  song.value = {
    name: track.name,
    artist: artist,
    image: track.album.images[0].url,
    durationMs: track.duration_ms,
  };
  isLoading.value = false;

  if (YT.isPlaying) {
    if (song.value) {
      song.value.durationMs = ((await YT.player?.getDuration()) || 0) * 1000;
    }
    moveThumb();
  }

  YT.player?.on("stateChange", async (event) => {
    if (event.data === 1) {
      if (YT.songs.length <= 1) {
        return;
      }
      if (YT.songs[YT.nowPlaying] === undefined) {
        return;
      }

      router.push(`/song/${hyphenateText(YT.songs[YT.nowPlaying].name)}`);
      if (song.value) {
        song.value.durationMs = ((await YT.player?.getDuration()) || 0) * 1000;
      }
      moveThumb();
    } else {
      if (widthWorker.value) {
        clearInterval(widthWorker.value);
      }
    }
  });
});
watch(songImage, () => {
  if (!songImage.value) {
    return;
  }
  if (songImage.value.complete) {
    songImage.value.classList.remove("opacity-0");
    return;
  }
  songImage.value.addEventListener("load", () => {
    songImage.value?.classList.remove("opacity-0");
  });
});

function goBack() {
  if (YT.lastLocationBeforePlay) {
    router.push(YT.lastLocationBeforePlay);
  } else {
    router.push("/");
  }
}

function moveThumb() {
  if (widthWorker.value) {
    clearInterval(widthWorker.value);
  }
  widthWorker.value = setInterval(async () => {
    let time = (await YT.player?.getCurrentTime()) || 0;
    currentTime.value = time * 1000;
    width.value = (100 / (song.value?.durationMs || 0)) * currentTime.value;
  }, 1000);
}

async function prev() {
  const time = (await YT.player?.getCurrentTime()) || 0;
  if (time > 10) {
    width.value = 0;
    currentTime.value = 0;
    YT.player?.seekTo(0, true);
    return;
  }
  YT.prev();

  moveThumb();
}

async function fecthFromYT(name: string) {}
</script>

<template>
  <div
    class="relative min-h-screen w-full flex py-20 md:py-0 justify-center items-center bg-gradient-to-b from-black to-[#0e1222]"
  >
    <div class="absolute top-0 left-0 p-5">
      <NuxtLink @click="goBack" class="flex gap-3 items-center cursor-pointer">
        <Icon
          name="fluent:arrow-left-24-filled"
          class="text-3xl text-gray-400"
        />
        <span> Go back </span>
      </NuxtLink>
    </div>

    <div
      v-if="isLoading || !song"
      class="grid grid-cols-2 w-full max-w-[1000px]"
    >
      <div
        class="col-span-full md:col-span-1 flex justify-center items-center opacity-70"
      >
        <USkeleton class="w-4/5 max-w-[370px] rounded-xl h-80" />
      </div>

      <div
        class="col-span-full md:col-span-1 flex flex-col gap-8 justify-center items-center p-6"
      >
        <div class="w-full flex flex-col gap-3">
          <USkeleton class="w-3/4 h-8" />
          <USkeleton class="w-1/2 h-6" />
        </div>
        <div class="my-3 w-full grid gap-3">
          <USkeleton class="w-full h-1 bg-gray-800 rounded-full" />
          <USkeleton class="w-full h-6" />
        </div>

        <div class="flex gap-5 items-center">
          <USkeleton
            class="w-10 h-10 rounded-full flex justify-center items-center bg-gray-100 text-gray-900 cursor-pointer text-3xl"
          />
          <USkeleton
            class="w-10 h-10 rounded-full flex justify-center items-center bg-gray-100 text-gray-900 cursor-pointer text-3xl"
          />
          <USkeleton
            class="w-14 h-14 rounded-full flex justify-center items-center bg-gray-100 text-gray-900 cursor-pointer text-3xl"
          />
          <USkeleton
            class="w-10 h-10 rounded-full flex justify-center items-center bg-gray-100 text-gray-900 cursor-pointer text-3xl"
          />
          <USkeleton
            class="w-10 h-10 rounded-full flex justify-center items-center bg-gray-100 text-gray-900 cursor-pointer text-3xl"
          />
        </div>
      </div>
    </div>

    <div v-else class="grid grid-cols-2 w-full max-w-[1000px]">
      <div
        class="col-span-full md:col-span-1 flex justify-center items-center opacity-70"
      >
        <div
          class="loading-img w-[320px] min-h-[320px] flex justify-center items-center rounded bg-cover bg-[url(/img/song-loading.webp)]"
        >
          <img
            :src="song.image"
            class="w-full h-full rounded-lg opacity-0 transition-opacity duration-300"
            ref="songImage"
          />
        </div>
      </div>

      <div
        class="col-span-full md:col-span-1 flex flex-col gap-8 justify-center items-center p-6"
      >
        <div class="w-full">
          <h2 class="text-4xl lg:text-5xl font-bold font-kanit uppercase">
            {{ wordLimit(song.name, 5) }}
          </h2>
          <p class="text-sm md:text-md text-gray-400">{{ song.artist }}</p>
        </div>
        <div class="my-3 w-full grid gap-3">
          <div class="w-full h-1 bg-gray-800 rounded-full">
            <div
              class="relative w-1/3 h-full bg-gradient-to-r from-indigo-700 via-purple-500 to-blue-500 rounded-full"
              :style="{
                width: `${width}%`,
              }"
            >
              <div
                class="absolute w-3 h-3 rounded-full bg-blue-500 right-0 -top-1"
              ></div>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <p class="text-sm">{{ msToMin(currentTime) }}</p>
            <p class="text-sm">{{ msToMin(song.durationMs) }}</p>
          </div>
        </div>
        <div class="flex justify-around items-center w-full">
          <div class="hidden sm:block">
            <Icon
              name="iconamoon:playlist-shuffle-bold"
              class="text-2xl cursor-pointer text-gray-400"
            />
          </div>

          <Icon
            name="tabler:player-track-prev-filled"
            class="text-2xl cursor-pointer"
            @click="prev"
          />

          <div
            class="w-14 h-14 rounded-full flex justify-center items-center bg-gray-100 text-gray-900 cursor-pointer text-3xl"
            @click="YT.playOrPause"
          >
            <Icon name="solar:play-bold" v-show="!YT.isPlaying" />
            <Icon name="solar:pause-bold" v-show="YT.isPlaying" />
          </div>

          <Icon
            name="tabler:player-track-next-filled"
            class="text-2xl cursor-pointer"
            @click="YT.next"
          />

          <div class="hidden sm:block">
            <Icon
              name="iconamoon:playlist-repeat-list-bold"
              class="text-2xl cursor-pointer text-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
