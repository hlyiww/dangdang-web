import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ResourcesUtil from "./utils/resourcesUtil";

ResourcesUtil.loadAllResources();

const app = createApp(App);
app.mount("#app");
