import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from "vue-axios";
import axios from 'axios';

Vue.config.productionTip = false
//its good practise to create axios instance here with baseUrl and use it everywhere
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
