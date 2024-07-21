<script setup lang="ts">
import type { LocationQueryValue } from "vue-router";
import type { Artist, Playlist, Track } from "~/types";

type TrackResponse = {
  tracks: {
    items: Track[];
  };
};

type PlaylistResponse = {
  playlists: {
    items: Playlist[];
  };
};

type ArtistResponse = {
  artists: {
    items: Artist[];
  };
};

const spotify = useSpotify();
const app = useRuntimeConfig();
const route = useRoute();

const query = ref<LocationQueryValue | LocationQueryValue[]>(null);
const artists = ref<Artist[]>([]);
const playlists = ref<Playlist[]>([]);
const songs = ref<Track[]>([]);
onMounted(() => {
  query.value = route.query["q"];
  if (!query.value) {
    useRouter().push("/searchs");
    return;
  }

  Promise.all([getArtists(), getPlaylists(), getSongs()]);
});
watch(
  () => route.query,
  (newQueries) => {
    query.value = newQueries["q"];
    if (!query.value) {
      return;
    }

    playlists.value = [];
    artists.value = [];
    songs.value = [];

    Promise.all([getArtists(), getPlaylists(), getSongs()]);
  }
);

async function getArtists() {
  const { data } = await useFetch<ArtistResponse>(
    app.public.spotifyApi + `/search?q=${query.value}&type=artist`,
    {
      headers: {
        Authorization: `Bearer ${spotify.accessToken}`,
      },
    }
  );

  if (!data.value) {
    return;
  }

  artists.value = data.value.artists.items;
}

async function getPlaylists() {
  const { data } = await useFetch<PlaylistResponse>(
    app.public.spotifyApi + `/search?q=${query.value}&type=playlist`,
    {
      headers: {
        Authorization: `Bearer ${spotify.accessToken}`,
      },
    }
  );

  if (!data.value) {
    return;
  }

  playlists.value = data.value.playlists.items;
}

async function getSongs() {
  const { data } = await useFetch<TrackResponse>(
    app.public.spotifyApi + `/search?q=${query.value}&type=track`,
    {
      headers: {
        Authorization: `Bearer ${spotify.accessToken}`,
      },
    }
  );

  if (!data.value) {
    return;
  }

  songs.value = data.value.tracks.items;
}
</script>

<template>
  <div>
    <NuxtLayout name="home">
      <div class="p-5">
        <div class="grid gap-4 grid-cols-2 lg:grid-cols-6">
          <!-- Container for the top three items -->
          <div class="col-span-2 lg:col-span-4 space-y-4">
            <div class="flex gap-2">
              <UButton
                label="Basic Search"
                color="black"
                class="rounded-full px-3"
                size="sm"
              />
              <UButton
                label="Youtube Search"
                color="gray"
                class="rounded-full px-3"
                size="sm"
                :to="`/yt-search?q=${query}`"
              />
            </div>

            <div class="flex justify-between pt-5">
              <p class="text-white text-xl font-bold">Related Playlists</p>
            </div>

            <div
              class="w-full shadow-lg shadow-slate-950"
              v-if="!playlists.length"
            >
              <div class="scroll-container overflow-x-auto py-1 px-1">
                <div class="flex space-x-2">
                  <USkeleton
                    v-for="index in 8"
                    :key="index"
                    class="flex-none h-52 w-52 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div
              class="w-full bg-[#05060e88] rounded-lg border border-slate-900 shadow-lg shadow-slate-950"
              v-else
            >
              <div class="scroll-container overflow-x-auto py-1 px-1">
                <div class="flex space-x-2">
                  <NuxtLink
                    v-for="playlist in playlists"
                    :key="playlist.id"
                    class="flex-none h-52 w-52 rounded-lg p-2 bg-cover bg-center"
                    :style="{
                      backgroundImage: `url(${playlist.images[0].url})`,
                    }"
                    :to="`/playlist/1/${playlist.id}`"
                  >
                    <div
                      class="flex flex-col justify-between h-full bg-black bg-opacity-50 p-2 rounded-lg"
                    >
                      <p class="text-base text-white">{{ playlist.name }}</p>
                      <p class="text-sm text-gray-300 text-right">
                        {{ playlist.tracks.total }} tracks
                      </p>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
            <div class="flex justify-between pt-5">
              <p class="text-white text-xl font-bold">Related Artists</p>
            </div>

            <div
              class="w-full shadow-lg shadow-slate-950"
              v-if="!artists.length"
            >
              <div class="scroll-container overflow-x-auto py-1 px-1">
                <div class="flex space-x-2">
                  <USkeleton
                    v-for="index in 8"
                    :key="index"
                    class="flex-none h-52 w-52 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div
              class="w-full bg-[#05060e88] rounded-lg border border-slate-900 shadow-lg shadow-slate-950"
              v-else
            >
              <div class="scroll-container overflow-x-auto py-1 px-1">
                <div class="flex space-x-2">
                  <NuxtLink
                    v-for="artist in artists"
                    :key="artist.id"
                    class="flex-none h-52 w-52 rounded-lg p-2 bg-cover bg-center"
                    :style="{
                      backgroundImage: `url(${artist.images[0]?.url})`,
                    }"
                    :to="`/artists/${artist.id}`"
                  >
                    <div
                      class="flex flex-col justify-between h-full bg-black bg-opacity-50 p-2 rounded-lg"
                    >
                      <p class="text-base text-white">{{ artist.name }}</p>
                      <p class="text-sm text-gray-300 text-right">
                        {{ artist.followers.total }} Followers
                      </p>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>

            <div class="flex justify-between pt-5">
              <p class="text-white text-xl font-bold">Related Tracks</p>
            </div>
            <div
              class="w-full rounded-lg bg-[#05060e88] shadow-lg shadow-slate-950"
            >
              <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4"
              >
                <template v-if="!songs.length">
                  <div
                    v-for="index in 6"
                    :key="index"
                    class="flex gap-3 mb-1 p-2"
                  >
                    <USkeleton class="w-20 h-20 rounded-lg" />
                    <div class="flex-1 flex flex-col gap-3 mt-2">
                      <USkeleton class="w-full h-2 rounded-lg" />
                      <USkeleton class="w-2/3 h-2 rounded-lg" />
                      <USkeleton class="w-1/2 h-2 rounded-lg" />
                    </div>
                  </div>
                </template>

                <template v-else>
                  <SongCard
                    v-for="song in songs"
                    :key="song.name"
                    :name="song.name"
                    :artist="song.artists[0].name"
                    :image="song.album.images[0].url"
                    :duration="song.duration_ms"
                    type="spotify"
                  />
                </template>
              </div>
            </div>
          </div>
          <!-- Container for the right-side item -->
          <div class="col-span-2 p-5 flex">
            <div class="border-l border-slate-700 w-full h-full px-4"></div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<style scoped>
.scroll-container::-webkit-scrollbar-track {
  background: #0a0e18;
  /* Color of the scrollbar track */
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: #888;
  /* Color of the scrollbar thumb */
  border-radius: 10px;
  /* Rounded corners of the scrollbar thumb */
  border: 3px solid #0a0e18;
  /* Padding around the thumb */
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: #555;
  /* Color when hovering over the scrollbar thumb */
}

.scroll-container {
  scrollbar-width: thin;
  /* Thin scrollbar */
  scrollbar-color: #888 #0a0e18;
  /* Scrollbar thumb and track colors */
  scrollbar-gutter: stable;
}
</style>
