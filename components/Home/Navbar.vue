<script setup lang="ts">
const options = [
  {
    name: "Browse",
    options: [
      {
        name: "Discover",
        icon: "material-symbols:search",
        to: "/",
      },
      {
        name: "Songs",
        icon: "material-symbols:headphones-rounded",
        to: "/songs",
      },
      {
        name: "Top Chart",
        icon: "material-symbols:stacked-bar-chart",
        to: "/top-chart",
      },
      {
        name: "Artists",
        icon: "material-symbols:artist",
        to: "/artists",
      },
    ],
  },
  {
    name: "Playlist",
    options: [
      {
        name: "My Playlist",
        icon: "material-symbols:playlist-play",
        to: "/playlist",
      },
      {
        name: "Favorite",
        icon: "ph:list-heart-bold",
        to: "/playlist/favorite",
      },
    ],
  },
];
</script>

<template>
  <div class="w-[250px] flex flex-col bg-[#05060e] overflow-hidden">
    <div class="flex items-center p-5 gap-3">
      <img src="/img/logo.png" alt="Evermuzic Logo" class="w-9 h-9" />
      <span class="font-bold text-xl">Evermuzic</span>
    </div>
    <div class="flex-1 flex flex-col p-5 gap-5">
      <HomeLink
        v-for="option in options"
        :key="option.name"
        :options="option"
      />
    </div>
  </div>
</template>
