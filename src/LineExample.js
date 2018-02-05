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
    onlinestu:state=>state.onlinestu
  }),
  //注意声明周期
  mounted () {
    //从computed过来的东西 不要和 data冲突
      //不管我用Object还是Map，最后数组的每个index的值都会被转义成Object或者Map保存。呜呜呜呜呜！
      //我以也是没办法啦,我只能用最笨的方法啦！佳哥别怪我。本想做成动态的，万一哪天多了一家机构也好多
      //一条折线，可是浏览器它识别有问题，我也没办法呀！如果想到好的办法记得告诉我呀！
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
    console.log(this.list);
    console.log(this.onlinestu[0]);
    console.log(this.dateList);
    this.renderChart({
      labels:this.dateList,
      datasets:[
        {
          label: this.list[0].org,
          data: this.onlinestu[0],
          backgroundColor: this.gradient,
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: 'white' 
        },
        {
          label: this.list[1].org,
          data: this.onlinestu[1],
          backgroundColor: this.gradient2,
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: 'white'
         
        },
        {
          label: this.list[2].org,
          data: this.onlinestu[2],
          backgroundColor: this.gradient3,
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: 'white'
        },
        {
          label: this.list[3].org,
          data: this.onlinestu[3],
          backgroundColor: this.gradient4,
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: 'white'
        },
        {
          label: this.list[4].org,
          data: this.onlinestu[4],
          pointBackgroundColor: 'white',
          borderWidth: 1,
          pointBorderColor: 'white'
        }
        
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}