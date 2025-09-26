// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["~/assets/css/main.css", "~/assets/scss/global.scss"],
  modules: ["@nuxt/fonts", "@nuxt/image", "shadcn-nuxt"],
  fonts: {
    families: [
      {
        name: "inter",
        provider: "google",
      },
    ],
  },
  shadcn: {
    prefix: "",
    componentDir: "~/components/ui",
  },
  routeRules: {
    "/": { ssr: false },
  },
})
