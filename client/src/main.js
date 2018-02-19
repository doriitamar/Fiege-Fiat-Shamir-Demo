import Vue from 'vue'
import Layout from './Layout.vue'
import VueRouter from 'vue-router'
import router from './routes.js'

Vue.use(VueRouter);

new Vue({
  el: '#app',
  render: h => h(Layout),
  router
})

Vue.config.devtools = true;

