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
              We Value Your Feedback
            </h1>
            <div class="flex justify-center items-center">
              <img src="/img/feedback-boy.png" class="w-4/5" />
            </div>
            <div>
              <p class="text-gray-400">
                Your experience with EverMuzic matters to us! Let us know what
                you think about our ad-free music streaming platform. Share your
                thoughts, suggestions, and any issues you've encountered. Your
                feedback helps us create the best music experience for you.
              </p>
            </div>
          </div>
          <div class="col-span-full lg:col-span-1 flex flex-col border-t lg:border-t-0 lg:border-l border-slate-900">
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

                <UFormGroup label="Feedback">
                  <UTextarea :rows="10" placeholder="Enter Your Feedback" />
                </UFormGroup>

                <UButton
                  label="Submit Feedback"
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
