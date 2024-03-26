import {createApp} from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify'

import { router } from './router/router'

import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import {loadFonts} from './plugins/webfontloader'

loadFonts()

const app = createApp(App)
    .use(BootstrapVue3)
    .use(router)
    .use(vuetify)
    .mount('#app');

// 백엔드 API 주소를 상수로 등록
const apiUrl = 'http://localhost:8080/';
app.config.globalProperties.$apiUrl = apiUrl;

app.mount('#app');