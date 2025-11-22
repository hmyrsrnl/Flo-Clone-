import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import '@/assets/styles/global.css' 


const app = createApp(App);

// 1. Router'ı uygulamaya ekleyin (use(router))
app.use(router); 

// 2. Uygulamayı mount edin
app.mount('#app');