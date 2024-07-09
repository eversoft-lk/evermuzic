<script setup>
const navbar = useNavbarStore();
const route = useRouter();
const router = useRoute();
const query = ref("");
onMounted(() => {
  if (router.path == "/search" || router.path == "/yt-search") {
    query.value = router.query["q"];
  }
});

function search() {
  if (!query.value.trim()) {
    return;
  }

  if (router.path === "/yt-search") {
    route.push(`/yt-search?q=${query.value}`);
    return;
  }

  route.push(`/search?q=${query.value}`);
}
</script>

<template>
  <div class="w-full grid grid-cols-2 md:grid-cols-3 p-5">
    <div class="flex items-center gap-3">
      <NuxtLink to="/" class="font-bold">Music</NuxtLink>
      <NuxtLink to="/donation" class="font-bold">Donation</NuxtLink>
      <NuxtLink to="/feedback" class="font-bold">Feedback</NuxtLink>
    </div>
    <div class="hidden md:flex justify-center px-5">
      <UInput
        placeholder="Type here to search"
        color="gray"
        size="lg"
        icon="material-symbols:search"
        class="w-full"
        v-model="query"
        @keyup.enter="search"
      />
    </div>
    <div class="flex items-center justify-end gap-4">
      <div class="items-center gap-4 hidden lg:flex">
        <Icon name="material-symbols:notifications" class="cursor-pointer" />
        <Icon
          name="material-symbols:settings-suggest-rounded"
          class="cursor-pointer"
        />
        <UButton
          to="/auth/sign-in"
          label="Get Started"
          color="black"
          size="lg"
        />
      </div>
      <UButton
        icon="material-symbols:menu"
        color="black"
        @click="navbar.toggleNavbar()"
        class="rounded-full lg:hidden"
      />
    </div>
  </div>
</template>
