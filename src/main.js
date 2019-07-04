import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import Vuetify from 'vuetify';
Vue.use(Vuetify, {
    iconfont: 'mdi',
    theme: {
        primary: '#4caf50'
    }
});

new Vue({
  render: h => h(App),
}).$mount('#app')
