import Vue from 'vue'
import App from './App.vue'
import { router } from './router.js'
import store from './store.js'
import services from './service.js'

import './assets/tailwind.css'

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import moment from "moment";
import IcnSvg from "./components/Icn.vue";
import PopUp from "./components/PopUp.vue";

import EmptyState from "./components/emptyState.vue";
Vue.component("EmptyState", EmptyState);
Vue.component("PopUp", PopUp);
Vue.component("IcnSvg", IcnSvg);
Vue.prototype.$SERVICES = services;
Vue.prototype.$moment = moment;
Vue.config.productionTip = false;


Vue.filter("date", function (date, format = "YYYY-MM-DD H:mm") {
  return date ? moment(new Date(date)).format(format) : "__";
});

const toastOptions = {
  type: "success",
  position: "top-center",
  timeout: 4000,
  hideProgressBar: true,
};
Vue.use(Toast, toastOptions);

Vue.use(router)
Vue.use(store)


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
