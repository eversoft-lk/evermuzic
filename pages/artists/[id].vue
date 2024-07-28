<script setup lang="ts">
import type {
  SpotifyArtistResponse,
  SpotifyRelatedArtist,
  SpotifyArtistTopTrack,
} from "~/types";

type Artist = {
  name: string;
  image: string;
  followers: number;
  songs?: number;
  duration?: string;
  popularity: number;
};

type RelatedArtist = {
  id: string;
  name: string;
  image: string;
  followers: number;
  popularity: number;
};

type RelatedArtistsResponse = {
  artists: SpotifyRelatedArtist[];
};

type TopTrackResponse = {
  tracks: SpotifyArtistTopTrack[];
};

const artistImage = ref<HTMLImageElement>();
const YT = usePlayer();
const spotify = useSpotify();
const app = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const toast = useToast();
const artist = ref<Artist | null>(null);
const relatedArtists = ref<RelatedArtist[]>([]);
const topTracks = ref<SpotifyArtistTopTrack[]>([]);
const isFavorite = ref(false);
const auth = useAuth();
onMounted(() => {
  fetchArtist();
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
    if (!artistImage.value) {
      return;
    }
    artistImage.value.classList.remove("opacity-0");
  });
});

const dropdownItems = [
  [
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

const columns = [
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
    key: "album.name",
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

async function fetchArtist() {
  const { data } = await useFetch<SpotifyArtistResponse>(
    app.public.spotifyApi + "/artists/" + route.params.id,
    {
      headers: {
        Authorization: `Bearer ${spotify.accessToken}`,
      },
    }
  );

  if (!data.value) {
    router.push("/0/artist-not-found");
    return;
  }

  artist.value = {
    name: data.value.name,
    image: data.value.images[0].url,
    followers: data.value.followers.total,
    popularity: data.value.popularity,
    songs: 89,
    duration: "10 hour 42 min",
  };

  Promise.all([getRelatedArtists(), getTopTracks()]);
}

async function getRelatedArtists() {
  const { data } = await useFetch<RelatedArtistsResponse>(
    app.public.spotifyApi + "/artists/" + route.params.id + "/related-artists",
    {
      headers: {
        Authorization: `Bearer ${spotify.accessToken}`,
      },
    }
  );

  if (!data.value) {
    return;
  }

  const artists = data.value.artists.slice(0, 10);

  artists.forEach((artist) => {
    relatedArtists.value.push({
      id: artist.id,
      name: artist.name,
      image: artist.images[0].url,
      followers: artist.followers.total,
      popularity: artist.popularity,
    });
  });
}

async function getTopTracks() {
  const { data } = await useFetch<TopTrackResponse>(
    app.public.spotifyApi + "/artists/" + route.params.id + "/top-tracks",
    {
      headers: {
        Authorization: `Bearer ${spotify.accessToken}`,
      },
    }
  );

  if (!data.value) {
    return;
  }

  topTracks.value = data.value.tracks.map((track, index) => {
    return {
      ...track,
      id: (index + 1).toString(),
    };
  });
}

async function playAll() {
  const songs = topTracks.value?.map((track) => {
    return {
      name: track.name,
      artist: track.artists[0].name,
      thumbnail: track.album.images[0].url,
    };
  });
  let isStarted = false;
  YT.nowPlayingType = "artist";
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

async function download(name: string) {
  const id = await YT.getYTID(name);
  if (!id) {
    toast.add({
      title: "ERROR",
      description:
        "The song you are trying to download is not available to download.",
      timeout: 3000,
      icon: "solar:close-circle-bold",
      color: "red",
    });
  }

  useRouter().push(`/download?videoId=${id}`);
}

async function toggleFavorite() {
  if (!auth.isLoggedIn) {
    toast.add({
      title: "ERROR",
      description: "You need to be logged in to add this artist to favorite.",
      timeout: 3000,
      icon: "solar:close-circle-bold",
      color: "red",
    });
    return;
  }

  const { data } = await useFetch<{ status: "success" | "error" }>(
    app.public.evermuzicApi + "/favourite",
    {
      method: "post",
      headers: {
        Authorization: auth.accessToken as string,
      },
      body: {
        title: artist.value?.name,
        description: `${artist.value?.followers.toLocaleString()}:${
          artist.value?.popularity
        }`,
        image: artist.value?.image,
        playlist_id: route.params.id,
        playlist_type: 4,
      },
    }
  );

  if (!data.value) {
    toast.add({
      title: "ERROR",
      description: "Failed to add this playlist to favorite.",
      timeout: 3000,
      icon: "solar:close-circle-bold",
      color: "red",
    });
    return;
  }

  if (data.value.status === "error") {
    toast.add({
      title: "ERROR",
      description: "Failed to add this playlist to favorite.",
      timeout: 3000,
      icon: "solar:close-circle-bold",
      color: "red",
    });
    return;
  }

  isFavorite.value = !isFavorite.value;
  toast.add({
    title: "SUCCESS",
    description: isFavorite.value
      ? "Playlist added to favorite."
      : "Playlist removed from favorite.",
    timeout: 3000,
    icon: "solar:check-circle-bold",
    color: "green",
  });
}

const { data: favorites } = useFetch(app.public.evermuzicApi + "/favourite", {
  headers: {
    Authorization: auth.accessToken as string,
  },
});
watch(favorites, () => {
  if (favorites.value) {
    const playlist = favorites.value.playlists.find(
      (playlist: any) =>
        playlist.playlist_id === route.params.id && playlist.playlist_type === 4
    );
    isFavorite.value = playlist ? true : false;
  }
});
</script>

<template>
  <div>
    <NuxtLayout name="home">
      <main class="px-5">
        <div
          class="w-full flex flex-col bg-slate-950/40 border border-slate-900 shadow-lg shadow-slate-950 rounded-lg"
        >
          <div class="grid grid-cols-6 gap-5 p-10" v-if="!artist">
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
              <div
                class="w-[240px] min-h-[240px] rounded bg-cover bg-[url(/img/artist-loading.webp)]"
              >
                <img
                  :src="artist.image"
                  class="w-full max-w-[240px] h-full rounded-lg opacity-0 transition-opacity duration-300"
                  ref="artistImage"
                />
              </div>
            </div>

            <div
              class="col-span-full md:col-span-4 flex flex-col justify-end gap-2"
            >
              <span class="uppercase text-xs">ARTIST</span>
              <h1 class="text-4xl font-bold font-kanit uppercase">
                {{ artist.name }}
              </h1>
              <p class="text-xs text-gray-400">
                <span>{{ artist.followers.toLocaleString() }} Followers</span>
                on spotify
              </p>
              <p class="text-xs text-gray-400">
                <strong class="uppercase font-bold text-gray-200"
                  >EVERMUZIC</strong
                >
                <span class="mx-2">●</span>
                <span>{{ artist.songs }} songs</span>
                <span class="mx-2">●</span>
                <span>{{ artist.duration }}</span>
              </p>
            </div>
          </div>

          <div class="px-10 pb-5" v-if="!topTracks.length">
            <USkeleton class="w-full h-[300px]" />
          </div>

          <div class="w-full px-10 pb-5 bg-black/40" v-else>
            <div class="py-5 px-5 flex gap-7 items-center">
              <div
                class="w-12 h-12 flex justify-center items-center rounded-full bg-indigo-500 cursor-pointer"
                @click="playAll"
              >
                <Icon name="solar:play-bold" class="text-xl" />
              </div>
              <div @click="toggleFavorite">
                <Icon
                  name="solar:heart-bold"
                  class="text-3xl text-indigo-500 cursor-pointer"
                  v-if="isFavorite"
                />
                <Icon
                  name="solar:heart-outline"
                  class="text-3xl text-indigo-500 cursor-pointer"
                  v-else
                />
              </div>
              <UDropdown
                :items="dropdownItems"
                :popper="{ arrow: true, placement: 'bottom-end' }"
              >
                <Icon name="bi:three-dots" class="text-xl cursor-pointer" />
              </UDropdown>
            </div>
            <UTable :columns="columns" :rows="topTracks">
              <template #duration-header>
                <Icon name="solar:clock-circle-broken" />
              </template>

              <template #title-data="{ row }">
                <div class="flex gap-3">
                  <img
                    :src="row.album.images[0].url"
                    class="w-12 h-12 rounded-lg"
                  />
                  <div class="flex flex-col justify-center">
                    <p class="text-sm text-gray-200 uppercase font-bold">
                      {{ row.name }}
                    </p>
                    <h3 class="text-gray-400 text-xs">
                      {{ row.artists[0].name }}
                    </h3>
                  </div>
                </div>
              </template>

              <template #added_at-data="{ row }">
                <p class="text-gray-400">
                  {{ new Date(row.album.release_date).toDateString() }}
                </p>
              </template>

              <template #duration-data="{ row }">
                <div class="flex gap-5 items-center">
                  <div @click="download(`${row.name} ${row.artists[0].name}`)">
                    <Icon
                      name="solar:download-minimalistic-outline"
                      class="text-violet-500 text-xl cursor-pointer"
                    />
                  </div>
                  <p class="text-gray-400">
                    {{ msToMin(row.duration_ms) }}
                  </p>
                </div>
              </template>
            </UTable>
          </div>
        </div>

        <div
          class="w-full flex flex-col mt-10 bg-slate-950/40 border border-slate-900 shadow-lg shadow-slate-950 rounded-lg"
        >
          <div class="flex flex-col p-5 md:p-10 bg-black/40">
            <h2 class="text-white text-xl font-bold">Related Artists</h2>
            <div
              v-if="relatedArtists.length < 10"
              class="scroll-container overflow-x-auto py-1 px-1 mt-5"
            >
              <div class="flex space-x-2">
                <div
                  v-for="index in 10"
                  :key="index"
                  class="flex-none w-[240px] h-[320px] flex flex-col gap-3"
                >
                  <USkeleton class="w-full h-[200px] rounded-lg" />
                  <div class="flex flex-col gap-2">
                    <USkeleton class="w-full h-4" />
                    <USkeleton class="w-2/3 h-4" />
                    <USkeleton class="w-full h-2" />
                    <USkeleton class="w-4/5 h-2" />
                    <USkeleton class="w-1/3 h-2" />
                  </div>
                </div>
              </div>
            </div>

            <div class="scroll-container overflow-x-auto py-1 px-1 mt-5" v-else>
              <div class="flex space-x-2">
                <ArtistCard
                  class="flex-none"
                  v-for="artist in relatedArtists"
                  :key="artist.id"
                  :name="artist.name"
                  :image="artist.image"
                  :followers="artist.followers"
                  :popularity="artist.popularity"
                  :to="`/artists/${artist.id}`"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </NuxtLayout>
  </div>
</template>

<style scoped>
.scroll-container::-webkit-scrollbar-track {
  background: #0a0e18; /* Color of the scrollbar track */
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: #888; /* Color of the scrollbar thumb */
  border-radius: 10px; /* Rounded corners of the scrollbar thumb */
  border: 3px solid #0a0e18; /* Padding around the thumb */
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: #555; /* Color when hovering over the scrollbar thumb */
}

.scroll-container {
  scrollbar-width: thin; /* Thin scrollbar */
  scrollbar-color: #888 #0a0e18; /* Scrollbar thumb and track colors */
  scrollbar-gutter: stable;
}
</style>
