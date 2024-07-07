<script setup>
const app = useRuntimeConfig();
const spotify = useSpotify();

const featuredPlaylists = ref([]);
const trendingNow = ref([]);
const recommendedSongs = ref([]);
const topSong = ref({
  name: null,
  artist: null,
  imageUrl: null,
});

onMounted(async () => {
  Promise.all([getTrendingSongs(), getFeaturedPlaylist()]);
});
watch(featuredPlaylists, () => {
  recommendedSongs.value = [];
  for (let i = 0; i < 6; i++) {
    getRecommenedSongs();
  }
});

async function getTrendingSongs() {
  const { data } = await useFetch(
    app.public.evermuzicApi + "/songs/trending-now"
  );

  if (!data.value) {
    return;
  }

  const items = data.value.tracks.slice(0, 5);

  getTopSong(items[0].artist.name);
  topSong.value.name = items[0].name;
  items.forEach(async (item) => {
    const { data: tracks } = await useFetch(
      app.public.spotifyApi +
        `/search?query=${item.name}&type=track&locale=en-US%2Cen%3Bq%3D0.5&offset=1&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${spotify.accessToken}`,
        },
      }
    );

    if (tracks.value) {
      const song = tracks.value.tracks.items[0];
      trendingNow.value.push({
        name: item.name,
        artist: item.artist.name,
        duration: song.duration_ms,
        imageUrl: song.album.images[0].url,
      });
    }
  });
}

async function getTopSong(name) {
  const { data } = await useFetch(
    app.public.spotifyApi + `/search?query=${name}&type=artist&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${spotify.accessToken}`,
      },
    }
  );

  if (!data.value) {
    return;
  }

  topSong.value.artist = data.value.artists.items[0].name;
  topSong.value.imageUrl = data.value.artists.items[0].images[0].url;
}

async function getFeaturedPlaylist() {
  const { data } = await useFetch(
    app.public.spotifyApi + "/browse/featured-playlists",
    {
      headers: {
        Authorization: `Bearer ${spotify.accessToken}`,
      },
    }
  );

  if (!data.value) {
    return;
  }

  if (data.value.playlists.items.length > 10) {
    featuredPlaylists.value = data.value.playlists.items.slice(0, 10);
  } else {
    featuredPlaylists.value = data.value.playlists.items;
  }
}

async function getRecommenedSongs() {
  if (!featuredPlaylists.value.length) {
    return;
  }

  const randomIndex = Math.floor(
    Math.random() * featuredPlaylists.value.length
  );
  const randomPlaylist = featuredPlaylists.value[randomIndex];

  const playlistId = randomPlaylist.id;

  const totalTracks = randomPlaylist.tracks.total;
  const randomTrackIndex = Math.floor(Math.random() * totalTracks);

  const { data } = await useFetch(
    app.public.spotifyApi +
      `/playlists/${playlistId}/tracks?offset=${randomTrackIndex}&limit=1`,
    {
      headers: {
        Authorization: `Bearer ${spotify.accessToken}`,
      },
    }
  );

  if (!data.value) {
    return;
  }

  const track = data.value.items[0].track;
  recommendedSongs.value.push({
    name: track.name,
    artist: track.artists[0].name,
    duration: track.duration_ms,
    imageUrl: track.album.images[0].url,
  });
}
</script>

