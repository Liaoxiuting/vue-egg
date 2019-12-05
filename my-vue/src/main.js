// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Scroll from './components/scroll'
// rem自适应
import 'lib-flexible/flexible.js'

Vue.config.productionTip = false
// rem自适应
import remAndphoneConfig from './configs/remComfig.js'

remAndphoneConfig()
Vue.use(ElementUI);

Vue.component(Scroll.name,Scroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
