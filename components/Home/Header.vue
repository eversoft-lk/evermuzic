<script setup>
const navbar = useNavbarStore();
const route = useRouter();
const router = useRoute();
const YT = usePlayer();
const query = ref("");
const auth = useAuth();
const isLoggedIn = ref(false);

onMounted(() => {
  isLoggedIn.value = auth.isLoggedIn;
  if (router.path == "/search" || router.path == "/yt-search") {
    query.value = router.query["q"];
    YT.searchQuery = query.value;
  }
});
watch(
  () => auth.isLoggedIn,
  () => {
    isLoggedIn.value = auth.isLoggedIn;
  }
);

function search() {
  if (!query.value.trim()) {
    return;
  }

  YT.searchQuery = query.value;

  // This part is the reason for searching error
  // if (router.path === "/yt-search") {
  //   route.push(`/yt-search?q=${YT.searchQuery}`);
  //   return;
  // }

  if (router.path === "/yt-search" || router.path === "/search") {
    return;
  }
  route.push(`/search?q=${YT.searchQuery}`);
}

const items = [
  [
    {
      label: "ben@example.com",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => {
        auth.logout();
      }
    },
  ],
];

function shortenEmail(email, length = 10) {
  const [localPart, domain] = email.split("@");

  // Determine the length to keep from the start and end of the local part
  const startLength = Math.min(Math.floor((length - 5) / 2), localPart.length);
  const endLength = Math.min(
    Math.ceil((length - 5) / 2),
    localPart.length - startLength
  );

  if (localPart.length <= startLength + endLength + 5) {
    // If the email is short enough, return it as is
    return email;
  }

  const shortenedLocalPart = `${localPart.slice(
    0,
    startLength
  )}.....${localPart.slice(localPart.length - endLength)}`;

  return `${shortenedLocalPart}@${domain}`;
}
</script>

<template>
  <div class="w-full grid grid-cols-4 md:grid-cols-3 p-5">
    <div class="hidden md:flex items-center gap-3">
      <NuxtLink to="/" class="font-bold">Music</NuxtLink>
      <NuxtLink to="/donation" class="font-bold">Donation</NuxtLink>
      <NuxtLink to="/feedback" class="font-bold">Feedback</NuxtLink>
    </div>
    <div class="flex justify-center col-span-3 md:col-span-1">
      <UInput
        placeholder="Type here to search"
        color="gray"
        size="lg"
        icon="material-symbols:search"
        class="w-full"
        v-model="query"
        @keyup.enter="search"
        block
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
          v-if="!isLoggedIn"
        />
        <UDropdown
          v-else
          :items="items"
          :ui="{ item: { disabled: 'cursor-text select-text' } }"
          :popper="{ placement: 'bottom-start' }"
        >
          <UAvatar :alt="auth.user.name" />

          <template #account="{ item }">
            <div class="text-left">
              <p>Signed in as</p>
              <p class="truncate font-medium text-gray-900 dark:text-white">
                {{ shortenEmail(auth.user.email, 15) }}
              </p>
            </div>
          </template>

          <!-- <template #item="{ item }">
            <span class="truncate">{{ item.label }}</span>

            <UIcon
              :name="item.icon"
              class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
            />
          </template> -->
        </UDropdown>
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
