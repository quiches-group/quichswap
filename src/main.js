import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Quichtify from 'quichtify';
import 'quichtify/dist/style.css';
import './index.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Quichtify);

app.mount('#app');
