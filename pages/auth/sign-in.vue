<script setup lang="ts">
import { LoginRequest } from "~/schema";
import type { LoginRequestType } from "~/schema";
import type { FormSubmitEvent } from "#ui/types";

type SignInResponse = {
    message: string;
    user: {
        id: string;
        name: string;
        username: string;
        email: string;
    };
    accessToken: string;
    refreshToken: string;
};

useHead({
    title: "Sign In | Evermuzic",
    meta: [
        {
            name: "description",
            content: "Sign in to your Evermuzic account",
        },
    ],
});

const toast = useToast();
const router = useRouter();
const app = useRuntimeConfig();
const form = ref({
    usernameOrEmail: "",
    password: "",
});

async function signIn(event: FormSubmitEvent<LoginRequestType>) {
    const { data } = await useFetch<SignInResponse>(
        app.public.evermuzicApi + "/auth/login",
        {
            method: "POST",
            body: event.data,
            headers: {
                "Content-Type": "application/json",
            },
        },
    );

    if (!data.value) {
        toast.add({
            id: "invalid_credentials",
            title: "Invalid Credentials",
            description:
                "The username or password you entered is incorrect. Please try again.",
            icon: "solar:close-circle-bold",
            timeout: 3000,
            color: "red",
        });
        return;
    }

    localStorage.setItem("access_token", data.value.accessToken);
    localStorage.setItem("refresh_token", data.value.refreshToken);

    router.push("/");
}
</script>

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
                        <UForm
                            :schema="LoginRequest"
                            :state="form"
                            class="mx-auto max-w-xs flex flex-col gap-3"
                            @submit="signIn"
                        >
                            <UFormGroup
                                label="Username or Email"
                                name="usernameOrEmail"
                            >
                                <UInput
                                    placeholder="Enter Your Username Or Email"
                                    v-model="form.usernameOrEmail"
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
                                label="Sign In"
                                color="indigo"
                                size="xl"
                                icon="material-symbols:login"
                                type="submit"
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
                        </UForm>
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
