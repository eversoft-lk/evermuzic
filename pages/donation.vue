<script setup>
useHead({
  title: "EverMuzic | Give Us Your Valuable Donation",
  meta: [
    {
      name: "description",
      content:
        "This service is offered free of charge to all users. However, we rely on the generosity of individuals like you to keep it running. Every donation, no matter how small, makes a significant difference and is deeply appreciated. Your support helps us continue providing valuable resources and services to everyone.",
    },
  ],
});
</script>

<template>
  <div>
    <NuxtLayout name="home">
      <div class="p-5">
        <div
          class="grid grid-cols-2 py-4 bg-[#05060e88] backdrop-blur-lg rounded-lg border border-slate-900 shadow-lg shadow-slate-950"
        >
          <div class="col-span-full lg:col-span-1 p-10 flex flex-col gap-5">
            <h1
              class="text-2xl font-bold uppercase tracking-wider leading-tight text-shadow"
            >
              EverMuzic | Give Us Your Valuable Donation
            </h1>
            <div class="flex justify-center items-center">
              <img src="/img/feedback-boy.png" class="w-4/5" />
            </div>
            <div>
              <p class="text-gray-400">
               <p class="font-bold">Welcome to our community,</p> 
                <br>
                 where we believe that access to
                valuable resources should be free for everyone. Our service
                thrives on the kindness and generosity of people like you. Each
                contribution, regardless of size, fuels our mission to provide
                high-quality support and resources. Imagine the impact of your
                gift—empowering countless individuals, fostering innovation, and
                spreading goodwill. By donating, you're not just supporting a
                service; you're investing in a brighter, more inclusive future.
                Thank you for being a beacon of hope and for making a difference
                in so many lives.
              </p>
            </div>
          </div>
          <div
            class="col-span-full lg:col-span-1 flex flex-col border-t lg:border-t-0 lg:border-l border-slate-900"
          >
            <div class="p-10">
              <div class="flex justify-center">
                <span
                  class="text-sm text-center font-bold uppercase tracking-wider leading-tight text-shadow"
                >
                  Fill The Form Below
                </span>
              </div>
              <form class="flex flex-col gap-5 mt-5">
                <UFormGroup label="Full Name">
                  <UInput placeholder="Enter Your Full Name" />
                </UFormGroup>

                <UFormGroup label="Email Address">
                  <UInput placeholder="Enter Your Email Address" />
                </UFormGroup>

                <UFormGroup label="Amount">
                  <UInput placeholder="Enter Amount" />
                </UFormGroup>

                <UButton
                  label="Donate Now"
                  icon="ic:round-send"
                  size="xl"
                  trailing
                  block
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
