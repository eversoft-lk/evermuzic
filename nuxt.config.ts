// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  tailwindcss: {
    configPath: "~/tailwind.config.ts",
    cssPath: "~/assets/css/style.css",
  }
})