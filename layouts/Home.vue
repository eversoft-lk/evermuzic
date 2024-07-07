<script setup>
const navbar = useNavbarStore();
</script>

<template>
  <div
    class="relative w-full min-h-screen bg-gradient-to-b from-black to-[#0e1222] flex"
  >
    <HomeNavbar />
    <div
      class="absolute w-full h-full bg-black/60 z-30 lg:hidden"
      :class="{
        hidden: !navbar.isOpen,
      }"
      @click="navbar.toggleNavbar"
    ></div>
    <div
      class="flex-1 h-screen bg-cover bg-top bg-[url(/img/home-background.png)] overflow-hidden relative"
    >
      <div
        class="w-full h-full flex flex-col justify-between overflow-y-scroll"
      >
        <div>
          <HomeHeader />
          <slot />
        </div>

        <HomeFooter />
      </div>
    </div>

    <Player />
  </div>
</template>