<template>
  <div>
    <NuxtLayout name="home">
      <div class="p-5">
        <div class="grid gap-4 grid-cols-2 lg:grid-cols-6">
          <!-- Container for the top three items -->
          <div class="col-span-2 lg:col-span-4 space-y-4">
            <p class="text-white text-xl font-bold">Most Popular Now</p>

            <USkeleton
              v-if="topSong.name == null"
              class="w-full h-64 p-5 md:p-8 justify-between shadow-lg shadow-slate-950 flex space-x-4"
            />

            <div
              class="w-full p-5 md:p-8 justify-between bg-slate-950/50 backdrop-blur-lg rounded-lg border border-slate-900 shadow-lg shadow-slate-950 flex space-x-4"
              v-else
            >
              <div class="-mt-2">
                <p class="text-white text-lg font-semibold">
                  {{ topSong.artist }}
                </p>
                <p class="text-gray-300 text-2xl line-clamp-1">
                  {{ topSong.name }}
                </p>
                <UButton
                  label="Listen Now"
                  color="black"
                  icon="material-symbols:play-arrow-rounded"
                  class="rounded-full mt-20"
                />
              </div>
              <div class="-mt-16">
                <img
                  :src="topSong.imageUrl"
                  alt="Billie Eilish"
                  class="w-full h-60 rounded-full object-cover"
                />
              </div>
            </div>
            <div class="flex justify-between pt-5">
              <p class="text-white text-xl font-bold">Playlist for you</p>
              <NuxtLink
                to="/recently-played"
                class="text-blue-600 hover:text-blue-500"
                >View All
              </NuxtLink>
            </div>

            <div
              class="w-full shadow-lg shadow-slate-950"
              v-if="!featuredPlaylists.length"
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
              class="w-full shadow-lg shadow-slate-950"
              v-else
            >
              <div class="scroll-container overflow-x-auto py-1 px-1">
                <div class="flex space-x-2">
                  <NuxtLink
                    v-for="playlist in featuredPlaylists"
                    :key="playlist.name"
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
              <p class="text-white text-xl font-bold">You may also like</p>
              <NuxtLink
                to="/recently-played"
                class="text-blue-600 hover:text-blue-500"
                >View All
              </NuxtLink>
            </div>
            <div class="w-full bg-[#05060e88] backdrop-blur-lg rounded-lg shadow-lg shadow-slate-950">
              <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4"
              >
                <template v-if="!recommendedSongs.length">
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
                  <div
                    v-for="song in recommendedSongs"
                    :key="song.name"
                    class="flex justify-between p-2 hover:bg-black/30 rounded-lg"
                  >
                    <div class="flex">
                      <img
                        :src="song.imageUrl"
                        alt="icon"
                        class="h-20 w-20 rounded-lg"
                      />
                      <div class="ml-2">
                        <p class="text-white">{{ song.name }}</p>
                        <p class="text-sm text-gray-400">{{ song.artist }}</p>
                      </div>
                    </div>
                    <div class="flex flex-col justify-between items-center">
                      <p class="text-gray-300 text-sm mr-2">
                        {{ msToMin(song.duration) }}
                      </p>
                      <div class="pb-3">
                        <Icon name="solar:play-bold-duotone" class="text-xl" />
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <!-- Container for the right-side item -->
          <div class="col-span-2 lg:col-span-2">
            <div class="flex justify-between">
              <p class="text-white text-xl font-bold mb-4">Trending Now</p>
              <NuxtLink
                to="/recently-played"
                class="text-blue-600 hover:text-blue-500"
                >View All
              </NuxtLink>
            </div>

            <div
              class="bg-[#05060e88] backdrop-blur-lg rounded-lg border border-slate-900 shadow-lg shadow-slate-950 mb-2 flex-row"
              v-if="!trendingNow.length"
            >
              <div v-for="index in 5" :key="index" class="flex gap-3 mb-1 p-2">
                <USkeleton class="w-20 h-20 rounded-lg" />
                <div class="flex-1 flex flex-col gap-3 mt-2">
                  <USkeleton class="w-full h-2 rounded-lg" />
                  <USkeleton class="w-2/3 h-2 rounded-lg" />
                  <USkeleton class="w-1/2 h-2 rounded-lg" />
                </div>
              </div>
            </div>

            <div
              class="bg-[#05060e88] backdrop-blur-lg rounded-lg border border-slate-900 shadow-lg shadow-slate-950 mb-2 flex-row"
              v-else
            >
              <div
                v-for="song in trendingNow"
                :key="song.name"
                class="flex justify-between p-2 hover:bg-black/30 rounded-lg"
              >
                <div class="flex">
                  <img
                    :src="song.imageUrl"
                    alt="icon"
                    class="h-20 w-20 rounded-lg"
                  />
                  <div class="ml-2">
                    <p class="text-white">{{ song.name }}</p>
                    <p class="text-sm text-gray-400">{{ song.artist }}</p>
                  </div>
                </div>
                <div class="flex flex-col justify-between items-center">
                  <p class="text-gray-300 text-sm mr-2">
                    {{ msToMin(song.duration) }}
                  </p>
                  <div class="pb-3">
                    <Icon name="solar:play-bold-duotone" class="text-xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
