<script setup lang="ts">
import type { PlaylistItem, Playlist as YTPlaylist } from "~/types/YT";
import type { SinglePlaylist as SpotifyPlaylist } from "~/types/Spotify";

type YTPlaylistResponse = {
  status: string;
  playlist: {
    content: YTPlaylist;
    items: PlaylistItem[];
  };
};

type Playlist = {
  name: string;
  image: string;
  description: string;
  followers?: number;
  channel?: string;
  totalTracks: number;
  tracks: any[];
};

const YT = usePlayer();
const spotify = useSpotify();
const router = useRoute();
const app = useRuntimeConfig();
const playlist = ref<Playlist | null>(null);
const totalMs = ref(0);
const loading = ref(false);
const method = router.params.method as string;
const isPlaying = ref(false);

onMounted(async () => {
  await fetchPlaylist(
    router.params.id as string,
    router.params.method as string
  );

  if (YT.nowPlayingType === "playlist" && YT.playlistId === router.params.id) {
    isPlaying.value = true;
  }
});

const dropdownItems = [
  [
    {
      label: "Download",
      icon: "solar:download-bold",
    },
    {
      label: "Share",
      icon: "solar:share-bold",
    },
  ],
  [
    {
      label: "Report",
      icon: "solar:flag-bold",
    },
  ],
];

const columns = computed(() => {
  if (method === "1") {
    return [
      {
        label: "#",
        key: "id",
      },
      {
        label: "TITLE",
        key: "title",
      },
      {
        label: "ALBUM",
        key: "track.album.name",
      },
      {
        label: "DATE ADDED",
        key: "added_at",
      },
      {
        label: "DURATION",
        key: "duration",
      },
    ];
  } else {
    return [
      {
        label: "#",
        key: "id",
      },
      {
        label: "TITLE",
        key: "title",
      },
      {
        label: "DATE ADDED",
        key: "added_at",
      },
      {
        label: "DURATION",
        key: "duration",
      },
    ];
  }
});

async function fetchPlaylist(id: string, method: string) {
  if ([0, 1, 2].indexOf(parseInt(method)) === -1) {
    return;
  }

  loading.value = true;

  // 0 = evermuzic
  // 1 = spotify
  // 2 = youtube

  if (method === "0") {
    return;
  }

  if (method === "1") {
    await fetchFromSpotify(id);
    return;
  }

  if (method === "2") {
    await fetchFromYoutube(id);
    return;
  }
}

async function fetchFromSpotify(id: string) {
  const { data } = await useFetch<SpotifyPlaylist>(
    app.public.spotifyApi + `/playlists/${id}`,
    {
      headers: {
        Authorization: `Bearer ${spotify.accessToken}`,
      },
    }
  );

  if (!data.value) {
    return;
  }

  // calculate total duration
  data.value.tracks.items.forEach((track) => {
    totalMs.value += track.track.duration_ms;
  });

  const tracks = data.value.tracks.items.map((track, index) => {
    return {
      id: index + 1,
      title: track.track.name,
      track: track.track,
      added_at: track.added_at,
      duration: msToMin(track.track.duration_ms),
    };
  });

  playlist.value = {
    name: data.value.name,
    description: data.value.description,
    followers: data.value.followers.total,
    totalTracks: data.value.tracks.total,
    image: data.value.images[0].url,
    tracks,
  };

  loading.value = false;
}

async function fetchFromYoutube(id: string) {
  const { data } = await useFetch<YTPlaylistResponse>(
    app.public.evermuzicApi + `/playlists/yt-search/${id}`
  );

  if (!data.value) {
    return;
  }

  playlist.value = {
    name: data.value.playlist.content.snippet.title,
    description: data.value.playlist.content.snippet.description.slice(0, 20),
    channel: data.value.playlist.content.snippet.channelTitle,
    totalTracks: data.value.playlist.items.length,
    image: data.value.playlist.content.snippet.thumbnails.high.url,
    tracks: data.value.playlist.items.map((item, index) => {
      return {
        id: index + 1,
        title: item.snippet.title,
        track: item,
        added_at: item.snippet.publishedAt,
        duration: item.duration,
      };
    }),
  };
}

// write a function to convert ms to human readable format (2hr 36 min)
function msToHumanReadable(ms: number) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours === 0) {
    return `${minutes % 60} min`;
  }

  if (minutes === 0) {
    return `${seconds % 60} sec`;
  }

  return `${hours} hr ${minutes % 60} min`;
}

async function playAll() {
  if (isPlaying.value) {
    YT.player?.pauseVideo();
    return;
  }
  isPlaying.value = true;
  YT.nowPlayingType = "playlist";
  YT.playlistId = router.params.id as string;
  if (method === "1") {
    const songs = playlist.value?.tracks.map((track) => {
      return {
        name: track.title,
        artist: track.track.artists[0].name,
        thumbnail: track.track.album.images[0].url,
      };
    });
    let isStarted = false;
    YT.nowPlaying = 0;
    YT.songs = [];
    for (const song of songs || []) {
      const id = await YT.getYTID(`${song.name} ${song.artist}`);
      if (id) {
        YT.songs.push({
          id,
          name: song.name,
          artist: song.artist,
          thumbnail: song.thumbnail,
        });
        if (!isStarted) {
          await YT.player?.loadVideoById(id);
          await YT.player?.playVideo();
          isStarted = true;
        }
      }
    }
  }

  if (method === "2") {
    if (playlist.value === null) {
      return;
    }
    const songs = playlist.value.tracks.map((track) => {
      return {
        id: track.track.snippet.resourceId.videoId as string,
        name: track.title as string,
        artist: playlist.value?.channel as string,
        thumbnail: track.track.snippet.thumbnails.default.url as string,
      };
    });

    YT.songs = songs;
    YT.nowPlaying = 0;

    if (!YT.isPlaying) {
      await YT.player?.loadVideoById(YT.songs[YT.nowPlaying].id);
      await YT.player?.playVideo();
      YT.isPlaying = true;
    }
    return;
  }
}
</script>

