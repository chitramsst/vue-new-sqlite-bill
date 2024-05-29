// import './assets/main.css'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/styles.css'; 
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import mitt from 'mitt'
const emitter = mitt()

import moment  from 'moment'

const app = createApp(App)

const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)

app.use(router)

type Events = {
    notify: {
        title : string
        subtitle : string
        description? : string;
        type : 'success' | 'warning' | 'error';
    };
    'show-delete-modal' : {
        message : string
        callback : Function
    },
    'check-financial-warning-modal' : {
        message : string
        callback : Function
    },
};


declare module 'vue' {
    interface ComponentCustomProperties {
      $emitter: Emitter<Events>;
      $moment: any;
      $imageTo64: any;
    }
}

app.config.globalProperties.$emitter = mitt<Events>()

app.mount('#app')
