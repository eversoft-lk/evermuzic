<!-- 

  This is the discover page that was removed from the project.

-->

<script setup>
useHead({
  title: "EverMuzic: Ad-Free Music, Anytime, Anywhere",
  meta: [
    {
      name: "description",
      content:
        "Discover EverMuzic, the ultimate platform for ad-free music streaming. Enjoy seamless access to your favorite songs and playlists without interruptions. Join EverMuzic for an uninterrupted music experience.",
    },
    {
      name: "robots",
      content: "noindex",
    },
  ],
});
</script>

<template>
  <div>
    <NuxtLayout name="home">
      <main>
        <div class="py-14 px-10 grid grid-cols-2">
          <div class="col-span-2 md:col-span-1 flex flex-col justify-center">
            <h1 class="text-4xl font-bold text-white">
              EverMuzic: Ad-Free Music, Anytime, Anywhere
            </h1>
            <p class="mt-5">
              Discover EverMuzic, the ultimate platform for ad-free music
              streaming. Enjoy seamless access to your favorite songs and
              playlists without interruptions. Join EverMuzic for an
              uninterrupted music experience.
            </p>
            <div class="mt-5">
              <UButton label="Join EverMuzic" to="/auth/sign-up" size="lg" />
            </div>
          </div>
          <div class="hidden md:flex justify-center items-center">
            <img class="w-1/2" src="/img/evermuzic_boy.png" alt="Evermuzic" />
          </div>
        </div>

        <div class="grid grid-cols-2">
          <div
            class="col-span-full lg:col-span-1 flex flex-col px-10 order-2 lg:order-1"
          >
            <div class="flex justify-between">
              <h2 class="font-bold uppercase">Recently Played</h2>
            </div>
            <div class="my-8">
              <Timeline>
                <TimelineItem
                  time="5s Ago"
                  title="Never Let Go"
                  artist="Jung Kook"
                />
                <TimelineItem
                  time="3 Minutes Ago"
                  title="Please Please Please"
                  artist="Sabrina Carpenter"
                />
                <TimelineItem
                  time="10 Minutes Ago"
                  title="Sympathy Is A Knife"
                  artist="Charli XCX"
                />
                <TimelineItem
                  time="1 Hour Ago"
                  title="Talk Talk"
                  artist="Charli XCX"
                />
                <TimelineItem
                  time="1 Day Ago"
                  title="Von Dutch"
                  artist="Charli XCX"
                />
              </Timeline>
            </div>
          </div>

          <div
            class="col-span-full lg:col-span-1 flex justify-end items-center order-1 lg:order-2"
          >
            <div
              class="relative w-[70%] lg:w-full h-[300px] bg-slate-900 shadow-lg shadow-slate-950 rounded-l-lg"
            >
              <div
                class="absolute w-4/5 h-[80px] px-5 flex items-center bg-slate-800 shadow-lg shadow-slate-950 rounded-lg -top-10 -left-16"
              >
                <div class="flex gap-5">
                  <div
                    class="w-16 h-16 rounded-full bg-[url(/img/cloud-night.jpg)] bg-center bg-cover"
                  ></div>
                  <div class="flex flex-col justify-center gap-1">
                    <p class="text-sm italic">Now Playing</p>
                    <h3 class="font-bold">Never Let Go</h3>
                  </div>
                </div>
              </div>
              <div class="absolute flex gap-5 w-full bottom-10 -left-5">
                <HomeSimillarSongCard
                  :options="{
                    id: '1',
                    title: 'Never Let Go',
                    artist: 'Jung Kook',
                  }"
                />

                <HomeSimillarSongCard
                  :options="{
                    id: '2',
                    title: 'Techno',
                    artist: 'Jon Moyer',
                  }"
                />

                <HomeSimillarSongCard
                  :options="{
                    id: '3',
                    title: 'Tech House',
                    artist: 'Julian Guzz',
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </NuxtLayout>
  </div>
</template>
