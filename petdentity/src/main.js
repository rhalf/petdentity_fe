import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import stores from './stores'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

const app = createApp(App)
app.use(router)
app.use(stores)
app.use(vuetify)
app.mount('#app')
