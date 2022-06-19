import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Quichtify from 'quichtify';

import 'quichtify/dist/style.css';
import './index.css';

import App from './App.vue';
import router from './router';

const app = createApp(App);

// TODO find a way to have this in env file
axios.defaults.baseURL = 'http://localhost:3333';

app.use(createPinia());
app.use(router);
app.use(Quichtify);
app.use(VueAxios, axios);

app.mount('#app');
