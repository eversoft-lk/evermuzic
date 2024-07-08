<template>
    <div>
        <NuxtLayout name="home">
            <div class="flex justify-center items-center">
                <div class="w-full p-5 max-w-2xl">
                    <div class="col-span-2 lg:col-span-2">
                        <div class="flex justify-between">
                            <p class="text-white text-xl font-bold mb-4">My Playlist</p>
                        </div>

                        <div
                            class="flex p-1 hover:bg-slate-800 rounded-lg bg-[#05060e88] backdrop-blur-lg border border-slate-900 shadow-lg shadow-slate-950 mb-2 flex-row">
                            <div class="flex h-20 w-24 bg-slate-900 rounded-lg items-center justify-center">
                                <Icon name="ep:circle-plus" class="rounded-lg text-[60px]" />
                            </div>
                            <div class="flex justify-between w-full">
                                <div class="ml-2 flex flex-col justify-between">
                                    <p class="mb-1 text-lg text-white">Create a new Playlist</p>
                                </div>
                                <div class="flex items-center mr-5">
                                    <UButton label="Create" @click="isOpen = true" />
                                </div>
                            </div>
                        </div>

                        <hr class="h-px my-8 bg-slate-800 border-0">
                    </div>
                    <div v-for="item in items" :key="item.title"
                        class="flex justify-between p-1 hover:bg-slate-800 rounded-lg bg-[#05060e88] backdrop-blur-lg border border-slate-900 shadow-lg shadow-slate-950 mb-2 flex-row">
                        <div class="flex">
                            <img :src="item.imageUrl" alt="icon" class="h-20 w-20 rounded-lg">
                            <div class="ml-2">
                                <p class="mb-1 text-lg text-white">{{ item.title }}</p>
                                <p class="text-gray-300">{{ item.artist }}</p>
                            </div>
                        </div>
                        <div class="flex">
                            <p class="text-gray-300 mr-2">{{ item.duration }} songs</p>
                        </div>
                    </div>
                </div>
            </div>
        </NuxtLayout>

        <USlideover v-model="isOpen" prevent-close>
            <UCard class="flex flex-col flex-1"
                :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Create a new Playlist
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpen = false" />
                    </div>
                </template>

                <Placeholder class="h-full" />
                <div>
                    <img src="" alt="">
                    <div class="w-full mb-4">
                        <UInput class="mb-4" placeholder="Playlist Name" />
                        <UTextarea autoresize color="white" variant="outline" placeholder="Description" />
                    </div>
                    <div class="flex justify-center">
                        <UButton label="Create" />
                    </div>
                </div>
            </UCard>
        </USlideover>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const isOpen = ref(false);

const items = [
    {
        imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
        title: "Cruel",
        artist: "Jackson Wang",
        duration: "9"
    },
    {
        imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
        title: "Blinding Lights",
        artist: "The Weeknd",
        duration: "3"
    },
    {
        imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
        title: "Levitating",
        artist: "Dua Lipa",
        duration: "5"
    },
    {
        imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
        title: "Save Your Tears",
        artist: "The Weeknd",
        duration: "6"
    },
    {
        imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
        title: "Levitating",
        artist: "Dua Lipa",
        duration: "3"
    },
    {
        imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
        title: "Levitating",
        artist: "Dua Lipa",
        duration: "9"
    },
    {
        imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
        title: "Levitating",
        artist: "Dua Lipa",
        duration: "7"
    },
    {
        imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
        title: "Levitating",
        artist: "Dua Lipa",
        duration: "5"
    },
    {
        imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
        title: "Levitating",
        artist: "Dua Lipa",
        duration: "9"
    },
];
</script>

<style>
/* Add any custom styles here */
</style>
