<template>
  <footer
    class="lg:p-5"
    :class="{
      'pb-20': usePlayer().nowPlayingType !== 'nothing',
    }"
  >
    <div
      class="rounded-t-lg lg:rounded-lg bg-[#05060e] border border-slate-900 w-full flex flex-col bg-[url(/img/footer-img.png)] bg-no-repeat bg-contain bg-right-top px-5"
    >
      <div
        class="w-full flex flex-col lg:flex-row items-center px-5 py-8 gap-y-4"
      >
        <div class="w-full flex flex-col items-center gap-2 order-1 lg:order-2">
          <img src="/img/logo.png" class="w-14 h-14 object-cover" />
          <div class="w-full max-w-[400px]">
            <p class="text-center">
              Discover EverMuzic, the ultimate platform for ad-free music
              streaming. Enjoy seamless access to your favorite songs and
              playlists without interruptions. Join EverMuzic for an
              uninterrupted music experience.
            </p>
          </div>
        </div>
        <div class="w-full flex flex-col items-center gap-2 order-2 lg:order-1">
          <h3 class="text-xl font-bold text-center uppercase">Top Pages</h3>
          <div class="flex flex-col text-center">
            <HomeFooterItem name="Web Development" link="/" />
            <HomeFooterItem name="Mobile Development" link="/" />
            <HomeFooterItem name="UI/ UX Designing" link="/" />
            <HomeFooterItem name="Database Designing" link="/" />
            <HomeFooterItem name="SEO Optimizing" link="/" />
          </div>
        </div>
        <div class="w-full flex flex-col items-center gap-2 order-3">
          <h3 class="text-xl font-bold text-center uppercase">Trending Now</h3>
          <div class="flex flex-col text-center">
            <HomeFooterItem name="Features Of Nuxt JS" link="/" />
            <HomeFooterItem name="New JS Runtime | BUN" link="/" />
            <HomeFooterItem name="Get Started With Laravel" link="/" />
            <HomeFooterItem name="Project Management tips..." link="/" />
            <HomeFooterItem name="First Year in software..." link="/" />
          </div>
        </div>
      </div>
      <div
        class="w-full flex flex-col lg:flex-row text-center lg:text-right lg:justify-between py-4 border-t border-gray-400 dark:border-b-dark"
      >
        <p>
          Design And Developed By
          <a class="font-bold" href="https://www.eversoft.lk"
            >Eversoft IT Solutions</a
          >.
        </p>
        <p>
          &copy; Copyright 2024
          <a class="font-bold" href="https://www.eversoft.lk"
            >Eversoft IT Solutions</a
          >. Alright Reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
