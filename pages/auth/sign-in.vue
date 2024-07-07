<template>
  <div
    class="min-h-screen py-5 flex items-center justify-center bg-gradient-to-br from-black to-[#0e1222]"
  >
    <div
      class="w-full lg:max-w-[70%] bg-slate-950/30 backdrop-blur-lg border border-slate-900 shadow sm:rounded-lg grid grid-cols-2"
    >
      <div class="col-span-full lg:col-span-1 p-4 sm:p-8">
        <div class="flex flex-col items-center">
          <h1 class="text-2xl xl:text-3xl uppercase font-extrabold">
            Welcome Back
          </h1>
          <div class="w-full flex-1 mt-6">
            <div class="flex justify-center items-center">
              <div class="flex flex-col gap-3">
                <UButton
                  label="Sign In with Google"
                  color="black"
                  size="xl"
                  icon="logos:google-icon"
                />

                <UButton
                  label="Sign In with Facebook"
                  color="black"
                  size="xl"
                  icon="logos:facebook"
                />
              </div>
            </div>

            <div class="my-6 border-b text-center">
              <div
                class="leading-none px-2 inline-block text-sm text-white tracking-wide font-medium bg-slate-950 transform translate-y-1/2"
              >
                Or sign in with e-mail
              </div>
            </div>

            <div class="mx-auto max-w-xs flex flex-col gap-3">
              <UFormGroup label="Email Or Username">
                <UInput placeholder="Enter Your Email Or Username" />
              </UFormGroup>

              <UFormGroup label="Password">
                <UInput type="password" placeholder="Enter Your Password" />
              </UFormGroup>

              <UButton
                label="Sign In"
                color="indigo"
                size="xl"
                icon="material-symbols:login"
                block
              />

              <div class="flex mt-2 justify-center">
                <p class="mr-2">Don't Have An Account ?</p>
                <NuxtLink
                  to="/auth/sign-up"
                  class="text-blue-500 hover:underline"
                  >Sign up</NuxtLink
                >
              </div>
              <p class="mt-4 text-xs text-gray-400 text-center">
                I agree to abide by Evermuzic
                <NuxtLink
                  to="/terms-and-conditions"
                  class="border-b border-gray-500 border-dotted"
                >
                  Terms of Service
                </NuxtLink>
                and its
                <NuxtLink
                  to="/terms-and-conditions"
                  class="border-b border-gray-500 border-dotted"
                >
                  Privacy Policy
                </NuxtLink>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-span-full lg:col-span-1 bg-gray-700 text-center lg:rounded-r-lg hidden lg:flex"
      >
        <div
          class="relative w-full bg-cover bg-center bg-no-repeat bg-[url(/img/sign-in.jpg)] rounded-r-lg overflow-hidden"
        >
          <div class="absolute w-full h-full bg-black/50"></div>
        </div>
      </div>
    </div>
  </div>
</template>
