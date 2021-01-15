import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAoD9u0nV6F3O7rtIgafbloUnFDTsgLn6s',
    libraries: 'places',
  },

  installComponents: true
})

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
