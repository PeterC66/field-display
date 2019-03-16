import Vue from 'vue';
import App from './VFGDFExample01.vue';
import 'vue-form-generator/dist/vfg.css';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
