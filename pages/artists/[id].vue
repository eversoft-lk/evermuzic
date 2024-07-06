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
};

type RelatedArtist = {
  id: string;
  name: string;
  image: string;
};

type RelatedArtistsResponse = {
  artists: SpotifyRelatedArtist[];
};

type TopTrackResponse = {
  tracks: SpotifyArtistTopTrack[];
};

const spotify = useSpotify();
const app = useRuntimeConfig();
const route = useRoute();
const router = useRouter();

const artist = ref<Artist | null>(null);
const relatedArtists = ref<RelatedArtist[]>([]);
const topTracks = ref<SpotifyArtistTopTrack[]>([]);

onMounted(() => {
  fetchArtist();
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

  console.log(topTracks.value);
}
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
              <img
                :src="artist.image"
                class="w-full max-w-[240px] h-full rounded-lg object-cover"
              />
            </div>

            <div
              class="col-span-full md:col-span-4 flex flex-col justify-end gap-2"
            >
              <span class="uppercase text-xs">ARTIST</span>
              <h1 class="text-4xl font-bold font-kanit uppercase">
                {{ artist.name }}
              </h1>
              <p class="text-xs text-gray-400">
                <span>{{ artist.followers }} Followers</span> on spotify
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
              >
                <Icon name="solar:play-bold" class="text-xl" />
              </div>
              <Icon
                name="solar:heart-bold"
                class="text-3xl text-indigo-500 cursor-pointer"
              />
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
                  <div
                    class="w-12 h-12 rounded-lg bg-center bg-cover"
                    :style="{
                      backgroundImage: `url(${row.album.images[0].url})`,
                    }"
                  ></div>
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
                  <Icon
                    name="solar:download-minimalistic-outline"
                    class="text-violet-500 text-xl cursor-pointer"
                  />
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
              class="scroll-container overflow-x-auto py-1 px-1 mt-5"
              v-if="relatedArtists.length > 0"
            >
              <div class="flex space-x-2">
                <NuxtLink
                  v-for="artist in relatedArtists"
                  :key="artist.id"
                  class="flex-none h-52 w-52 rounded-lg p-2 bg-cover bg-center"
                  :style="{
                    backgroundImage: `url(${artist.image})`,
                  }"
                  :to="`/artists/${artist.id}`"
                >
                  <div
                    class="flex flex-col justify-between h-full bg-black bg-opacity-50 p-2 rounded-lg"
                  >
                    <p class="text-base text-white">{{ artist.name }}</p>
                    <p class="text-sm text-gray-300 text-right">tracks</p>
                  </div>
                </NuxtLink>
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
