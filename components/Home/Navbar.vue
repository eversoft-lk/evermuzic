<script setup lang="ts">
const navbar = useNavbarStore();
const isLarge = inject("isLarge") as Ref<boolean>;

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
  <div
    class="w-[250px] flex h-screen flex-col bg-[#05060e] transform-[width] duration-300 z-40"
    :class="{
      'w-[80px]': !navbar.isOpen,
      hidden: !navbar.isOpen && !isLarge,
      'fixed lg:static': !isLarge,
    }"
  >
    <div class="relative flex items-center p-5 gap-3">
      <img src="/img/logo.png" alt="Evermuzic Logo" class="max-w-9" />
      <span
        class="font-bold text-xl"
        :class="{
          'lg:hidden': !navbar.isOpen,
        }"
      >
        Evermuzic
      </span>
      <div
        class="hidden lg:flex absolute w-5 h-5 justify-center items-center rounded-full bg-slate-900 -right-2 cursor-pointer transition-transform duration-300"
        :class="{
          'rotate-0': navbar.isOpen,
          'rotate-180': !navbar.isOpen,
        }"
        @click="navbar.toggleNavbar"
      >
        <Icon name="ic:sharp-keyboard-arrow-left" class="text-2xl" />
      </div>
    </div>
    <div
      class="flex-1 flex flex-col gap-5"
      :class="{
        'p-5': navbar.isOpen,
        'items-center': !navbar.isOpen,
      }"
    >
      <HomeLink
        v-for="option in options"
        :key="option.name"
        :options="option"
      />
    </div>
  </div>
</template>
