import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import Vue from 'vue'
import router from './router'
import { store } from './store'
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import vuetify from './plugins/vuetify'
import { marked } from 'marked'
import Tooltip from '@/components/TooltipParam.vue'

Vue.config.productionTip = false
Vue.use(Vuetify)

Vue.component('Tooltip', Tooltip)

Vue.prototype.$marked = marked
Vue.prototype.$jenna = require('@/assets/art/Jenna.png')
Vue.prototype.$general = require('@/assets/General.svg')
Vue.prototype.$strike = require('@/assets/Strike.svg')
Vue.prototype.$move = require('@/assets/Move.svg')
Vue.prototype.$support = require('@/assets/Support.svg')
Vue.prototype.$defensive = require('@/assets/Defensive.svg')

Vue.mixin({
  computed: {
    isMobile: function () {
      return screen.width <= 760
    },
  },
  methods: {
    mobileOrNormal(class_name) {
      if (screen.width <= 760) {
        return class_name + '-mobile'
      }
      return class_name
    },
  },
})

new Vue({
  components: { App },
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
