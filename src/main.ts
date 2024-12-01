import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

const app = createApp(App);
const store = createPinia();
app
  .use(store)
  .use(PrimeVue, {
    theme: {
      options: {
        prefix: 'p',
        darkModeSelector: 'system',
        cssLayer: false
      }
    }
  })
  .mount('#app');
