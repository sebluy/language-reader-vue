import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import mitt from "mitt";

const app = createApp(App);
app.config.globalProperties.emitter = mitt();

app.use(createPinia());
app.use(router);

app.mount("#app");
