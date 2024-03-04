import Vue from 'vue';
import App from './App.vue';
import router from './router'; // Stellen Sie sicher, dass Sie Ihre Router-Konfiguration importieren

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

