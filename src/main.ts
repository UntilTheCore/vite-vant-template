import { createApp } from "vue";
import "@unocss/reset/tailwind.css";
import router from "@/router";
import Pinia from "@/store";
import App from "./App.vue";
import Fonts from "@/assets/fonts";
import "virtual:uno.css";

const app = createApp(App);

app
  .use(router)
  .use(Pinia);

app
  .use(Fonts)
  .mount("#app");

export default app;
