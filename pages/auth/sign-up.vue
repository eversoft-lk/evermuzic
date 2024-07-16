<script setup lang="ts">
import { RegisterRequest as RegisterSchema } from "~/schema";
import type { FormSubmitEvent } from "#ui/types";
import type { RegisterRequestType } from "~/schema";

useHead({
    title: "Sign Up | Evermuzic",
    meta: [
        {
            name: "description",
            content:
                "Sign Up to Evermuzic to get started with your music journey.",
        },
        {
            name: "keywords",
            content: "Sign Up, Evermuzic, Music, Sign Up to Evermuzic",
        },
    ],
});

const app = useRuntimeConfig();
const toast = useToast();
const router = useRouter();
const form = ref({
    name: "",
    username: "",
    email: "",
    password: "",
});

async function signUp(event: FormSubmitEvent<RegisterRequestType>) {
    const { data, error } = await useFetch(
        app.public.evermuzicApi + "/auth/register",
        {
            method: "POST",
            body: event.data,
        },
    );

    if (!data.value) {
        const user = error.value?.data.user;
        if (!user) {
            toast.add({
                id: "server_error",
                title: "Server Error",
                description:
                    "An error occurred while processing your request. Please try again later. If the problem persists, please contact support.",
                icon: "solar:close-circle-bold",
                timeout: 3000,
                color: "red",
                actions: [
                    {
                        label: "Contact Support",
                        click: () => {
                            window?.open("mailto:support@evermuzic.me", "_blank")?.focus();
                        },
                    },
                    {
                        label: "Retry",
                        click: () => {
                            signUp(event);
                        },
                        color: "black",
                    },
                ],
            });
            return;
        }

        if (user.email === event.data.email) {
            toast.add({
                id: "user_already_exists",
                title: "An user already Exists.",
                description:
                    "An user with this email already exists. Please try again with a different email.",
                icon: "solar:close-circle-bold",
                timeout: 3000,
                color: "red",
            });
            return;
        }

        if (user.username === event.data.username) {
            toast.add({
                id: "user_already_exists",
                title: "An user already Exists.",
                description:
                    "An user with this username already exists. Please try again with a different username.",
                icon: "solar:close-circle-bold",
                timeout: 3000,
                color: "red",
                actions: [
                    {
                        label: "Generate A New One",
                        click: () => {
                            generateUsername();
                        },
                        color: "black",
                    },
                ],
            });
            return;
        }
    }

    toast.add({
        id: "sign_up_success",
        title: "Sign Up Successful",
        description: "You have successfully signed up.",
        icon: "solar:check-circle-bold",
        timeout: 3000,
        color: "green",
    });
    router.push("/auth/sign-in");
}

function generateUsername() {
    let username = form.value.name
        .split(" ")
        .map((name) => name.toLowerCase())
        .join(".");
    const randomNumber = Math.floor(Math.random() * 10000);
    username += randomNumber;
    form.value.username = username;
}
</script>

<template>
    <div
        class="min-h-screen rounded-lg py-5 flex items-center justify-center bg-gradient-to-br from-black to-[#0e1222]"
    >
        <div
            class="w-full lg:max-w-[80%] bg-slate-950/30 backdrop-blur-lg border border-slate-900 shadow sm:rounded-lg grid grid-cols-2"
        >
            <div
                class="col-span-full lg:col-span-1 bg-gray-700 rounded-l-lg text-center lg:rounded-r-lg hidden lg:flex"
            >
                <div
                    class="relative w-full bg-cover bg-center rounded-l-lg bg-no-repeat bg-[url(/img/sign-up.jpg)] overflow-hidden"
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
                        <UForm
                            :schema="RegisterSchema"
                            :state="form"
                            class="mx-auto flex flex-col gap-3"
                            @submit="signUp"
                        >
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <UFormGroup label="Name" name="name">
                                    <UInput
                                        placeholder="Enter Your Name"
                                        v-model="form.name"
                                    />
                                </UFormGroup>

                                <UFormGroup label="Username" name="username">
                                    <UInput
                                        placeholder="Enter Your Username"
                                        v-model="form.username"
                                    />
                                </UFormGroup>
                            </div>

                            <UFormGroup label="Email Address" name="email">
                                <UInput
                                    type="email"
                                    placeholder="Enter Your Email"
                                    v-model="form.email"
                                />
                            </UFormGroup>

                            <UFormGroup label="Password" name="password">
                                <UInput
                                    type="password"
                                    placeholder="Enter Your Password"
                                    v-model="form.password"
                                />
                            </UFormGroup>

                            <UButton
                                label="Sign Up"
                                color="indigo"
                                size="xl"
                                icon="ic:baseline-person-add-alt-1"
                                type="submit"
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
                        </UForm>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
