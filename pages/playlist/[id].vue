<script setup>
const dropdownItems = [
  [
    {
      label: "Download",
      icon: "solar:download-bold",
    },
    {
      label: "Share",
      icon: "solar:share-bold",
    },
  ],
  [
    {
      label: "Report",
      icon: "solar:flag-bold",
    },
  ],
];

const columns = [
  {
    label: "#",
    key: "id",
  },
  {
    label: "TITLE",
    key: "title",
  },
  {
    label: "ALBUM",
    key: "album",
  },
  {
    label: "DATE ADDED",
    key: "createdAt",
  },
  {
    label: "DURATION",
    key: "duration",
  },
];

const songs = [
  {
    id: 1,
    songName: "Faded",
    publisher: "Alan Walker",
    album: "Faded",
    createdAt: "2021-09-01",
    duration: "3:32",
  },
];
</script>

<template>
  <div>
    <NuxtLayout name="home">
      <main class="px-5">
        <div
          class="w-full flex flex-col bg-slate-950/40 border border-slate-900 shadow-lg shadow-slate-950 rounded-lg"
        >
          <div class="grid grid-cols-6 gap-5 p-10">
            <div class="col-span-full md:col-span-2">
              <img
                src="/img/cloud-night.jpg"
                class="w-full h-full rounded-lg object-cover"
              />
            </div>

            <div
              class="col-span-full md:col-span-4 flex flex-col justify-end gap-2"
            >
              <span class="uppercase text-xs">PLAYLIST</span>
              <h1 class="text-4xl font-bold font-kanit uppercase">
                This Is Alan Walker
              </h1>
              <p class="text-sm text-gray-400">
                The Essesntial Alan Walker tracks and remizes
              </p>
              <p class="text-xs text-gray-400">
                <strong class="uppercase font-bold text-gray-200"
                  >EVERMUZIC</strong
                >
                <span class="mx-2">●</span>
                <span>1, 324, 432 Likes</span>
                <span class="mx-2">●</span>
                <span>50 songs, 2hr 36 min</span>
              </p>
            </div>
          </div>
          <div class="w-full px-10 pb-5 bg-black/40">
            <div class="py-5 px-5 flex gap-7 items-center">
              <div
                class="w-12 h-12 flex justify-center items-center rounded-full bg-indigo-500 cursor-pointer"
              >
                <Icon name="solar:play-bold" class="text-xl" />
              </div>
              <Icon
                name="solar:heart-bold"
                class="text-3xl text-indigo-500 cursor-pointer"
              />
              <UDropdown
                :items="dropdownItems"
                :popper="{ arrow: true, placement: 'bottom-end' }"
              >
                <Icon name="bi:three-dots" class="text-xl cursor-pointer" />
              </UDropdown>
            </div>
            <UTable :rows="songs" :columns="columns">
              <template #duration-header>
                <Icon name="solar:clock-circle-broken" />
              </template>

              <template #title-data="{ row }">
                <div class="flex gap-3">
                  <div
                    class="w-12 h-12 rounded-lg bg-[url(https://i.ytimg.com/vi/60ItHLz5WEA/default.jpg)] bg-center bg-cover"
                  ></div>
                  <div class="flex flex-col justify-center">
                    <p class="text-sm text-gray-200 uppercase font-bold">
                      {{ row.songName }}
                    </p>
                    <h3 class="text-gray-400 text-xs">{{ row.publisher }}</h3>
                  </div>
                </div>
              </template>

              <template #duration-data="{ row }">
                <div class="flex gap-5 items-center">
                  <Icon
                    name="solar:download-minimalistic-outline"
                    class="text-violet-500 text-xl cursor-pointer"
                  />
                  <p class="text-gray-400">{{ row.duration }}</p>
                </div>
              </template>
            </UTable>
          </div>
        </div>
      </main>
    </NuxtLayout>
  </div>
</template>
