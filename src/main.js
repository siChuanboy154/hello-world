import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/fonts/iconfont.css' //字体图标
import './assets/css/reset.css'// 重置样式
import echarts from 'echarts' // 这是怎么实现的？
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.use(ElementUI);// 使用element-ui

// 路由守卫
router.beforeEach((to, from, next) => { // to from 记住
  let token = localStorage.getItem('token')
  if (token) { // 有令牌token
    next() // 有令牌token 直接放行
  } else {
    if (to.path === '/login') { // to+要去的路由
      next() // 如果没有令牌token但是要去的路由是login 放行
    } else {
      next('/login') // 去其他路由的就统统跳login
    }
  }
})

let bus = new Vue() // 开启中心控制...
Vue.prototype.bus = bus // 挂载到原型
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
