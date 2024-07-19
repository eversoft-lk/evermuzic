<script setup lang="ts">
type SongType = "spotify" | "youtube";

const YT = usePlayer();
const props = defineProps({
  type: String as PropType<SongType>,
  id: String,
  name: String,
  image: String,
  artist: String,
  duration: String as PropType<number | string>,
});

const dropdownItems = [
  [
    {
      label: "Play",
      icon: "solar:play-bold-duotone",
      click: () => {
        getSong();
      },
    },
    {
      label: "Add to queue",
      icon: "material-symbols:add-to-queue",
      click: async () => {
        const id = await getSong();
        YT.addToQueue(id as string);
      },
    },
  ],
  [
    {
      label: "Save to playlist",
      icon: "ic:twotone-playlist-add",
    },
  ],
  [
    {
      label: "Info",
      icon: "mdi:information",
    },
  ],
];

async function playNow() {
  const id = await getSong();
  if (!id) {
    return;
  }

  YT.playNow(id);
}

async function getSong() {
  let id = props.id;
  if (props.type === "spotify") {
    id = await YT.getYTID(props.name as string);
  }

  return id;
}
</script>

<template>
  <div
    class="flex justify-between p-2 hover:bg-black/30 rounded-lg cursor-pointer"
    @click="playNow"
  >
    <div class="flex">
      <img :src="image" alt="icon" class="h-20 w-20 rounded-lg" />
      <div class="ml-2">
        <p class="text-white">{{ wordLimit(name as string, 5) }}</p>
        <p class="text-sm text-gray-400">{{ artist }}</p>
      </div>
    </div>
    <div class="flex flex-col justify-between items-center">
      <p class="text-gray-300 text-sm mr-2" v-if="type === 'spotify'">
        {{ msToMin(duration as number) }}
      </p>
      <p class="text-gray-300 text-sm mr-2" v-else>
        {{ duration }}
      </p>
      <div class="pb-3 flex" @click.stop>
        <UDropdown :items="dropdownItems" :popper="{ arrow: true }">
          <Icon name="bi:three-dots-vertical" class="text-xl cursor-pointer" />
        </UDropdown>
      </div>
    </div>
  </div>
</template>
