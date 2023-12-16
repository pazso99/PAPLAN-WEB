/* @ts-ignore */
import numeral from 'numeral';

export default defineNuxtPlugin(({ vueApp }) => {
    vueApp.config.globalProperties.$formatNumber = (value: any) => {
      return numeral(value).format("0,0");
    };
});
