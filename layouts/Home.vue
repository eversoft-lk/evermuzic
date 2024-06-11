<template>
  <div class="w-full min-h-screen bg-[#131314] flex">
    <HomeNavbar />
    <div
      class="flex-1 flex flex-col p-5 bg-cover bg-top bg-[url(/img/home-background.png)]"
    >
      <HomeHeader />
      <slot />
    </div>
  </div>
</template>
