import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App);

const options = {
  confirmButtonColor: "#29364E",
  cancelButtonColor: "#D6646C",
};
app.use(VueSweetalert2, options);

app.use(router).mount("#app");
