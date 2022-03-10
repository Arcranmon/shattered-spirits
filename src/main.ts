import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

import Vue from "vue";
import router from "./router";
import { store } from "./store";
import App from "./App.vue";
import "vuetify/dist/vuetify.min.css";
import Vuetify from "vuetify";
import vuetify from "./plugins/vuetify";
import { marked } from "marked";
import Tooltip from "@/components/TooltipParam.vue";

Vue.config.productionTip = false;
Vue.use(Vuetify);

Vue.component("Tooltip", Tooltip);

Vue.prototype.$marked = marked;

new Vue({
  components: { App },
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
