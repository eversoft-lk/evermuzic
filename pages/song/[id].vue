<template>
    <div class="h-screen w-full bg-cover bg-center bg-no-repeat flex py-4 backdrop-blur-lg rounded-lg border border-slate-900 shadow-lg shadow-slate-950"
        style="background-image: url('/public/img/not-found-gradient-bg.png');">
        <div class="flex-1 flex justify-center items-center">
            <img src="/img/feedback-boy.png" class="w-4/5 max-w-lg bg-black rounded-xl" />
        </div>

        <div class="flex-1 flex flex-col justify-center items-center p-6">
            <div class="w-full p-4 rounded-xl text-center bg-amber-400 bg-opacity-80">
                <p class="text-lg md:text-2xl lg:text-4xl xl:text-6xl font-bold uppercase">Faded</p>
                <p class="text-sm md:text-md lg:text-lg xl:text-xl">Eminem</p>
            </div>
            <div class="flex justify-around items-center mt-6 w-full">
                <div class="hidden sm:block">
                    <Icon name="iconamoon:playlist-shuffle-bold" class="text-3xl" />
                </div>

                <Icon name="tabler:player-track-prev-filled" class="text-3xl" />

                <div
                    class="w-12 h-12 rounded-full flex justify-center items-center bg-gray-100 text-gray-900 cursor-pointer text-3xl">
                    <Icon name="solar:play-bold" />
                    <Icon name="solar:pause-bold" />
                </div>

                <Icon name="tabler:player-track-next-filled" class="text-3xl" />

                <div class="hidden sm:block">
                    <Icon name="iconamoon:playlist-repeat-list-bold" class="text-3xl" />
                </div>
            </div>
        </div>
    </div>
</template>
