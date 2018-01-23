import Line from './Line'
import data from './data'
export default {
  extends: Line,
  mounted () {
    console.log(data.state);
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
  }
}
