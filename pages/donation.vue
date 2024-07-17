<script setup lang="ts">
import { SendDonation, type SendDonationType } from "~/schema";
import type { FormSubmitEvent } from "#ui/types";

type DonationResponse = {
  response: {
    links: {
      href: string;
    }[];
  };
};

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

const app = useRuntimeConfig();
const isLoading = ref(false);
const form = reactive({
  name: "",
  email: "",
  amount: "",
});

async function donate(event: FormSubmitEvent<SendDonationType>) {
  isLoading.value = true;
  const { data } = await useFetch<DonationResponse>(
    app.public.evermuzicApi + "/donate",
    {
      method: "POST",
      body: event.data,
    }
  );

  if (!data.value) {
    return;
  }

  isLoading.value = false;
  window.open(data.value.response.links[1].href, "_blank");
}
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
              Give Us Your Valuable Donation
            </h1>
            <div class="flex justify-center items-center">
              <img src="/img/donation.png" class="w-4/5 max-w-[230px]" />
            </div>
            <div>
              <p class="text-gray-400">
                Support EverMuzic! Enjoy ad-free music and help us keep the
                tunes flowing without interruptions. Donate now to enhance your
                listening experience.
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
              <UForm
                :schema="SendDonation"
                :state="form"
                class="flex flex-col gap-5 mt-5"
                @submit="donate"
              >
                <UFormGroup label="Full Name" name="name">
                  <UInput
                    placeholder="Enter Your Full Name"
                    v-model="form.name"
                  />
                </UFormGroup>

                <UFormGroup label="Email Address" name="email">
                  <UInput
                    placeholder="Enter Your Email Address"
                    v-model="form.email"
                  />
                </UFormGroup>

                <UFormGroup label="Amount" name="amount">
                  <UInput
                    icon="flowbite:dollar-outline"
                    placeholder="Enter Amount"
                    v-model="form.amount"
                    type="number"
                  />
                </UFormGroup>

                <UButton
                  label="Donate Now"
                  icon="ic:round-send"
                  size="xl"
                  type="submit"
                  :loading="isLoading"
                  trailing
                  block
                />
              </UForm>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
