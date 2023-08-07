// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules:['@nuxtjs/google-fonts','nuxt-icon'],
  googleFonts: {
    families: {
     
      Roboto: true,
      DMSans: true,
  
    
      'Josefin+Sans': true,
  
     
      Lato: [100, 300],
    }
  }
})
