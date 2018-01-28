'use strict';

var _CommitChart = require('./CommitChart.vue');

var _CommitChart2 = _interopRequireDefault(_CommitChart);

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//入口文件
Vue.use(Vuex);
console.log('main');
new Vue({
  store: _data2.default,
  render: function render(h) {
    return h(_CommitChart2.default);
  } //渲染函数
}).$mount('#app');