import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import "./styles/variables.scss";

import Vue from "vue";
import router from "./router";
import { store } from "./store";
import App from "./App.vue";
import "vuetify/dist/vuetify.min.css";
import Vuetify from "vuetify";
import VueSimpleMarkdown from "vue-simple-markdown";
import "vue-simple-markdown/dist/vue-simple-markdown.css";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueSimpleMarkdown);

new Vue({
  components: { App },
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
