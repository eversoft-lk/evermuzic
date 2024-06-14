<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-900">
        <div
            class="max-w-screen-xl mx-auto bg-gray-800 shadow sm:rounded-lg flex flex-col lg:flex-row justify-center flex-1 my-10">
            <div class="lg:w-1/2 xl:w-5/12 p-4 sm:p-8">
                <!-- <div>
            <img src="" class="w-32 mx-auto" />
          </div> -->
                <div class="mt-8 flex flex-col items-center">
                    <h1 class="text-2xl xl:text-3xl font-extrabold text-white">
                        Sign in for Evermuzic
                    </h1>
                    <div class="w-full flex-1 mt-6">
                        <div class="flex flex-col items-center">
                            <button
                                class="w-full max-w-xs font-bold shadow-sm rounded-lg py-2 bg-gray-700 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                <div class="bg-white p-2 rounded-full">
                                    <svg class="w-4" viewBox="0 0 533.5 544.3">
                                        <path
                                            d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                            fill="#4285f4" />
                                        <path
                                            d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                            fill="#34a853" />
                                        <path
                                            d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                            fill="#fbbc04" />
                                        <path
                                            d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                            fill="#ea4335" />
                                    </svg>
                                </div>
                                <span class="ml-4">
                                    Sign In with Google
                                </span>
                            </button>

                            <button
                                class="w-full max-w-xs font-bold shadow-sm rounded-lg py-2 bg-gray-700 text-white flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-3">
                                <div class="bg-white p-1 rounded-full">
                                    <svg class="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                                        id="facebook">
                                        <path fill="#1976D2" fill-rule="evenodd"
                                            d="M12 5.5H9v-2a1 1 0 0 1 1-1h1V0H9a3 3 0 0 0-3 3v2.5H4V8h2v8h3V8h2l1-2.5z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <span class="ml-4">
                                    Sign In with Facebook
                                </span>
                            </button>
                        </div>

                        <div class="my-8 border-b text-center">
                            <div
                                class="leading-none px-2 inline-block text-sm text-white tracking-wide font-medium bg-gray-800 transform translate-y-1/2">
                                Or sign in with e-mail
                            </div>
                        </div>

                        <div class="mx-auto max-w-xs">
                            <UInput class="mb-3" color="sky" type="email" size="xl" placeholder="Email" />
                            <UInput color="sky" type="password" size="xl" placeholder="Password" />
                            <button
                                class="mt-4 tracking-wide font-semibold bg-indigo-500 text-white w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                    <circle cx="8.5" cy="7" r="4" />
                                </svg>
                                <span class="ml-3">
                                    Sign In
                                </span>
                            </button>
                            <div class="flex mt-2 justify-center">
                                <p class="mr-2 text-white">you haven't account?</p>
                                <nuxt-link to="/auth/sign-up" class="text-blue-500 hover:underline">SignUp
                                    here</nuxt-link>
                            </div>
                            <p class="mt-4 text-xs text-gray-400 text-center">
                                I agree to abide by Evermuzic
                                <a href="#" class="border-b border-gray-500 border-dotted">
                                    Terms of Service
                                </a>
                                and its
                                <a href="#" class="border-b border-gray-500 border-dotted">
                                    Privacy Policy
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-1 bg-gray-700 text-center lg:rounded-r-lg hidden lg:flex">
                <div class="m-8 xl:m-12 w-full bg-contain bg-center bg-no-repeat"
                    style="background-image: url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg');">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');

body {
    font-family: "Inter", sans-serif;
}
</style>
