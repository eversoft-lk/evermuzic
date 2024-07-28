import { defineStore } from "pinia";

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
};

export const useAuth = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    user: null as User | null,
    accessToken: null as string | null,
  }),
  actions: {
    logout() {
      this.isLoggedIn = false;
      this.user = null;
      this.accessToken = null;
      localStorage.removeItem("access_token");
    },
  },
});
