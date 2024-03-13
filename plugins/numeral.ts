// eslint-disable-next-line ts/ban-ts-comment
/* @ts-expect-error */
import numeral from 'numeral';

export default defineNuxtPlugin(({ vueApp }) => {
    vueApp.config.globalProperties.$formatNumber = (value: any) => {
        return numeral(value).format('0,0');
    };
});
