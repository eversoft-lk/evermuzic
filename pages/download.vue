<template>
  <div
    class="flex justify-center items-center h-screen bg-gradient-to-br from-black to-[#0e1222]"
  >
    <div
      class="bg-slate-950/30 backdrop-blur-lg border border-slate-900 shadow sm:rounded-lg p-6 max-w-sm w-full"
    >
      <div class="flex items-center mb-4">
        <Icon
          name="solar:download-minimalistic-outline"
          class="text-violet-500 text-4xl mr-3"
        />
        <h2 class="text-xl font-semibold">Download Song</h2>
      </div>
      <div class="flex gap-3">
        <div class="">
          <img
            src="https://static.vecteezy.com/system/resources/previews/021/693/323/non_2x/a-logo-for-a-music-company-that-is-made-by-song-brand-vector.jpg"
            class="w-20 h-20 rounded-md"
          />
        </div>
        <div class="">
          <p class="text-white line-clamp-1">MAWILA</p>
          <p class="text-white line-clamp-1">DILU Beats</p>
          <p class="text-white text-sm line-clamp-1 pt-3">3.05</p>
        </div>
      </div>
      <p class="text-gray-500 mb-6 mt-2">
        Click the button below to download your song.
      </p>
      <UButton
        label="Download"
        class="flex items-center justify-center w-full"
      />
    </div>
  </div>
</template>
