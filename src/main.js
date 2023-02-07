import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index';

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js" // bootstrap js file
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css"

import ToastPlugin from "vue-toast-notification"; // toast package
import 'vue-toast-notification/dist/theme-sugar.css'; // toast package css file
import store from './store'; // vuex package

const app = createApp(App);

app.use(router);
app.use(ToastPlugin);
app.use(store);
app.mount('#app');
