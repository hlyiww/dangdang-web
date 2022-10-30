import { createApp } from 'vue'
import App from './App.vue'
import { ResourcesUtil } from './utils/resourcesUtil'

ResourcesUtil.loadAllResources()

const app = createApp(App)
app.mount('#app')
