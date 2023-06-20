// VUE
import { createApp } from 'vue'
import App from './App.vue'

// AXIOS
import axios from 'axios'
import VueAxios from 'vue-axios'

// ROUTER
import router from './router'

// STORE
import store from './store'

// VUETIFY
import 'vuetify/styles' 
import { createVuetify } from 'vuetify' 
import * as components from 'vuetify/components' 
import * as directives from 'vuetify/directives' 
import '@mdi/font/css/materialdesignicons.css'


const app =  createApp(App);

const vuetify = createVuetify({
  components,
  directives,
})

app.use(vuetify, {iconfont: 'mdi'}).use(store).use(VueAxios, axios).use(router).mount('#app')
