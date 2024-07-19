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
  getters: {
    isExpiresSoon(): boolean {
      if (!this.expiresIn) {
        return false;
      }

      const now = new Date();
      const expirationTime = new Date(this.expiresIn);
      expirationTime.setMinutes(expirationTime.getMinutes() - 5);
      return now > expirationTime;
    },
  },
  actions: {
    check(): boolean {
      if (!this.accessToken) {
        return false;
      }

      const token = localStorage.getItem("spotify-access-token");
      if (!token) {
        return false;
      }

      // if token expired, return false
      if (this.expiresIn === null) {
        const expireTime = localStorage.getItem("expires_in");
        if (expireTime) {
          this.expiresIn = new Date(expireTime);
        }
      }
      if (this.isExpiresSoon) {
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
      localStorage.setItem("expires_in", expiresIn.toString());
    },
  },
});
