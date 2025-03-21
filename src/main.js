import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

// 配置
Vue.config.productionTip = false

// 引入样式
import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/js/bootstrap.js'

// 使用ElementUI
Vue.use(ElementUI)

// 创建Vue实例
new Vue({
  render: h => h(App),
}).$mount('#app')
