import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import store from './store'

import api from './api'
import request from './libs/request'
import storage from './libs/storage'
import 'normalize.css/normalize.css'
import 'virtual:windi.css'

const app = createApp(App)

app.directive('permission', {
  beforeMount(el, binding) {
    const btnList = storage.getItem('btnList')
    if (!btnList.includes(binding.value)) {
      el.style.display = 'none'
      setTimeout(() => {
        el.parentNode.removeChild(el)
      })
    } else {
      // el.style.color = '#73d9f5'
    }
  }
})

app.config.globalProperties.$request = request
app.config.globalProperties.$api = api
app.config.globalProperties.$storage = storage
app.config.globalProperties.$store = store

app.use(Antd).use(router).use(store).mount('#app')
