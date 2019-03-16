import Vue from 'vue';
import App from '../examples/vfgdf-example01/VFGDFExample01.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
