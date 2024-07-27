<script setup lang="ts">
import YouTubePlayer from "youtube-player";
import type { Song } from "~/types/YT";

type SearchResultType = {
  result: Song[];
};

// useHead({
//   meta: [
//     {
//       name: "monetag",
//       content: "e8ec2c262bdcc6e4a5adb0ef21759ba9",
//     },
//   ],
//   script: [
//     // {
//     //   src: "/js/monetag/1-in-page-push.js",
//     //   "data-cfasync": false,
//     //   type: "text/javascript",
//     // },
//     // {
//     //   src: "/js/monetag/2-in-page-push.js",
//     // },
//     {
//       src: "/js/monetag/3-vignette.js",
//       "data-cfasync": false,
//       type: "text/javascript",
//     },
//     {
//       src: "/js/monetag/4-vignette.js",
//     },
//     {
//       async: true,
//       "data-cfasync": false,
//       src: "//thubanoa.com/1?z=7776412",
//     },
//     // {
//     //   src: "/js/monetag/5-in-page-push-normal.js",
//     // },
//   ],
// });

const app = useRuntimeConfig();
const color = useColorMode();
const YT = usePlayer();
const ytPlayer = ref<HTMLElement>();
const thumbWidth = ref(0);
const duration = ref(0);
const route = useRoute();

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
