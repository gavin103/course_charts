//注意的是第三方的库不要往这里折腾了
import { Bar,Line } from 'vue-chartjs'
//不要去new Vue,new Vue之后 一定要挂载 render/el mounted
export default {
  //不要去自己建 
  extends: Line,
  //善用Vuex
  computed:Vuex.mapState({
    list:state=> state.list,
    dateList:state=>state.dateList,
    totalstu:state=>state.totalstu
  }),
  //注意声明周期
  mounted () {
   
    this.renderChart({
      labels: this.dateList,
      datasets:[
        {
          label: this.list[0].org,
          backgroundColor: '#f87979',
          data: this.totalstu[0]
        },
        {
          label: this.list[1].org,
          backgroundColor: 'yellow',
          data: this.totalstu[1]
        },
        {
          label: this.list[2].org,
          backgroundColor: 'purple',
          data: this.totalstu[2]
        },
        {
          label: this.list[3].org,
          backgroundColor: 'blue',
          data: this.totalstu[3]
        },
        {
          label: this.list[4].org,
          backgroundColor: 'red',
          data: this.totalstu[4]
        }
        
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}