type Payload = {
  id: string;
  name: string;
  username: string;
  email: string;
};

type ValidateResponse = {
  status: "success" | "error";
  message: string;
  payload?: Payload;
};

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) {
    return;
  }

  const app = useRuntimeConfig();
  const auth = useAuth();

  const token = localStorage.getItem("access_token");
  if (token == null) {
    auth.isLoggedIn = false;
    return;
  }

  const response = await $fetch<ValidateResponse>(
    app.public.evermuzicApi + "/auth/validate",
    {
      headers: {
        Authorization: token,
      },
    }
  );

  if (response.status === "error") {
    localStorage.removeItem("access_token");
    auth.isLoggedIn = false;
    auth.user = null;
    auth.accessToken = null;
    return;
  }
  auth.isLoggedIn = true;
  auth.user = response.payload as Payload;
  auth.accessToken = token;

  return;
});
