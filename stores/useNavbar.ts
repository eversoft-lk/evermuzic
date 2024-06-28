import { defineStore } from "pinia";

export const useNavbarStore = defineStore("navbar", {
  state: () => ({
    isOpen: false,
  }),
  getters: {
    isNavbarOpen(): boolean {
      return this.isOpen;
    },
  },
  actions: {
    toggleNavbar() {
      this.isOpen = !this.isOpen;
    },
  },
});
