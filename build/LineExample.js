'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vueChartjs = require('vue-chartjs');

//不要去new Vue,new Vue之后 一定要挂载 render/el mounted
exports.default = {
  //不要去自己建 
  extends: _vueChartjs.Line,
  //善用Vuex
  computed: Vuex.mapState({
    dateList: function dateList(state) {
      return state.dateList;
    },
    onlineList: function onlineList(state) {
      return state.onlineList;
    }
  }),
  //注意声明周期
  mounted: function mounted() {
    //从computed过来的东西 不要和 data冲突
    console.log('我的this', this.dateList);
    this.renderChart({
      labels: this.dateList,
      datasets: [{
        label: 'GitHub Commits',
        backgroundColor: '#f87979',
        data: this.onlineList
      }]
    });
  }
}; //注意的是第三方的库不要往这里折腾了