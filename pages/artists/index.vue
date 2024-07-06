<script setup lang="ts">
const app = useRuntimeConfig();
const geoArtists = ref<Artist[]>([]);
const popularArtists = ref<Artist[]>([]);
const spotify = useSpotify();

type Artist = {
  id: string;
  name: string;
  image?: string;
};

type getArtistsResponse = {
  geo: Artist[];
  popular: Artist[];
};

type ArtistFromSpotifyResponse = {
  artists: {
    items: spotifyArtists[];
  };
};

type spotifyArtists = {
  id: string;
  name: string;
  images: {
    url: string;
  }[];
};

onMounted(async () => {
  await getArtists();
});

async function getArtists() {
  const { data: artists } = await useFetch<getArtistsResponse>(
    app.public.evermuzicApi + "/artists"
  );
  if (!artists.value) {
    return;
  }

  let geoCounter = 0;
  artists.value.geo.forEach((artist) => {
    if (geoCounter > 8) {
      return;
    }

    geoCounter++;
    useFetch<ArtistFromSpotifyResponse>(
      app.public.spotifyApi +
        `/search?q=${artist.name.toLowerCase()}&type=artist&limit=8&offset=0`,
      {
        headers: {
          Authorization: `Bearer ${spotify.accessToken}`,
        },
      }
    ).then((res) => {
      if (!res.data?.value) {
        return;
      }

      const data = res.data.value;
      const item: Artist = {
        id: data.artists.items[0].id,
        name: data.artists.items[0].name,
        image: data.artists.items[0].images[1]?.url,
      };

      geoArtists.value.push(item);
    });
  });

  let popularCounter = 0;
  artists.value.popular.forEach((artist) => {
    if (popularCounter > 8) {
      return;
    }

    popularCounter++;
    useFetch<ArtistFromSpotifyResponse>(
      app.public.spotifyApi +
        `/search?q=${artist.name.toLowerCase()}&type=artist&limit=8&offset=0`,
      {
        headers: {
          Authorization: `Bearer ${spotify.accessToken}`,
        },
      }
    ).then((res) => {
      if (!res.data?.value) {
        return;
      }

      const data = res.data.value;
      const item: Artist = {
        id: data.artists.items[0].id,
        name: data.artists.items[0].name,
        image: data.artists.items[0].images[1]?.url,
      };

      popularArtists.value.push(item);
    });
  });
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
            v-if="geoArtists.length < 8"
          >
            <div v-for="index in 8" :key="index" class="flex flex-col gap-3">
              <USkeleton class="h-48 md:h-64 w-48 md:w-64" />
              <USkeleton class="w-full h-2" />
              <USkeleton class="w-2/3 h-2" />
            </div>
          </div>

          <div class="flex justify-center flex-wrap gap-4" v-else>
            <NuxtLink
              v-for="index in 8"
              :key="geoArtists[index - 1]?.name"
              class="h-48 md:h-64 w-48 md:w-64 rounded-lg p-2 bg-cover bg-center"
              :to="`/artists/${geoArtists[index - 1]?.id}`"
              :style="{
                backgroundImage: `url(${geoArtists[index - 1]?.image})`,
              }"
            >
              <div
                class="flex flex-col justify-between h-full bg-black bg-opacity-50 p-2 rounded-lg"
              >
                <p class="text-base text-white">
                  {{ geoArtists[index - 1]?.name }}
                </p>
                <p class="text-sm text-gray-300 text-right">Artist</p>
              </div>
            </NuxtLink>
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
          v-if="popularArtists.length < 7"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4"
        >
          <USkeleton
            class="h-72 md:h-full col-span-1 sm:col-span-2 lg:col-span-2 p-1 shadow-lg shadow-slate-950 sm:p-5"
          />

          <div class="col-span-1 sm:col-span-2 lg:col-span-4">
            <div class="w-full p-1">
              <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <USkeleton
                  v-for="index in 6"
                  class="h-48 md:h-64 lg:h-64 w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4"
          v-else
        >
          <NuxtLink
            class="col-span-1 sm:col-span-2 lg:col-span-2 p-1 bg-slate-950/50 rounded-lg shadow-lg shadow-slate-950 sm:p-5 bg-cover bg-center"
            :style="{
              backgroundImage: `url(${popularArtists[0].image})`,
            }"
            :to="`/artists/${popularArtists[0].id}`"
          >
            <div
              class="flex flex-col justify-between h-full bg-black bg-opacity-50 p-2 rounded-lg"
            >
              <p class="text-2xl text-white">{{ popularArtists[0].name }}</p>
              <p class="text-md text-gray-300 text-right">
                Most Popular Artist Worldwide
              </p>
            </div>
          </NuxtLink>

          <div class="col-span-1 sm:col-span-2 lg:col-span-4">
            <div
              class="w-full p-1 bg-slate-950/50 backdrop-blur-lg rounded-lg border border-slate-900 shadow-lg shadow-slate-950"
            >
              <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <NuxtLink
                  v-for="index in 6"
                  :key="popularArtists[index].name"
                  class="h-48 md:h-64 lg:h-64 w-full rounded-lg p-2 bg-cover bg-center"
                  :style="{
                    backgroundImage: `url(${popularArtists[index].image})`,
                  }"
                  :to="`/artists/${popularArtists[index].id}`"
                >
                  <div
                    class="flex flex-col justify-between h-full bg-black bg-opacity-50 p-2 rounded-lg"
                  >
                    <p class="text-base text-white">
                      {{ popularArtists[index].name }}
                    </p>
                    <p class="text-sm text-gray-300 text-right">Artist</p>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
