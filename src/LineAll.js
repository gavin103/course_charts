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
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
      this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
      this.gradient3 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
      this.gradient4 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
      this.gradient5 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

      this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.3)')
      this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
      this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
        
      this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.3)')
      this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
      this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)');

      this.gradient3.addColorStop(0, 'rgba(0,0,255,0.1)')
      this.gradient3.addColorStop(0.5, 'rgba(0,0,255,0.1)');
      this.gradient3.addColorStop(1, 'rgba(0,0,255,0)');

      this.gradient4.addColorStop(0, 'rgba(0,255,0,0.3)')
      this.gradient4.addColorStop(0.5, 'rgba(0,255,0,0.25)');
      this.gradient4.addColorStop(1, 'rgba(0,255,0,0)');
   console.log("org："+this.org);
   console.log("总人数"+this.totalstu);
    this.renderChart({
      labels: this.dateList,
      datasets:[
        {
          label: this.list[0].org,
          backgroundColor: '#f87979',
          data: this.totalstu[0],
          backgroundColor: this.gradient,
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: 'white' 
        },
        {
          label: this.list[1].org,
          backgroundColor: 'yellow',
          data: this.totalstu[1],
          backgroundColor: this.gradient2,
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: 'white' 
        },
        {
          label: this.list[2].org,
          backgroundColor: 'purple',
          data: this.totalstu[2],
          backgroundColor: this.gradient3,
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: 'white' 
        },
        {
          label: this.list[3].org,
          backgroundColor: 'blue',
          data: this.totalstu[3],
          backgroundColor: this.gradient4,
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: 'white' 
        },
        {
          label: this.list[4].org,
          backgroundColor: 'red',
          data: this.totalstu[4],
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: 'white' 
        }
        
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}