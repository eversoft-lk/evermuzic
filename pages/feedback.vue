<script setup lang="ts">
import { FeedbackRequest } from '~/schema';
import type { FeedbackRequestType } from "~/schema";
import type { FormSubmitEvent } from "#ui/types";

type FeedbackResponse = {
  name: string;
  email: string;
  feedback: string;
}

useHead({
  title: "EverMuzic | Give Us Your Feedback",
  meta: [
    {
      name: "description",
      content:
        "Your experience with EverMuzic matters to us! Let us know what you think about our ad-free music streaming platform. Share your thoughts, suggestions, and any issues you've encountered. Your feedback helps us create the best music experience for you.",
    },
  ],
});

const toast = useToast();
const app = useRuntimeConfig();
const form = ref({
  name: "",
  email: "",
  feedback: "",
});


async function feedBack(event: FormSubmitEvent<FeedbackRequestType>) {
  const { data } = await useFetch<FeedbackResponse>(
    app.public.evermuzicApi + "/feedback",
    {
      method: "POST",
      body: event.data,
      headers: {
        "Content-type": "application/json",
      },
    },
  );

  if (!data.value) {
    toast.add({
      id: "invalid_credentials",
      title: "Invalid Credentials",
      description:
        "Please try again.",
      icon: "solar:close-circle-bold",
      timeout: 3000,
      color: "red",
    });
    return;
  }
}
</script>

<template>
  <div>
    <NuxtLayout name="home">
      <div class="p-5">
        <div
          class="grid grid-cols-2 py-4 bg-[#05060e88] backdrop-blur-lg rounded-lg border border-slate-900 shadow-lg shadow-slate-950">
          <div class="col-span-full lg:col-span-1 p-10 flex flex-col gap-5">
            <h1 class="text-2xl font-bold uppercase tracking-wider leading-tight text-shadow">
              We Value Your Feedback
            </h1>
            <div class="flex justify-center items-center">
              <img src="/img/feedback-boy.png" class="w-4/5 max-w-[320px]" />
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
                <span class="text-sm text-center font-bold uppercase tracking-wider leading-tight text-shadow">
                  Fill The Form Below
                </span>
              </div>
              <UForm :schema="FeedbackRequest" :state="form" class="flex flex-col gap-5 mt-5" @submit="feedBack">
                <UFormGroup label="Full Name">
                  <UInput placeholder="Enter Your Full Name" v-model="form.name" />
                </UFormGroup>

                <UFormGroup label="Email Address">
                  <UInput placeholder="Enter Your Email Address" v-model="form.email" />
                </UFormGroup>

                <UFormGroup label="Feedback">
                  <UTextarea :rows="10" placeholder="Enter Your Feedback" v-model="form.feedback" />
                </UFormGroup>

                <UButton type="submit" label="Submit Feedback" icon="ic:round-send" size="xl" trailing block />
              </UForm>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
