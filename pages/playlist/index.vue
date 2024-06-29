<template>
    <div>
        <NuxtLayout name="home">
            <div class="p-5">
                <div class="col-span-2 lg:col-span-2">
                    <div class="flex justify-between">
                        <p class="text-white text-xl font-bold mb-4">Now Playing</p>
                        <NuxtLink to="/recently-played" class="text-blue-600 hover:text-blue-500">View All
                        </NuxtLink>
                    </div>

                    <div
                        class="flex justify-between p-1 hover:bg-slate-800 rounded-lg bg-[#05060e88] backdrop-blur-lg border border-slate-900 shadow-lg shadow-slate-950 mb-2 flex-row">
                        <div class="flex">
                            <div class="flex h-20 w-20 bg-slate-900 rounded-lg items-center justify-center">
                                <Icon name="ep:circle-plus" class="rounded-lg text-[60px]" />
                            </div>
                            <div class="ml-2">
                                <p class="mb-1 text-lg text-white">Create a new Playlist</p>
                                <p class="text-gray-300">song</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex">
                        <p class="text-gray-300 mr-2">songs</p>
                    </div>
                </div>
                <div v-for="item in items" :key="item.title"
                    class="flex justify-between p-1 hover:bg-slate-800 rounded-lg bg-[#05060e88] backdrop-blur-lg border border-slate-900 shadow-lg shadow-slate-950 mb-2 flex-row">
                    <div class="flex">
                        <img :src="item.imageUrl" alt="icon" class="h-20 w-20 rounded-lg"
                            :style="{ backgroundImage: `url(${item.imageUrl})` }">
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
        </NuxtLayout>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
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
            ],
        };
    }
};
</script>