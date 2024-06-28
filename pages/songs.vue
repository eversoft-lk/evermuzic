<template>
    <div>
        <NuxtLayout name="home">
            <div class="p-5">
                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
                    <!-- Container for the top three items -->
                    <div class="sm:col-span-2 lg:col-span-4 space-y-4">
                        <p class="text-white text-xl font-bold">Main</p>
                        <div
                            class="w-full h-52 p-4 justify-between bg-green-700 backdrop-blur-lg rounded-lg border border-slate-900 shadow-lg shadow-slate-950 flex space-x-4">
                            <div class="-mt-2">
                                <p class="text-white text-lg font-semibold">Billie Eilish</p>
                                <p class="text-gray-300 text-2xl line-clamp-1">What was I made for?</p>
                                <UButton label="Listen Now" color="indigo" size="md"
                                    icon="material-symbols:play-arrow-rounded" class="rounded-full mt-20" />
                            </div>
                            <div class="-mt-16">
                                <img src="/public/img/evermuzic_boy.png" alt="Billie Eilish"
                                    class="w-full h-60 rounded-full object-cover">
                            </div>
                        </div>
                        <div class="flex justify-between pt-5">
                            <p class="text-white text-xl font-bold">Playlist for you</p>
                            <NuxtLink to="/recently-played" class="text-blue-600 hover:text-blue-500">View All
                            </NuxtLink>
                        </div>
                        <div
                            class="w-full bg-[#05060e88] backdrop-blur-lg rounded-lg border border-slate-900 shadow-lg shadow-slate-950">
                            <div class="overflow-x-auto whitespace-nowrap py-1 px-1">
                                <div v-for="item in playlist" :key="item.title"
                                    class="inline-block h-52 w-52 rounded-lg p-4 mr-1 bg-cover bg-center"
                                    :style="{ backgroundImage: 'url(' + item.imageUrl + ')' }">
                                    <div
                                        class="flex flex-col justify-between h-full bg-black bg-opacity-50 p-2 rounded-lg">
                                        <p class="text-xl text-white">{{ item.title }}</p>
                                        <p class="text-md text-gray-300 text-right">{{ item.tracks }} tracks</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-between pt-5">
                            <p class="text-white text-xl font-bold">You may also like</p>
                            <NuxtLink to="/recently-played" class="text-blue-600 hover:text-blue-500">View All
                            </NuxtLink>
                        </div>
                        <div
                            class="w-full bg-[#05060e88] backdrop-blur-lg rounded-lg border border-slate-900 shadow-lg shadow-slate-950">
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                                <div v-for="item in alsolike" :key="item.title"
                                    class="flex justify-between p-1 hover:bg-slate-800 rounded-lg">
                                    <div class="flex">
                                        <img :src="item.imageUrl" alt="icon" class="h-20 w-20 rounded-lg">
                                        <div class="ml-2">
                                            <p class="mb-1 text-lg text-white">{{ item.title }}</p>
                                            <p class="text-gray-300">{{ item.artist }}</p>
                                        </div>
                                    </div>
                                    <div class="flex">
                                        <p class="text-gray-300 mr-2">{{ item.duration }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Container for the right-side item -->
                    <div class="sm:col-span-2 lg:col-span-2">
                        <div class="flex justify-between xl:-mt-5 lg:-pt-5 sm:pt-5">
                            <p class="text-white text-xl font-bold mb-4">Now Playing</p>
                            <NuxtLink to="/recently-played" class="text-blue-600 hover:text-blue-500">View All
                            </NuxtLink>
                        </div>
                        <div
                            class="bg-[#05060e88] backdrop-blur-lg rounded-lg border border-slate-900 shadow-lg shadow-slate-950 mb-2 flex-row">
                            <div v-for="item in items" :key="item.title">
                                <div class="flex justify-between p-1 hover:bg-slate-800 rounded-lg">
                                    <div class="flex">
                                        <img :src="item.imageUrl" alt="icon" class="h-20 w-20 rounded-lg"
                                            :style="{ backgroundImage: `url(${item.imageUrl})` }">
                                        <div class="ml-2">
                                            <p class="mb-1 text-lg text-white">{{ item.title }}</p>
                                            <p class="text-gray-300">{{ item.artist }}</p>
                                        </div>
                                    </div>
                                    <div class="flex">
                                        <p class="text-gray-300 mr-2">{{ item.duration }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                    duration: "03:29"
                },
                {
                    imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
                    title: "Blinding Lights",
                    artist: "The Weeknd",
                    duration: "03:20"
                },
                {
                    imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
                    title: "Levitating",
                    artist: "Dua Lipa",
                    duration: "03:23"
                },
                {
                    imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
                    title: "Save Your Tears",
                    artist: "The Weeknd",
                    duration: "03:35"
                },
                {
                    imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
                    title: "Levitating",
                    artist: "Dua Lipa",
                    duration: "03:23"
                },
                {
                    imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
                    title: "Levitating",
                    artist: "Dua Lipa",
                    duration: "03:23"
                },
                {
                    imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
                    title: "Levitating",
                    artist: "Dua Lipa",
                    duration: "03:23"
                },
                {
                    imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
                    title: "Levitating",
                    artist: "Dua Lipa",
                    duration: "03:23"
                },
                {
                    imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
                    title: "Levitating",
                    artist: "Dua Lipa",
                    duration: "03:23"
                },
            ],

            playlist: [
                {
                    imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
                    title: "Dejavu",
                    tracks: 30
                },
                {
                    imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
                    title: "Summer Hits",
                    tracks: 25
                },
                {
                    imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
                    title: "Summer Hits",
                    tracks: 25
                },
                {
                    imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
                    title: "Summer Hits",
                    tracks: 25
                },
                {
                    imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
                    title: "Summer Hits",
                    tracks: 25
                },
                {
                    imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
                    title: "Summer Hits",
                    tracks: 25
                },

            ],

            alsolike: [
                {
                    imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
                    title: "Save Your Tears",
                    artist: "The Weeknd",
                    duration: "03:35"
                }, {
                    imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
                    title: "Save Your Tears",
                    artist: "The Weeknd",
                    duration: "03:35"
                }, {
                    imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
                    title: "Save Your Tears",
                    artist: "The Weeknd",
                    duration: "03:35"
                },
                {
                    imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
                    title: "Save Your Tears",
                    artist: "The Weeknd",
                    duration: "03:35"
                },
                {
                    imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
                    title: "Save Your Tears",
                    artist: "The Weeknd",
                    duration: "03:35"
                },
                {
                    imageUrl: "https://t3.ftcdn.net/jpg/04/54/66/12/360_F_454661277_NtQYM8oJq2wOzY1X9Y81FlFa06DVipVD.jpg",
                    title: "Save Your Tears",
                    artist: "The Weeknd",
                    duration: "03:35"
                },
            ]
        };
    }
};
</script>