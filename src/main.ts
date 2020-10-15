import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles/reset.scss';
import { BootstrapVue } from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
import Echart from 'echarts';
Vue.prototype.$echarts = Echart;
new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
