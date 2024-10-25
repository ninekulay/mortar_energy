import { createApp } from 'vue'
import '@/assets/scss/main.scss'
import '@/assets/css/index.css'
import App from './App.vue'
import './registerServiceWorker'
import router from '@/router'
import store from '@/store'

// Import Icons
// import '@/assets/css/main.scss'
// import '@/assets/css/tailwind.css'
import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'
import HighchartsMore from 'highcharts/highcharts-more'
// Import the required modules for Gauge chart
import SolidGauge from 'highcharts/modules/solid-gauge'

HighchartsMore(Highcharts)
SolidGauge(Highcharts)

createApp(App)
  .use(store)
  .use(router)
  .use(HighchartsVue)
  // .mixin(DateMixin)
  .mount('#app')

