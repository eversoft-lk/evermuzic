// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxtjs/seo"],
  ssr: false,
  tailwindcss: {
    configPath: "~/tailwind.config.ts",
    cssPath: "~/assets/css/style.css",
  },
  site: {
    url: "https://evermuzic.me",
    name: "Evermuzic",
    description:
      "Discover EverMuzic, the ultimate platform for ad-free music streaming. Enjoy seamless access to your favorite songs and playlists without interruptions. Join EverMuzic for an uninterrupted music experience.",
    defaultLocale: "en",
  },
  runtimeConfig: {
    public: {
      evermuzicApi:
        process.env.EVERMUZIC_API || "https://api.evermuzic.me/api/v1",
      spotifyApi: process.env.SPOTIFY_API || "https://api.spotify.com/v1",
      youtubeApi:
        process.env.YOUTUBE_API ||
        "https://youtube-api-tharindu-nimeshs-projects.vercel.app/api",
    },
  },
});
