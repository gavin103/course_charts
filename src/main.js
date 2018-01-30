//入口文件
import App from './CommitChart.vue';
import store from './data'
Vue.use(Vuex);
new Vue({
  store,
  render: h => h(App)//渲染函数
}).$mount('#app')
