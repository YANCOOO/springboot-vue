import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// element plus引入
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

import '@/assets/CSS/global.css'

createApp(App).use(store).use(router).use(ElementPlus, { locale }).mount('#app')
