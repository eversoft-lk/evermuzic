import { defineStore } from "pinia";

export const useNavbarStore = defineStore("navbar", {
  state: () => ({
    isOpen: true,
  }),
  getters: {
    isNavbarOpen() {
      return this.isOpen;
    },
  },
  actions: {
    toggleNavbar() {
      this.isOpen = !this.isOpen;
    },
  },
});
