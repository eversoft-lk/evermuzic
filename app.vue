<script setup lang="ts">
import YouTubePlayer from "youtube-player";
import type { Song } from "~/types/YT";

type SearchResultType = {
  result: Song[];
};

type GetDonationResponseType = {
  donations: {
    id: number;
    name: string;
    amount: string;
    email: string;
    createdAt: string;
  }[];
};

const app = useRuntimeConfig();
const color = useColorMode();
const YT = usePlayer();
const ytPlayer = ref<HTMLElement>();
const route = useRoute();
const auth = useAuth();

onMounted(async () => {
  color.preference = "dark";
  width.value = window.innerWidth;
  window.addEventListener("resize", () => {
    width.value = window.innerWidth;
  });

  if (!YT.player) {
    YT.player = YouTubePlayer("yt-player", {
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        enablejsapi: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
      },
    });
  }

  // Handle state changes
  YT.player.on("stateChange", async (event) => {
    // when ended play next
    if (event.data === 0) {
      YT.next();
    }

    if (event.data === 1) {
      if (YT.error) {
        YT.error = null;
      }
      YT.isPlaying = true;
    } else {
      YT.isPlaying = false;
    }
  });

  YT.player.on("error", async (error) => {
    if (!YT.error) {
      const { data: searchResult } = await useFetch<SearchResultType>(
        app.public.youtubeApi + `/videos?q=${YT.songs[YT.nowPlaying]?.name}`
      );

      if (!searchResult.value) {
        YT.next();
        return;
      }

      YT.error = {
        id: YT.songs[YT.nowPlaying]?.id,
        name: YT.songs[YT.nowPlaying]?.name,
        index: 0,
        result: searchResult.value.result,
      };
    }

    YT.error.index++;
    YT.player?.loadVideoById(YT.error.result[YT.error.index].id);
    YT.player?.playVideo();
  });
});

const width = ref(0);
const isLarge = computed(() => width.value > 1024);
provide("isLarge", isLarge);

const isPlayerVisible = computed(() => {
  if (YT.nowPlayingType === "nothing") {
    return false;
  }

  const blockedRoutes = ["/song", "/auth"];
  if (blockedRoutes.some((blockedRoute) => route.path.includes(blockedRoute))) {
    return false;
  }

  return true;
});

const { data: donors } = useFetch<GetDonationResponseType>(
  `${app.public.evermuzicApi}/donate`
);
watch(donors, () => {
  if (!donors.value) {
    return;
  }

  if (auth.isLoggedIn) {
    const isDonor = donors.value.donations.some(
      (donor) => donor.email === auth.user?.email
    );

    if (!isDonor) {
      showAds();
    }
  } else {
    if (localStorage.getItem("agree-to-ads")) {
      showAds();
    }
  }
});
watch(
  () => auth.isLoggedIn,
  () => {
    if (!auth.isLoggedIn) {
      if (localStorage.getItem("agree-to-ads")) {
        showAds();
      }
      return;
    }

    if (!donors.value) {
      return;
    }

    const isDonor = donors.value.donations.some(
      (donor) =>
        donor.email === auth.user?.email &&
        new Date(donor.createdAt) >
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    );

    if (!isDonor) {
      showAds();
    }
  }
);
</script>

<template>
  <div class="overflow-x-hidden">
    <NuxtPage />
    <div>
      <UnderDevelopment />
      <UNotifications />
      <Player v-show="isPlayerVisible" />
      <div ref="ytPlayer" id="yt-player" class="hidden"></div>
    </div>
  </div>
</template>
