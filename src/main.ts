import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./components/";
import "./plugins/bootstrap.ts";
import "@/assets/stylus/index.styl";
import "./mixins/";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
