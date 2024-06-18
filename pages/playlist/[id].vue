<script setup>
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
    key: "created_at",
  },
  {
    label: "DURATION",
    key: "duration",
  },
];

const songs = [];
</script>

<template>
  <div>
    <NuxtLayout name="home">
      <div class="px-5">
        <div
          class="grid grid-cols-6 gap-5 bg-slate-950/40 backdrop-blur-lg border border-slate-900 shadow-lg shadow-slate-950 rounded-lg p-10"
        >
          <div class="col-span-2">
            <img
              src="/img/cloud-night.jpg"
              class="w-full h-full rounded-lg object-cover"
            />
          </div>

          <div class="col-span-4 flex flex-col justify-end gap-2">
            <span class="uppercase text-xs">PLAYLIST</span>
            <h1 class="text-3xl font-bold">This Is Alan Walker</h1>
            <p class="text-xs text-gray-400">
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
          <div class="col-span-full">
            <UTable :rows="songs" :columns="columns" />
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
