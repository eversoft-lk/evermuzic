<script setup>
const query = ref(null);
const route = useRoute();
onMounted(() => {
  query.value = route.query["q"];
  if (!query.value) {
    useRouter().push("/searchs");
    return;
  }
});
watch(
  () => route.query,
  (newQueries) => {
    query.value = newQueries["q"];
    if (!query.value) {
      return;
    }
  }
);
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
        <div class="grid gap-4 grid-cols-2 lg:grid-cols-4 mt-5">
          <!-- Container for the top three items -->
          <div class="col-span-2 lg:col-span-3 space-y-4">
            <div class="flex justify-between">
              <p class="text-white text-xl font-bold">Playlist for you</p>
              <NuxtLink
                to="/recently-played"
                class="text-blue-600 hover:text-blue-500"
                >View All
              </NuxtLink>
            </div>

            <div
              class="w-full shadow-lg rounded-lg shadow-slate-950"
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

            <div class="w-full shadow-lg shadow-slate-950" v-else>
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
            <div
              class="w-full rounded-lg bg-[#05060e88] backdrop-blur-lg shadow-lg shadow-slate-950"
            >
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
          <div class="col-span-2 lg:col-span-2"></div>
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

<script>
export default {
  data() {
    return {
      topSong: {
        name: "Bad Guy",
        artist: "Billie Eilish",
        imageUrl: "https://via.placeholder.com/150",
      },
      featuredPlaylists: [
        {
          name: "Chill Hits",
          id: 1,
          images: [{ url: "https://via.placeholder.com/150" }],
          tracks: { total: 25 },
        },
        {
          name: "Top Hits",
          id: 2,
          images: [{ url: "https://via.placeholder.com/150" }],
          tracks: { total: 30 },
        },
        {
          name: "Workout",
          id: 3,
          images: [{ url: "https://via.placeholder.com/150" }],
          tracks: { total: 20 },
        },
        {
          name: "Relax & Unwind",
          id: 4,
          images: [{ url: "https://via.placeholder.com/150" }],
          tracks: { total: 40 },
        },
        {
          name: "Relax & Unwind",
          id: 4,
          images: [{ url: "https://via.placeholder.com/150" }],
          tracks: { total: 40 },
        },
      ],
      recommendedSongs: [
        {
          name: "Blinding Lights",
          artist: "The Weeknd",
          duration: 200000,
          imageUrl: "https://via.placeholder.com/150",
        },
        {
          name: "Dance Monkey",
          artist: "Tones and I",
          duration: 210000,
          imageUrl: "https://via.placeholder.com/150",
        },
        {
          name: "Circles",
          artist: "Post Malone",
          duration: 230000,
          imageUrl: "https://via.placeholder.com/150",
        },
        {
          name: "Don't Start Now",
          artist: "Dua Lipa",
          duration: 220000,
          imageUrl: "https://via.placeholder.com/150",
        },
        {
          name: "Senorita",
          artist: "Shawn Mendes & Camila Cabello",
          duration: 200000,
          imageUrl: "https://via.placeholder.com/150",
        },
        {
          name: "Bad Guy",
          artist: "Billie Eilish",
          duration: 190000,
          imageUrl: "https://via.placeholder.com/150",
        },
      ],
    };
  },
  methods: {
    msToMin(ms) {
      const minutes = Math.floor(ms / 60000);
      const seconds = ((ms % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    },
  },
};
</script>
