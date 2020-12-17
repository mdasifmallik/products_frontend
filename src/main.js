import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import url from './helpers/url'
import user from './helpers/user'
import Swal from 'sweetalert2'

Vue.config.productionTip = false

// Axios
Vue.use(VueAxios, axios)

// Laravel Pagination
Vue.component('pagination', require('laravel-vue-pagination'));

// Vue Moment
Vue.use(require('vue-moment'));

// SweetAlert Toast
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  // timerProgressBar: true,
  didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

// Mixins
Vue.mixin({
  data() {
    return {
      url,
      user,
      Swal,
      Toast
    }
  }
})



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
