<script setup>
const auth = useAuth();
const isLoggedIn = ref(false);
const playlists = ref([]);
const app = useRuntimeConfig();

onMounted(() => {
  isLoggedIn.value = auth.isLoggedIn;
});
watch(
  () => auth.isLoggedIn,
  () => {
    isLoggedIn.value = auth.isLoggedIn;
    RefreshPlaylist();
  }
);

const { data, refresh: RefreshPlaylist } = await useFetch(
  app.public.evermuzicApi + "/favourite",
  {
    headers: {
      Authorization: auth.accessToken,
    },
  }
);

if (data.value) {
  playlists.value = data.value.playlists;
}
</script>

<template>
  <NuxtLayout name="home">
    <div class="p-5 flex justify-center">
      <div
        class="w-full md:w-2/3 lg:max-w-[800px] gap-2 p-5 bg-red-600/30 rounded-lg border-red-600"
        v-if="!isLoggedIn"
      >
        <h1 class="font-bold text-xl font-kanit">
          WARNING: You are not logged in!
        </h1>

        <p class="mt-2">
          You need to be logged in to access this page. Please sign in to view
          your favorite playlists.
          <NuxtLink class="font-bold" to="/auth/sign-in">Click Here</NuxtLink>
          to sign in.
        </p>

        <p class="mt-1">
          If you don't have an account yet, you can create one for free.
          <NuxtLink class="font-bold" to="/auth/sign-up">Click Here</NuxtLink>
          to sign up.
        </p>
      </div>

      <div
        class="w-full md:w-2/3 lg:max-w-[800px] gap-2 p-5 bg-blue-600/30 rounded-lg border-blue-600"
        v-else-if="playlists?.length === 0"
      >
        <h1 class="font-bold text-xl font-kanit">
          You don't have any favorite playlists yet!
        </h1>

        <p class="mt-2">
          You can add your favorite playlists by clicking the heart icon on the
          playlist page.
        </p>
      </div>

      <div class="w-full gap-2" v-else>
        <div class="flex justify-between">
          <p class="text-white text-xl font-bold">Saved Playlists</p>
        </div>
        <div
          class="w-full bg-[#05060e88] mt-3 rounded-lg border border-slate-900 shadow-lg shadow-slate-950"
        >
          <div class="scroll-container overflow-x-auto py-1 px-1">
            <div class="flex space-x-2">
              <PlaylistCard
                v-for="playlist in playlists"
                :key="playlist.id"
                class="flex-none"
                :name="playlist.title"
                :description="playlist.description"
                :image="playlist.image"
                :to="`/playlist/${playlist.playlist_type}/${playlist.playlist_id}`"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
