import Vue from 'vue';
// @ts-ignore
import App from './App.vue';
import router from './router';
import './assets/styles/reset.scss';
import { BootstrapVue } from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Echart from 'echarts';
Vue.use(BootstrapVue);

Vue.config.productionTip = false;




Vue.prototype.$echarts = Echart;
new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
