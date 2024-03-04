// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    devtools: {
        enabled: true
    },
    app: {
        head: {
            link: [
                {
                    rel: 'preconnect',
                    href: 'https://fonts.googleapis.com',
                },
            ],
        },
    },
    typescript: {
        strict: true,
    },
    runtimeConfig: {
        public: {
            API_BASE_URL: process.env.API_BASE_URL,
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/scss/customColors.scss" as *;',
                },
            },
        },
    },
    css: [
        '~/assets/scss/main.scss',
        'primevue/resources/themes/aura-dark-blue/theme.css',
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css',
    ],
    primevue: {
        cssLayerOrder: 'tailwind-base, primevue, tailwind-utilities',
    },
    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@vee-validate/nuxt',
        'dayjs-nuxt',
        'nuxt-primevue'
    ]
});
