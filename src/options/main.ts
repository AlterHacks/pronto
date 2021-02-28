import Vue from "vue";
import "@/assets/tailwind.css";
import App from "./App.vue";
import VWave from "v-wave";
import PortalVue from "portal-vue";
import "@/icons.ts";

Vue.use(PortalVue);
Vue.use(VWave);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
});
