<script setup lang="ts">
import type { LocationQueryValue } from "vue-router";
import type { Song, Playlist } from "~/types/YT";

type getSongsResponse = {
  result: Song[];
};

type getPlaylistsResponse = {
  result: Playlist[];
};

const app = useRuntimeConfig();
const route = useRoute();

const query = ref<LocationQueryValue | LocationQueryValue[]>(null);
const playlists = ref<Playlist[]>([]);
const songs = ref<Song[]>([]);
const isLoading = ref(false);
const YT = usePlayer();

onMounted(async () => {
  query.value = route.query["q"];
  if (!query.value) {
    useRouter().push("/searchs");
    return;
  }

  isLoading.value = true;
  await Promise.all([getSongs(), getPlaylists()]);
  isLoading.value = false;
});
watch(
  () => YT.searchQuery,
  async (newQuery) => {
    query.value = newQuery || "";
    if (!query.value) {
      return;
    }

    isLoading.value = true;
    await Promise.all([getSongs(), getPlaylists()]);
    isLoading.value = false;
  }
);

async function getSongs() {
  const { data } = await useFetch<getSongsResponse>(
    app.public.youtubeApi + `/videos?q=${query.value}`
  );

  if (!data.value) {
    return;
  }

  const list = data.value.result.slice(0, 6);

  songs.value = list;
}

async function getPlaylists() {
  const { data } = await useFetch<getPlaylistsResponse>(
    app.public.youtubeApi + `/playlists?q=${query.value}`
  );

  if (!data.value) {
    return;
  }

  playlists.value = data.value.result;
}

function generateDescription(data: Playlist) {
  // Array of possible description templates
  const descriptions = [
    `Check out the playlist "${data.title}" by ${data.channel.name}.`,
    `Enjoy "${data.title}" with ${data.videoCount} amazing tracks.`,
    `${data.channel.name} brings you the best with "${data.title}".`,
    `Listen to "${data.title}" featuring hits like "${data.videos[0].title}" and more.`,
    `Feel the rhythm with "${data.title}" on ${data.channel.name}'s channel.`,
    `Discover new favorites with "${data.title}" by ${data.channel.name}.`,
    `Tune into "${data.title}" for a mix of great songs.`,
    `Explore the playlist "${data.title}" featuring tracks like "${data.videos[0].title}".`,
    `Unwind with "${data.title}" by ${data.channel.name}.`,
    `Get into the groove with "${data.title}" on ${data.channel.name}'s channel.`,
  ];

  // Get a random index
  const randomIndex = Math.floor(Math.random() * descriptions.length);

  // Return the random description
  return descriptions[randomIndex];
}
</script>

<template>
  <div>
    <NuxtLayout name="home">
      <div class="p-5">
        <div class="flex gap-2">
          <UButton
            label="Basic Search"
            color="gray"
            class="rounded-full px-3"
            size="sm"
            :to="`/search?q=${query}`"
          />
          <UButton
            label="Youtube Search"
            color="black"
            class="rounded-full px-3"
            size="sm"
          />
        </div>
        <div class="grid gap-4 grid-cols-1 lg:grid-cols-6 mt-5">
          <!-- Container for the top three items -->
          <div class="col-span-4 space-y-4">
            <div class="flex justify-between">
              <p class="text-white text-xl font-bold">Related Playlists</p>
            </div>

            <div
              class="w-full shadow-lg rounded-lg shadow-slate-950"
              v-if="isLoading || !playlists.length"
            >
              <div class="scroll-container overflow-x-auto py-1 px-1">
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
            </div>

            <div
              class="w-full shadow-lg shadow-slate-950"
              v-else-if="!isLoading && playlists.length"
            >
              <div class="scroll-container overflow-x-auto py-1 px-1">
                <div class="flex space-x-2">
                  <PlaylistCard
                    v-for="playlist in playlists"
                    :key="playlist.id"
                    class="flex-none"
                    :name="playlist.title"
                    :description="generateDescription(playlist)"
                    :image="playlist.thumbnail"
                    :to="`/playlist/2/${playlist.id}`"
                  />
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
                <template v-if="isLoading || !songs.length">
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

                <template v-else-if="!isLoading && songs.length">
                  <SongCard
                    v-for="song in songs"
                    :id="song.id"
                    :key="song.id"
                    :name="song.title"
                    :artist="song.channel.name"
                    :image="song.thumbnail"
                    :duration="song.durationString"
                    type="youtube"
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
