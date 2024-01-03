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
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap',
                    crossorigin: '',
                },
            ],
        },
    },
    axios: {
        credentials: true
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
    ],
    modules: [
        '@pinia/nuxt',
        '@nuxt/ui',
        '@vee-validate/nuxt',
        'dayjs-nuxt'
    ],
});
