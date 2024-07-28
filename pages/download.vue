<script setup lang="ts">
type SongInfoType = {
  title: string;
  channel: string;
  duration: number;
  thumbnail: string;
};

type DownloadResponse = {
  url: string;
};

const URL = "https://download.evermuzic.me/api";
const counter = ref(10);
const toast = useToast();
const route = useRoute();
const isLoading = ref(false);

// Fetch the song information
const { data: info, status } = useFetch<SongInfoType>(
  `${URL}/info?videoId=${route.query?.videoId}`
);

watch(info, (value) => {
  const interval = setInterval(() => {
    counter.value--;
    // counter.value -= 10;
    if (counter.value === 0) {
      clearInterval(interval);
    }
  }, 1000);
});

async function download() {
  if (counter.value > 0) {
    return;
  }

  isLoading.value = true;

  const url = `${URL}/download?videoId=${route.query?.videoId}`;
  toast.add({
    title: "NOTE",
    description:
      "Your request is being processed, this may take some seconds due to our servers.",
    timeout: 5000,
    icon: "solar:info-circle-bold",
    color: "gray",
  });
  const { data } = await useFetch<DownloadResponse>(url);
  if (!data.value) {
    isLoading.value = false;
    toast.clear();
    toast.add({
      title: "ERROR",
      description:
        "It seems that the server is down, please try again later. If the problem persists, report us.",
      timeout: 3000,
      icon: "solar:close-circle-bold",
      color: "red",
      actions: [
        {
          label: "Report",
          icon: "solar:flag-2-bold",
          color: "black",
        },
      ],
    });
    return;
  }

  const fileUrl = data.value.url;
  const title = info.value?.title
    .replace(/[^a-zA-Z0-9]/g, "-") // Replace non-alphanumeric characters with hyphens
    .toLowerCase() // Convert to lowercase
    .substring(0, 50) // Truncate the title to the maximum length
    .replace(/-+/g, "-"); // remove extra hyphens

  const fileName = `${title}.m4a`;

  fetch(fileUrl)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.classList.add("hidden");
      link.href = url;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

      isLoading.value = false;
      toast.clear();
      toast.add({
        title: "Congratulations",
        description:
          "Download started successfully, please check your download folder.",
        timeout: 3000,
        icon: "icon-park-solid:correct",
        color: "green",
      });
    })
    .catch((error) => {
      isLoading.value = false;
      toast.clear();

      toast.add({
        title: "ERROR",
        description:
          "An error occurred while downloading the file. This may be due to network issues.",
        timeout: 3000,
        icon: "solar:close-circle-bold",
        color: "red",
      });
      console.error("Error downloading the file:", error);
    });
}

function playNow() {
  const id = route.query?.videoId;
  if (!id) {
    return;
  }

  usePlayer().playNow({
    id: id as string,
    name: info.value?.title as string,
    artist: info.value?.channel as string,
    thumbnail: info.value?.thumbnail as string,
  });
}
</script>

<template>
  <div
    class="relative flex justify-center items-center h-screen bg-gradient-to-br from-black to-[#0e1222]"
  >
    <div class="absolute top-0 left-0 p-5">
      <NuxtLink
        @click="$router.back"
        class="flex gap-3 items-center cursor-pointer"
      >
        <Icon
          name="fluent:arrow-left-24-filled"
          class="text-3xl text-gray-400"
        />
        <span> Go back </span>
      </NuxtLink>
    </div>

    <div
      class="bg-slate-950/30 backdrop-blur-lg border border-slate-900 shadow sm:rounded-lg p-6 max-w-xl w-full"
    >
      <div class="flex items-center mb-4">
        <h1 class="text-2xl font-semibold uppercase font-kanit">
          EverMuzic Downloader
        </h1>
      </div>
      <template v-if="status === 'pending'">
        <div class="flex gap-3">
          <USkeleton class="w-20 h-20" />
          <div class="flex flex-col gap-2">
            <USkeleton class="w-[100px] h-3" />
            <USkeleton class="w-10 h-2" />

            <USkeleton class="w-5 h-2 mt-3" />
          </div>
        </div>
        <USkeleton class="w-1/2 h-3 my-4" />
      </template>
      <template v-else-if="status === 'success'">
        <div class="flex gap-3">
          <div class="">
            <img
              :src="info?.thumbnail"
              class="w-20 h-20 object-cover rounded-md"
            />
          </div>
          <div class="flex flex-col">
            <h2 class="text-white font-bold">
              {{ wordLimit(info?.title as string, 5) }}
            </h2>
            <p class="text-gray-400 text-xs">{{ info?.channel }}</p>
            <p class="text-gray-400 text-xs mt-3">
              {{ msToMin((info?.duration || 0) * 1000) }}
            </p>
          </div>
        </div>
        <p class="text-gray-500 mb-6 mt-2 italic">
          Click the button below to download your song.
        </p>
      </template>
      <template v-else>
        <div class="p-3 bg-red-500/30 mb-6 rounded-lg border-red-700">
          <p class="text-red-700 uppercase font-bold">
            Something went wrong, please try again later.
          </p>
        </div>
      </template>
      <div class="flex gap-3">
        <UButton icon="solar:play-bold" color="gray" @click="playNow" />
        <div class="flex-1">
          <UButton
            :label="
              counter > 0 ? `You can download in (${counter})` : 'Download'
            "
            class="flex items-center justify-center w-full"
            icon="ic:round-cloud-download"
            color="black"
            :disabled="counter > 0"
            :loading="isLoading"
            @click="download"
          />
        </div>
      </div>
    </div>
  </div>
</template>
