import Vue from 'vue';
import Element from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import TitleBar from '@/components/common/TitleBar.vue'; //页面title组件
import './styles';
import * as echarts from 'echarts';

Vue.prototype.$echarts = echarts;

Vue.use(Element, { size: 'mini' });

Vue.component('TitleBar', TitleBar);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');