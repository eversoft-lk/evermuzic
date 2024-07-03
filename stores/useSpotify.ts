import { defineStore } from "pinia";

type accessToken = string | null;
type ResponseType = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export const useSpotify = defineStore("spotify", {
  state: () => ({
    accessToken: null as accessToken,
    expiresIn: null as Date | null,
  }),
  actions: {
    check(): boolean {
      if (!this.accessToken) {
        return false;
      }

      const token = localStorage.getItem("spotify-access-token");
      if (!token) {
        return false;
      }

      return true;
    },
    async getAnAccessToken() {
      const { data } = await useFetch<ResponseType>(
        useRuntimeConfig().public.evermuzicApi + "/spotify/get-access-token"
      );
      if (!data.value) {
        return;
      }

      this.accessToken = data.value?.access_token;
      localStorage.setItem("spotify-access-token", data.value?.access_token);

      const expiresIn = new Date();
      expiresIn.setSeconds(expiresIn.getSeconds() + data.value.expires_in);
      this.expiresIn = expiresIn;
    },
  },
});
