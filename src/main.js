import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//Vuetify
import Vuetify from 'vuetify';
Vue.use(Vuetify, {
    iconfont: 'mdi',
    theme: {
        primary: '#4caf50'
    }
});

//Vuex Store
import { store } from './store/store'

new Vue({
  el: '#app',
  store,
  render: h => h(App),
});


/*
new Vue({
  router,
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
  mounted() {
      this.$store.dispatch('kickbuzz/loadLocalStorage');
      this.$store.dispatch('kickbuzz/networkAccounts');
  }
});*/