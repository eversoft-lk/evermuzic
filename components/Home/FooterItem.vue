<script setup>
defineProps({
  name: String,
  link: String,
});
</script>

<template>
  <NuxtLink
    :to="link"
    class="text-gray-500 hover:text-gray-400 duration-300 cursor-pointer"
  >
    {{ name }}
  </NuxtLink>
</template>
