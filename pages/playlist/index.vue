<script setup>
const isOpen = ref(false);
const status = [
  { value: "private", label: "Private" },
  { value: "public", label: "Public" },
];
const selected = ref("private");
const featuredPlaylists = ref([
  {
    id: 1,
    name: "Playlist 1",
    description: "This is a description for Playlist 1",
    images: [{ url: "/img/playlist-1.webp" }],
  },
  {
    id: 2,
    name: "Playlist 2",
    description: "This is a description for Playlist 2",
    images: [{ url: "/img/playlist-2.webp" }],
  },
  {
    id: 3,
    name: "Playlist 3",
    description: "This is a description for Playlist 3",
    images: [{ url: "/img/playlist-3.webp" }],
  },
  {
    id: 4,
    name: "Playlist 4",
    description: "This is a description for Playlist 4",
    images: [{ url: "/img/playlist-4.webp" }],
  },
  {
    id: 5,
    name: "Playlist 5",
    description: "This is a description for Playlist 5",
    images: [{ url: "/img/playlist-5.webp" }],
  },
  {
    id: 6,
    name: "Playlist 6",
    description: "This is a description for Playlist 6",
    images: [{ url: "/img/playlist-6.webp" }],
  },
  {
    id: 7,
    name: "Playlist 7",
    description: "This is a description for Playlist 7",
    images: [{ url: "/img/playlist-7.webp" }],
  },
  {
    id: 8,
    name: "Playlist 8",
    description: "This is a description for Playlist 8",
    images: [{ url: "/img/playlist-8.webp" }],
  },
  {
    id: 9,
    name: "Playlist 9",
    description: "This is a description for Playlist 9",
    images: [{ url: "/img/playlist-9.webp" }],
  },
  {
    id: 10,
    name: "Playlist 10",
    description: "This is a description for Playlist 10",
    images: [{ url: "/img/playlist-10.webp" }],
  },
]);
</script>

<template>
  <div>
    <NuxtLayout name="home">
      <div class="p-3 flex justify-end">
        <UButton
          label="Create a New Playlist"
          icon="solar:music-library-2-bold-duotone"
          size="xl"
          trailing
          @click="isOpen = true"
        />

        <USlideover v-model="isOpen">
          <div class="p-4 flex-1">
            <UButton
              color="gray"
              variant="ghost"
              size="sm"
              icon="i-heroicons-x-mark-20-solid"
              class="flex sm:hidden absolute end-5 top-5 z-10"
              square
              padded
              @click="isOpen = false"
            />
            <span
              class="text-sm text-center font-bold uppercase tracking-widest leading-tight"
            >
              Create A New Playlist
            </span>
            <UForm class="flex flex-col gap-5 p-4">
              <UFormGroup label="Playlist Name" name="name">
                <UInput placeholder="Enter Playlist Name" />
              </UFormGroup>
              <UFormGroup label="Description" name="description">
                <UTextarea placeholder="Enter Playlist Description" />
              </UFormGroup>
              <UFormGroup label="Cover Image" name="cover">
                <UInput type="file" accept=".jpg,.jpeg,.png" />
              </UFormGroup>
              <UFormGroup label="Status" name="status">
                <div class="grid grid-cols-2">
                  <URadioGroup
                    v-model="selected"
                    :options="status"
                    class="col-span-2"
                  />
                </div>
              </UFormGroup>

              <UButton
                label="Create Playlist"
                icon="ic:round-send"
                size="xl"
                type="submit"
                block
              />
            </UForm>
          </div>
        </USlideover>
      </div>
      <div class="px-2 flex flex-wrap gap-3">
        <PlaylistCard
          v-for="playlist in featuredPlaylists"
          :key="playlist.id"
          :name="playlist.name"
          :description="playlist.description"
          :image="playlist.images[0].url"
          :to="`/playlist/1/${playlist.id}`"
        />
      </div>
    </NuxtLayout>
  </div>
</template>
