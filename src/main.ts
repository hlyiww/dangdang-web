import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css';
import { ResourcesUtil } from './utils/resourcesUtil'

ResourcesUtil.loadAllResources()

const app = createApp(App)
app.mount('#app')
