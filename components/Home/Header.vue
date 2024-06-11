<template>
  <div class="w-full grid grid-cols-3">
    <div class="flex items-center gap-3">
      <NuxtLink to="/songs" class="font-bold">Music</NuxtLink>
      <NuxtLink to="/karaoke" class="font-bold">Karaoke</NuxtLink>
      <NuxtLink to="/random" class="font-bold">Random</NuxtLink>
    </div>
    <div class="flex justify-center px-5">
      <UInput
        placeholder="Type here to search"
        color="gray"
        size="lg"
        class="w-full"
      />
    </div>
    <div class="flex items-center justify-end gap-4">
      <Icon name="material-symbols:notifications" class="cursor-pointer" />
      <Icon
        name="material-symbols:settings-suggest-rounded"
        class="cursor-pointer"
      />
      <UButton label="Get Started" color="black" size="lg" />
    </div>
  </div>
</template>
