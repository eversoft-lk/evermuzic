<script setup lang="ts">
const color = useColorMode();
const YT = usePlayer();
const ytPlayer = ref<HTMLElement>();

onMounted(async () => {
  color.preference = "dark";
  width.value = window.innerWidth;
  window.addEventListener("resize", () => {
    width.value = window.innerWidth;
  });

  if (YT.player) {
    const iframe = await YT.player.getIframe();
    ytPlayer.value?.appendChild(iframe);
  }
});

const width = ref(0);
const isLarge = computed(() => width.value > 1024);
provide("isLarge", isLarge);
</script>

<template>
  <div>
    <NuxtPage />
    <div>
      <UnderDevelopment />
      <UNotifications />
      <div ref="ytPlayer" id="yt-player" class="hidden"></div>
    </div>
  </div>
</template>
