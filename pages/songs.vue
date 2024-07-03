<script setup>
const app = useRuntimeConfig();
const spotify = useSpotify();

const trendingNow = ref([]);
const topSong = ref({
  name: null,
  artist: null,
  imageUrl: null,
});

onMounted(async () => {
  await getTrendingSongs();
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
              class="w-full bg-[#05060e88] backdrop-blur-lg rounded-lg border border-slate-900 shadow-lg shadow-slate-950"
            >
              <div class="scroll-container overflow-x-auto py-1 px-1">
                <div class="flex space-x-2">
                  <div
                    v-for="item in playlist"
                    :key="item.title"
                    class="flex-none h-52 w-52 rounded-lg p-2 bg-cover bg-center"
                    :style="{ backgroundImage: 'url(' + item.imageUrl + ')' }"
                  >
                    <div
                      class="flex flex-col justify-between h-full bg-black bg-opacity-50 p-2 rounded-lg"
                    >
                      <p class="text-base text-white">{{ item.title }}</p>
                      <p class="text-sm text-gray-300 text-right">
                        {{ item.tracks }} tracks
                      </p>
                    </div>
                  </div>
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
              class="w-full bg-[#05060e88] backdrop-blur-lg rounded-lg border border-slate-900 shadow-lg shadow-slate-950"
            >
              <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 p-4"
              >
                <div
                  v-for="item in alsolike"
                  :key="item.title"
                  class="flex justify-between p-1 hover:bg-slate-800 rounded-lg"
                >
                  <div class="flex">
                    <img
                      :src="item.imageUrl"
                      alt="icon"
                      class="h-20 w-20 rounded-lg"
                    />
                    <div class="ml-2">
                      <p class="mb-1 text-lg text-white">{{ item.title }}</p>
                      <p class="text-gray-300">{{ item.artist }}</p>
                    </div>
                  </div>
                  <div class="flex">
                    <p class="text-gray-300 mr-2">{{ item.duration }}</p>
                  </div>
                </div>
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

<script>
export default {
  data() {
    return {
      items: [
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Cruel",
          artist: "Jackson Wang",
          duration: "03:29",
        },
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Blinding Lights",
          artist: "The Weeknd",
          duration: "03:20",
        },
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Levitating",
          artist: "Dua Lipa",
          duration: "03:23",
        },
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Save Your Tears",
          artist: "The Weeknd",
          duration: "03:35",
        },
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Levitating",
          artist: "Dua Lipa",
          duration: "03:23",
        },
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Levitating",
          artist: "Dua Lipa",
          duration: "03:23",
        },
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Levitating",
          artist: "Dua Lipa",
          duration: "03:23",
        },
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Levitating",
          artist: "Dua Lipa",
          duration: "03:23",
        },
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Levitating",
          artist: "Dua Lipa",
          duration: "03:23",
        },
      ],
      playlist: [
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Dejavu",
          tracks: 30,
        },
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Summer Hits",
          tracks: 25,
        },
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Summer Hits",
          tracks: 25,
        },
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Summer Hits",
          tracks: 25,
        },
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Summer Hits",
          tracks: 25,
        },
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Summer Hits",
          tracks: 25,
        },
      ],
      alsolike: [
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Save Your Tears",
          artist: "The Weeknd",
          duration: "03:35",
        },
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Save Your Tears",
          artist: "The Weeknd",
          duration: "03:35",
        },
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Save Your Tears",
          artist: "The Weeknd",
          duration: "03:35",
        },
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Save Your Tears",
          artist: "The Weeknd",
          duration: "03:35",
        },
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Save Your Tears",
          artist: "The Weeknd",
          duration: "03:35",
        },
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Save Your Tears",
          artist: "The Weeknd",
          duration: "03:35",
        },
      ],
    };
  },
};
</script>

<style scoped>
.scroll-container {
  overflow-x: auto;
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
  scrollbar-width: none;
  /* Firefox */
}

.scroll-container::-webkit-scrollbar {
  display: none;
  /* Safari and Chrome */
}
</style>
