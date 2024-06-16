<template>
  <div
    class="w-full min-h-screen bg-gradient-to-b from-black to-[#0e1222] flex"
  >
    <HomeNavbar />
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
  </div>
</template>
