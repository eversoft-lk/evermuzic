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
            <HomeFooterItem name="Popular Now" link="/" />
            <HomeFooterItem name="Popular Artists" link="/artists" />
            <HomeFooterItem name="Trending Now" link="/" />
            <HomeFooterItem name="Playlist for you" link="/" />
            <HomeFooterItem name="Popular Worldwide" link="/artists" />
          </div>
        </div>
        <div class="w-full flex flex-col items-center gap-2 order-3">
          <h3 class="text-xl font-bold text-center uppercase">Trending Now</h3>
          <div class="flex flex-col text-center">
            <HomeFooterItem name="ESPRESSO" link="/search?q=espresso" />
            <HomeFooterItem name="Good Luck, Babe!" link="/search?q=Good%20Luck,%20Babe!" />
            <HomeFooterItem name="BIRDS OF A FEATHER" link="/search?q=BIRDS%20OF%20A%20FEATHER" />
            <HomeFooterItem name="Please Please Please" link="/search?q=Please%20Please%20Please" />
            <HomeFooterItem name="Not Like Us" link="/search?q=BIRDS%20OF%20A%20FEATHER" />
          </div>
        </div>
      </div>
      <div
        class="w-full flex flex-col lg:flex-row text-center lg:text-right lg:justify-between py-4 border-t border-gray-400 dark:border-b-dark"
      >
        <p>
          Design And Developed By
          <a class="font-bold">Team of EverMusic</a>.
        </p>
        <p>
          &copy; Copyright 2024
          <a class="font-bold">Team of EverMusic</a>. Alright Reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
