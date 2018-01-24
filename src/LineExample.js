import Line from './Line'
import data from './data'
export default {
  extends: Line,
  data(){
    return{
      dateList:[],
      onlineList:[]
    }
  },
  mounted () {
    this.renderChart({
      labels:this.dateList,
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data:this.onlineList
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  },
  computed:{
    done(){
      console.log("computed"+this.$store.getters.done)
      return this.$store.getters.done;
    }
  },
  updated:function(){
    this.$nextTick(function () {
    console.log("0:"+data);
    console.log("1:"+data.dateList);
    console.log("2:"+data.state.dateList);
  })
  }
}
