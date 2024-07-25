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
type GetDonationResponseType = {
  donations: {
    id: number;
    name: string;
    amount: string;
    createdAt: string;
  }[];
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
const donors = ref<GetDonationResponseType["donations"]>([]);
const form = reactive({
  name: "",
  email: "",
  amount: "",
});
const columns = [
  {
    label: "#",
    key: "id",
  },
  {
    label: "NAME",
    key: "name",
  },
  {
    label: "AMOUNT",
    key: "amount",
  },
  {
    label: "DONATED AT",
    key: "createdAt",
  },
];

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

const { data } = await useFetch<GetDonationResponseType>(
  `${app.public.evermuzicApi}/donate`
);

if (data.value) {
  donors.value = data.value.donations.map((donation, index) => ({
    ...donation,
    id: index + 1,
    createdAt: new Date(donation.createdAt).toLocaleString(),
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(parseInt(donation.amount)),
  }));
}
</script>

<template>
  <div>
    <NuxtLayout name="home">
      <div class="p-5">
        <div
          class="grid grid-cols-2 bg-[#05060e88] backdrop-blur-lg rounded-lg border border-slate-900 shadow-lg shadow-slate-950"
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
                <strong>
                  You can get one month of in-page ad-free experience for any
                  amount of donation.</strong
                >
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
                    icon="material-symbols:person"
                  />
                </UFormGroup>

                <UFormGroup label="Email Address" name="email">
                  <UInput
                    placeholder="Enter Your Email Address"
                    v-model="form.email"
                    icon="material-symbols:mail"
                  />
                </UFormGroup>

                <UFormGroup label="Amount" name="amount">
                  <UInput
                    placeholder="Enter Amount"
                    v-model="form.amount"
                    type="number"
                    icon="material-symbols:attach-money"
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
          <div class="col-span-2 p-10 bg-black/40 rounded-b-lg">
            <p class="text-gray-400">
              This service is offered free of charge to all users. However, we
              rely on the generosity of individuals like you to keep it running.
              Every donation, no matter how small, makes a significant
              difference and is deeply appreciated. Your support helps us
              continue providing valuable resources and services to everyone.
              <strong>here are some of our major donors:</strong>
            </p>
            <UTable :columns="columns" :rows="donors" class="my-5" />
          </div>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
