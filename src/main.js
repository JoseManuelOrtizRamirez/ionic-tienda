import { createApp } from 'vue'
import App from './App.vue'
import router from './router';


import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
//import './theme/variables.css';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import brands from "@fortawesome/fontawesome-free-brands";

/* import specific icons */
import { faHouse, faPlusCircle, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import mitt from 'mitt';
const emitter = mitt();

/* add icons to the library */
library.add(brands, faHouse, faPlusCircle, faSearch, faTrash)

const app = createApp(App)
  .use(IonicVue)
  .use(VueSweetalert2)
  .use(router);

app.config.globalProperties.emitter = emitter;
router.isReady().then(() => {
  app.component('font-awesome-icon', FontAwesomeIcon)
  app.mount('#app');
});