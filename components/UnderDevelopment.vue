<script setup lang="ts">
const isOpen = ref(false);
const script: Array<{ src: string; [key: string]: any }>  = [
  // {
  //   src: "/js/monetag/1-in-page-push.js",
  //   "data-cfasync": false,
  //   type: "text/javascript",
  // },
  // {
  //   src: "/js/monetag/2-in-page-push.js",
  // },
  {
    src: "/js/monetag/3-vignette.js",
    "data-cfasync": false,
    type: "text/javascript",
  },
  {
    src: "/js/monetag/4-vignette.js",
  },
  {
    async: true,
    "data-cfasync": false,
    src: "//thubanoa.com/1?z=7776412",
  },
  // {
  //   src: "/js/monetag/5-in-page-push-normal.js",
  // },
];

onMounted(() => {
  const agree = localStorage.getItem("agree-to-ads");
  if (agree) {
    isOpen.value = false;
    showAdd();
  } else {
    isOpen.value = true;
  }
});

function close() {
  isOpen.value = false;
  localStorage.setItem("agree-to-ads", "true");
  showAdd();
}

function showAdd() {
  script.forEach(({ src, ...attrs }) => {
    const scriptElement = document.createElement('script');
    scriptElement.src = src;
    (Object.keys(attrs) as Array<keyof typeof attrs>).forEach(attr => {
      scriptElement.setAttribute(attr, (attrs[attr] as string | number));
    });
    document.head.appendChild(scriptElement);
  });
}
</script>

<template>
  <UModal
    v-model="isOpen"
    :ui="{
      width: 'sm:max-w-lg md:max-w-xl lg:max-w-2xl',
    }"
    prevent-close
  >
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold uppercase leading-6 text-white">
            Welcome to EverMuzic!
          </h3>
        </div>
      </template>

      <div class="w-full grid grid-cols-2">
        <div class="col-span-2 lg:col-span-1 flex justify-center items-center">
          <img src="/img/maintainer.png" class="w-full max-w-[250px]" />
        </div>
        <div class="col-span-2 lg:col-span-1">
          <p class="text-sm text-gray-400">
            While you browse our site, you may see background ads, but rest
            assured, they won't interrupt your music once it starts playing.
            These ads help us cover server costs to provide you with
            uninterrupted music.
          </p>

          <UDivider class="my-4" />

          <p class="text-sm text-gray-400">
            If you find our service valuable, consider making a donation. As a
            token of our gratitude, we'll give you a month of background ad-free
            browsing experience!
          </p>
          <div>
            <div class="flex justify-end">
              <UButton
                class="mt-2"
                label="Continue with In-page ads"
                icon="ic:round-send"
                trailing
                @click="close"
              />
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </UModal>
</template>
