<script setup lang="ts">
import { NotifyMeRequest } from "~/schema";
import type { NotifyMeRequestType } from "~/schema";
import type { FormSubmitEvent } from "#ui/types";

const app = useRuntimeConfig();
const isOpen = ref(false);
const toast = useToast();
const form = ref({
  name: "",
  email: "",
});
onMounted(() => {
  if (localStorage.getItem("notify_me")) {
    return;
  }
  setTimeout(() => {
    isOpen.value = true;
  }, 2000);
});

async function getNotify(event: FormSubmitEvent<NotifyMeRequestType>) {
  const { data } = await useFetch(app.public.evermuzicApi + "/notify-me", {
    method: "POST",
    body: event.data,
  });

  if (data.value) {
    toast.add({
      id: "notify_me",
      title: "Thank you for your interest!",
      description: "We will notify you when the application is ready to use.",
      icon: "solar:check-circle-bold",
      timeout: 5000,
    });
  } else {
    toast.add({
      id: "notify_me",
      title: "Something went wrong!",
      description: "You are already in the list. We will notify you soon.",
      icon: "solar:close-circle-bold",
      color: "red",
      timeout: 5000,
    });
  }
  localStorage.setItem("notify_me", "true");

  form.value = {
    name: "",
    email: "",
  };
  isOpen.value = false;
}

function dontShowAgain() {
  localStorage.setItem("notify_me", "true");
  isOpen.value = false;
}
</script>

<template>
  <UModal
    v-model="isOpen"
    :ui="{
      width: 'sm:max-w-lg md:max-w-xl lg:max-w-2xl',
    }"
    prevent-close
  >
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold uppercase leading-6 text-white">
            This page is under development
          </h3>
        </div>
      </template>

      <div class="w-full grid grid-cols-2">
        <div class="col-span-2 lg:col-span-1 flex justify-center items-center">
          <img src="/img/maintainer.png" class="w-full max-w-[250px]" />
        </div>
        <div class="col-span-2 lg:col-span-1">
          <p class="text-sm text-gray-400">
            We are working hard to bring you the best experience. Please fill
            the form below to get notified when the page is ready.
          </p>

          <UDivider class="my-4" />

          <div>
            <UForm
              :schema="NotifyMeRequest"
              :state="form"
              class="flex flex-col gap-5"
              @submit="getNotify"
            >
              <UFormGroup label="Your Name" name="name" required>
                <UInput placeholder="Enter Your Name" v-model="form.name" />
              </UFormGroup>
              <UFormGroup label="Email Address" name="email" required>
                <UInput
                  placeholder="Enter Your Email Address"
                  v-model="form.email"
                />
              </UFormGroup>
              <div class="flex gap-3 justify-end">
                <UButton
                  color="gray"
                  label="Stay Away From Me"
                  @click="dontShowAgain"
                />
                <UButton label="Notify Me" type="submit" />
              </div>
            </UForm>
          </div>
        </div>
      </div>
    </UCard>
  </UModal>
</template>