<template>
  <div>
    <UHead
      :name="playlist?.name"
      :description="playlist?.description"
      :image="playlist?.image"
      type="Playlist"
    />
    <NuxtLayout name="home">
      <main class="px-5">
        <div
          class="w-full flex flex-col bg-slate-950/40 border border-slate-900 shadow-lg shadow-slate-950 rounded-lg"
        >
          <div class="grid grid-cols-6 gap-5 p-10" v-if="!playlist">
            <USkeleton
              class="col-span-full h-[240px] md:col-span-2 flex justify-center items-center"
            />

            <div
              class="col-span-full md:col-span-4 flex flex-col justify-end gap-3"
            >
              <USkeleton class="w-20 h-3" />
              <USkeleton class="w-72 h-10" />
              <USkeleton class="w-96 h-4" />
              <USkeleton class="w-72 h-4" />
            </div>
          </div>

          <div class="grid grid-cols-6 gap-5 p-10" v-else>
            <div
              class="col-span-full md:col-span-2 flex justify-center items-center"
            >
              <img
                :src="playlist.image"
                class="w-full max-w-[240px] h-full rounded-lg object-cover"
              />
            </div>

            <div
              class="col-span-full md:col-span-4 flex flex-col justify-end gap-2"
            >
              <span class="uppercase text-xs">PLAYLIST</span>
              <h1 class="text-4xl font-bold font-kanit uppercase">
                {{ playlist.name }}
              </h1>
              <p class="text-sm text-gray-400" v-html="playlist.description" />
              <p class="text-xs text-gray-400">
                <strong class="uppercase font-bold text-gray-200"
                  >EVERMUZIC</strong
                >
                <span class="mx-2">●</span>
                <span v-if="playlist.followers">
                  {{ playlist.followers }} Likes
                  <span class="mx-2">●</span>
                </span>
                <span
                  >{{ playlist.totalTracks }} songs,
                  {{ msToHumanReadable(totalMs) }}</span
                >
              </p>
            </div>
          </div>

          <div class="px-10 pb-5" v-if="!playlist">
            <USkeleton class="w-full h-[300px]" />
          </div>

          <div class="w-full px-10 pb-5 bg-black/40" v-else>
            <div class="py-5 px-5 flex gap-7 items-center">
              <div
                class="w-12 h-12 flex justify-center items-center rounded-full bg-indigo-500 cursor-pointer"
                @click="playAll"
              >
                <Icon
                  name="solar:play-bold"
                  class="text-xl"
                  v-show="!isPlaying"
                />
                <Icon
                  name="solar:pause-bold"
                  class="text-xl"
                  v-show="isPlaying"
                />
              </div>
              <Icon
                name="solar:heart-bold"
                class="text-3xl text-indigo-500 cursor-pointer"
              />
              <UDropdown
                :items="dropdownItems"
                :popper="{
                  arrow: true,
                  placement: 'bottom-end',
                }"
              >
                <Icon name="bi:three-dots" class="text-xl cursor-pointer" />
              </UDropdown>
            </div>
            <UTable
              :rows="playlist.tracks"
              :columns="columns"
              :loading="loading"
            >
              <template #duration-header>
                <Icon name="solar:clock-circle-broken" />
              </template>

              <template #title-data="{ row }">
                <div class="flex gap-3">
                  <div
                    class="w-12 h-12 rounded-lg bg-center bg-cover"
                    :style="{
                      backgroundImage: `url(${row.track.album?.images[0].url})`,
                    }"
                    v-if="method === '1'"
                  ></div>

                  <div
                    class="w-12 h-12 rounded-lg bg-center bg-cover"
                    :style="{
                      backgroundImage: `url(${row.track.snippet.thumbnails?.default?.url})`,
                    }"
                    v-else-if="method === '2'"
                  ></div>
                  <div
                    class="flex flex-col justify-center"
                    v-if="method === '1'"
                  >
                    <p class="text-sm text-gray-200 uppercase font-bold">
                      {{ row.track.name }}
                    </p>
                    <h3 class="text-gray-400 text-xs">
                      {{ row.track.artists[0].name }}
                    </h3>
                  </div>

                  <div
                    class="flex flex-col justify-center"
                    v-else-if="method === '2'"
                  >
                    <p class="text-sm text-gray-200 uppercase font-bold">
                      {{ row.title }}
                    </p>
                    <h3 class="text-gray-400 text-xs">
                      {{ playlist.channel }}
                    </h3>
                  </div>
                </div>
              </template>

              <template #added_at-data="{ row }">
                <p class="text-gray-400">
                  {{ new Date(row.added_at).toDateString() }}
                </p>
              </template>

              <template #duration-data="{ row }">
                <div class="flex gap-5 items-center">
                  <Icon
                    name="solar:download-minimalistic-outline"
                    class="text-violet-500 text-xl cursor-pointer"
                  />
                  <p class="text-gray-400" v-if="method === '1'">
                    {{ msToMin(row.track.duration_ms) }}
                  </p>
                  <p class="text-gray-400" v-else-if="method === '2'">
                    {{ row.duration }}
                  </p>
                </div>
              </template>
            </UTable>
          </div>
        </div>
      </main>
    </NuxtLayout>
  </div>
</template>
