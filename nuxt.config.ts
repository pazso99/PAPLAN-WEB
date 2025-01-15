// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

export default defineNuxtConfig({
    ssr: false,

    imports: {
        dirs: [
            'composables/**',
        ],
    },

    devtools: {
        enabled: true,
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
            SPENDING_YEARS: process.env.SPENDING_YEARS,
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
        // 'primevue/resources/themes/aura-dark-blue/theme.css',
        // 'primevue/resources/primevue.css',
        'primeicons/primeicons.css',
    ],

    primevue: {
        options: {
            theme: {
                // options: {
                //     darkModeSelector: '.is-dark',
                // },
                preset: definePreset(Aura, {
                    primitive: {
                        green: { 50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#22c55e', 400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d', 950: '#052e16' },
                        red: { 50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#ef4444', 400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a' },
                    },
                    semantic: {
                        primary: {
                            50: '{sky.50}',
                            100: '{sky.100}',
                            200: '{sky.200}',
                            300: '{sky.300}',
                            400: '{sky.400}',
                            500: '{sky.500}',
                            600: '{sky.600}',
                            700: '{sky.700}',
                            800: '{sky.800}',
                            900: '{sky.900}',
                            950: '{sky.950}',
                        },
                        colorScheme: {
                            light: {
                                primary: {
                                    color: '{primary.500}',
                                    contrastColor: '#fff',
                                },
                            },
                            dark: {
                                primary: {
                                    color: '{primary.600}',
                                    contrastColor: '#fff',
                                    hoverColor: '{slate.950}',
                                },
                            },
                        },
                    },
                    components: {
                        toggleswitch: {
                            colorScheme: {
                                dark: {
                                    root: {
                                        background: '{red.400}',
                                        hoverBackground: '{red.300}',
                                        checkedBackground: '{green.400}',
                                        checkedHoverBackground: '{green.300}',
                                    },
                                    handle: {
                                        background: '{red.900}',
                                        hoverBackground: '{red.800}',
                                        checkedBackground: '{green.900}',
                                        checkedHoverBackground: '{green.800}',
                                    },
                                },
                            },
                        },
                    },
                }),
            },
        },
    },

    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@vee-validate/nuxt',
        'dayjs-nuxt',
        '@primevue/nuxt-module',
    ],

    compatibilityDate: '2024-08-14',
});
