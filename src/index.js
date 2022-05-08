import { createApp } from 'vue';
import { getStoredParagraphs } from "./utils/paragraph";
import App from './components/App.vue';
import './index.css';

const app = createApp(App, {
  initialParagraphs: getStoredParagraphs(),
});
app.mount('#app');
