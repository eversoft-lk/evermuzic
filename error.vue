<script setup lang="ts">
const currentRoute = ref<string | null>(null);
onMounted(() => {
  currentRoute.value = window.location.pathname;
});
</script>

<template>
  <main
    class="w-full min-h-screen flex justify-center items-center bg-black bg-cover bg-bottom bg-[url(/img/not-found-gradient-bg.png)]"
  >
    <div class="flex flex-col items-center gap-5 w-full md:w-4/5 lg:w-1/2">
      <span class="text-gray-400 text-lg">
        <strong>{{ currentRoute }}</strong> page is not found.
      </span>
      <div class="max-w-[200px]">
        <img src="/public/img/officer.png" />
      </div>
      <h2 class="font-kanit text-2xl lg:text-3xl uppercase text-center">
        Boss, It's look like you are on the wrong way.
      </h2>
      <UButton label="Go Back To Home" color="black" size="xl" to="/" />
    </div>
  </main>
</template>
