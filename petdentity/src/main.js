import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import stores from './stores'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import './scss/variables.scss'

loadFonts()

const app = createApp(App)
app.use(stores)
app.use(router)
app.use(vuetify)
app.mount('#app')
