
export default defineNuxtConfig({
    css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.min.css', '@fortawesome/fontawesome-free/css/all.css', '@/assets/styles/main.scss'],
    build: {
        transpile: ['vuetify']
    },
    modules:[
        '@pinia/nuxt'
    ]
})
