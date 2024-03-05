import {
    combine,
    comments,
    ignores,
    imports,
    stylistic,
    typescript,
    vue,
} from '@antfu/eslint-config';

export default combine(
    ignores(),
    comments(),
    imports(),
    typescript({
        overrides: {
            indent: ['error', 4, { SwitchCase: 1 }],
        },
    }),
    stylistic({
        indent: 4,
        quotes: 'single',
        semi: true,
        overrides: {
            'style/brace-style': ['error', '1tbs'],
            'curly': ['error'],
        },
    }),
    vue({
        typescript: true,
        overrides: {
            'vue/html-indent': ['error', 4],
            'no-console': 'warn',
            'vue/block-order': ['error', {
                order: [['template', 'script'], 'style'],
            }],
        },
    }),
);
