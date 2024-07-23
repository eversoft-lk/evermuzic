<script setup lang="ts">
const app = useRuntimeConfig();
const geoArtists = ref<Artist[]>([]);
const popularArtists = ref<Artist[]>([]);
const spotify = useSpotify();

type Artist = {
  id: string;
  name: string;
  image?: string;
  followers?: number;
  popularity?: number;
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
  followers: {
    total: number;
  };
  popularity: number;
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
    if (geoCounter > 20) {
      return;
    }

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
      if (geoArtists.value.find((a) => a.id === data.artists.items[0].id)) {
        return;
      }

      const item: Artist = {
        id: data.artists.items[0].id,
        name: data.artists.items[0].name,
        image: data.artists.items[0].images[1]?.url,
        followers: data.artists.items[0].followers.total,
        popularity: data.artists.items[0].popularity,
      };

      geoArtists.value.push(item);
      geoCounter++;
    });
  });

  let popularCounter = 0;
  artists.value.popular.forEach((artist) => {
    if (popularCounter > 20) {
      return;
    }

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
      if (popularArtists.value.find((a) => a.id === data.artists.items[0].id)) {
        return;
      }
      const item: Artist = {
        id: data.artists.items[0].id,
        name: data.artists.items[0].name,
        image: data.artists.items[0].images[1]?.url,
        followers: data.artists.items[0].followers.total,
        popularity: data.artists.items[0].popularity,
      };

      popularArtists.value.push(item);
      popularCounter++;
    });
  });
}
</script>

<template>
  <div>
    <NuxtLayout name="home">
      <div class="w-full p-5 overflow-x-hidden">
        <div class="flex justify-between pb-5">
          <p class="text-white text-xl font-bold">Popular Artists</p>
        </div>
        <div class="w-full">
          <div
            class="w-full flex flex-col justify-center flex-wrap gap-4"
            v-if="geoArtists.length <= 20"
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

            <div class="scroll-container overflow-x-auto py-1 px-1 mt-5">
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
            class="w-full bg-[#05060e88] rounded-lg border border-slate-900 shadow-lg shadow-slate-950"
            v-else
          >
            <div class="scroll-container overflow-x-auto py-1 px-1">
              <div class="flex space-x-2">
                <ArtistCard
                  class="flex-none"
                  v-for="artist in geoArtists.slice(0, 10)"
                  :key="artist.id"
                  :name="artist.name"
                  :image="artist.image"
                  :followers="artist.followers"
                  :popularity="artist.popularity"
                  :to="`/artists/${artist.id}`"
                />
              </div>
            </div>

            <div class="scroll-container overflow-x-auto py-1 px-1 mt-5">
              <div class="flex space-x-2">
                <ArtistCard
                  class="flex-none"
                  v-for="artist in geoArtists.slice(10, 20)"
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
        <div class="flex justify-between pb-5 pt-5">
          <p class="text-white text-xl font-bold">Popular Worldwide</p>
        </div>

        <div
          class="w-full flex flex-col justify-center flex-wrap gap-4"
          v-if="popularArtists.length <= 20"
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

          <div class="scroll-container overflow-x-auto py-1 px-1 mt-5">
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
          class="w-full bg-[#05060e88] rounded-lg border border-slate-900 shadow-lg shadow-slate-950"
          v-else
        >
          <div class="scroll-container overflow-x-auto py-1 px-1">
            <div class="flex space-x-2">
              <ArtistCard
                class="flex-none"
                v-for="artist in popularArtists.slice(0, 10)"
                :key="artist.id"
                :name="artist.name"
                :image="artist.image"
                :followers="artist.followers"
                :popularity="artist.popularity"
                :to="`/artists/${artist.id}`"
              />
            </div>
          </div>

          <div class="scroll-container overflow-x-auto py-1 px-1 mt-5">
            <div class="flex space-x-2">
              <ArtistCard
                class="flex-none"
                v-for="artist in popularArtists.slice(10, 20)"
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
