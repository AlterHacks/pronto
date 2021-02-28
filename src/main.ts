import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import VWave from "v-wave";

Vue.config.productionTip = false;

Vue.use(VWave);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
