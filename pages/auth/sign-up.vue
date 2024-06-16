<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-[#0e1222]"
  >
    <div
      class="w-full lg:max-w-[80%] bg-slate-950/30 backdrop-blur-lg border border-slate-900 shadow sm:rounded-lg grid grid-cols-2"
    >
      <div
        class="col-span-full lg:col-span-1 bg-gray-700 text-center lg:rounded-r-lg hidden lg:flex"
      >
        <div
          class="relative w-full bg-cover bg-center bg-no-repeat bg-[url(/img/sign-up.jpg)] rounded-r-lg overflow-hidden"
        >
          <div class="absolute w-full h-full bg-black/50"></div>
        </div>
      </div>
      <div class="col-span-full lg:col-span-1 p-4 sm:p-8">
        <div class="flex flex-col items-center">
          <h1 class="text-2xl xl:text-3xl uppercase font-extrabold">
            Get Started Today
          </h1>
          <div class="w-full flex-1 mt-6">
            <div class="flex justify-center items-center">
              <div class="flex gap-3">
                <UButton
                  label="Sign Up with Google"
                  color="black"
                  size="xl"
                  icon="logos:google-icon"
                />

                <UButton
                  label="Sign Up with Facebook"
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
                Or sign up with e-mail
              </div>
            </div>

            <div class="mx-auto flex flex-col gap-3">
              <div class="grid grid-cols-2 gap-2">
                <UFormGroup label="Name">
                  <UInput placeholder="Enter Your Name" />
                </UFormGroup>

                <UFormGroup label="Username">
                  <UInput placeholder="Enter Your Username" />
                </UFormGroup>
              </div>

              <UFormGroup label="Email Address">
                <UInput type="email" placeholder="Enter Your Email" />
              </UFormGroup>

              <UFormGroup label="Password">
                <UInput type="password" placeholder="Enter Your Password" />
              </UFormGroup>

              <UButton
                label="Sign Up"
                color="indigo"
                size="xl"
                icon="ic:baseline-person-add-alt-1"
                block
              />

              <div class="flex mt-2 justify-center">
                <p class="mr-2">Already Have An Account ?</p>
                <NuxtLink
                  to="/auth/sign-in"
                  class="text-blue-500 hover:underline"
                  >Sign In</NuxtLink
                >
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
    </div>
  </div>
</template>
