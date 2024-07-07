<script setup>
const color = useColorMode();

onMounted(() => {
  color.preference = "dark";
  width.value = window.innerWidth;
  window.addEventListener("resize", () => {
    width.value = window.innerWidth;
  });
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
    </div>
  </div>
</template>
