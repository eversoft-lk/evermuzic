<script setup lang="ts">
const app = useRuntimeConfig();
const geoArtists = ref([]);
const popularArtists = ref([]);

onMounted(async () => {
  await getArtists();
});

async function getArtists() {
  const { data } = await useFetch(app.public.evermuzicApi + "/artists");
  if (data.value) {
    geoArtists.value = data.value.geo;
    popularArtists.value = data.value.popular;
  }

  console.log(toRaw(geoArtists.value));
  console.log(toRaw(popularArtists.value));
}
</script>

<template>
  <div>
    <NuxtLayout name="home">
      <div class="p-5">
        <div class="flex justify-between pb-5">
          <p class="text-white text-xl font-bold">Popular Artists</p>
          <NuxtLink
            to="/recently-played"
            class="text-blue-600 hover:text-blue-500"
            >View All
          </NuxtLink>
        </div>
        <div class="w-full">
          <div
            class="flex justify-center flex-wrap gap-4"
            v-if="geoArtists.length > 0"
          >
            <div
              v-for="index in 8"
              :key="geoArtists[index - 1].name"
              class="h-48 md:h-64 w-48 md:w-64 rounded-lg p-2 bg-cover bg-center"
              style="
                background-image: url('https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg');
              "
            >
              <div
                class="flex flex-col justify-between h-full bg-black bg-opacity-50 p-2 rounded-lg"
              >
                <p class="text-base text-white">
                  {{ geoArtists[index - 1].name }}
                </p>
                <p class="text-sm text-gray-300 text-right">Artist</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-between pb-5 pt-5">
          <p class="text-white text-xl font-bold">Popular Worldwide</p>
          <NuxtLink
            to="/recently-played"
            class="text-blue-600 hover:text-blue-500"
            >View All
          </NuxtLink>
        </div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4"
          v-if="popularArtists.length > 0"
        >
          <div
            class="col-span-1 sm:col-span-2 lg:col-span-2 p-1 bg-slate-950/50 rounded-lg shadow-lg shadow-slate-950 sm:p-5 bg-cover bg-center"
            style="
              background-image: url('https://upload.wikimedia.org/wikipedia/commons/7/71/Taylor_Swift_The_Eras_Tour_1989_Era_Set_%2853109542801%29_%28cropped%29.jpg');
            "
          >
            <div
              class="flex flex-col justify-between h-full bg-black bg-opacity-50 p-2 rounded-lg"
            >
              <p class="text-2xl text-white">{{ popularArtists[0].name }}</p>
              <p class="text-md text-gray-300 text-right">
                Most Popular Artist Worldwide
              </p>
            </div>
          </div>

          <div class="col-span-1 sm:col-span-2 lg:col-span-4">
            <div
              class="w-full p-1 bg-slate-950/50 backdrop-blur-lg rounded-lg border border-slate-900 shadow-lg shadow-slate-950"
            >
              <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  v-for="index in 6"
                  :key="popularArtists[index].name"
                  class="h-48 md:h-64 lg:h-64 w-full rounded-lg p-2 bg-cover bg-center"
                  style="
                    background-image: url('https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg');
                  "
                >
                  <div
                    class="flex flex-col justify-between h-full bg-black bg-opacity-50 p-2 rounded-lg"
                  >
                    <p class="text-base text-white">
                      {{ popularArtists[index].name }}
                    </p>
                    <p class="text-sm text-gray-300 text-right">Artist</p>
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
<!-- 
<script>
export default {
  data() {
    return {
      artist: [
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
      popularartist: [
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
        {
          imageUrl:
            "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
          title: "Summer Hits",
          tracks: 25,
        },
      ],
      big: [
        {
          imageUrl:
            "https://upload.wikimedia.org/wikipedia/commons/7/71/Taylor_Swift_The_Eras_Tour_1989_Era_Set_%2853109542801%29_%28cropped%29.jpg",
          title: "taylor swift",
          tracks: 35,
        },
      ],
    };
  },
};
</script> -->
