<template>
  <chart class="width-100pc" :options="gaugeOptions" :updateArgs="[true, true]"/>
</template>
<style scoped lang="scss">

</style>
<script>
import { Chart } from 'highcharts-vue'
import { reactive, watch } from 'vue'
// Import the xrange module
import xrange from 'highcharts/modules/xrange'
import Highcharts from "highcharts"; // Import Highcharts
// Initialize the xrange module
xrange(Highcharts)


export default {
  name: 'C-Chart-Timeline',
  components: { Chart },
  props: {
    dataSource: {},
    width: {
      type: String,
      default: null
    }
  },
  setup (props) {
    // eslint-disable-next-line no-unused-vars
    const parseDateToUTC = (dateStr) => {
      const [datePart, timePart] = dateStr.split(' ');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hours, minutes, seconds] = timePart.split(':').map(Number);

      return Date.UTC(year, month - 1, day, hours, minutes, seconds); 
    }
    const utcDate = parseDateToUTC('2024-09-19 10:00:00')
    console.log('utcDate', utcDate, Date.UTC(2024, 8, 19, 10, 0))
    const gaugeOptions = reactive({
      chart: {
        type: 'xrange',
        width: props?.width || null
      },
      title: {
        text: props.dataSource.name,
        align: 'center',
        fontSize: props.dataSource?.fontSize || '16px'
      },

      yAxis: {
        title: null,
        categories: ['Status']
      },

      xAxis: {
        type: 'datetime',
        labels: {
          style: {
            fontSize: props.dataSource?.fontSize || '12px' // Adjust X axis label font size
          }
        }
      },
      tooltip: {
        formatter: function () {
            return 'State: ' + this.point.label + '<br>Start: ' + 
                Highcharts.dateFormat('%Y-%m-%d %H:%M', this.point.x) + '<br>End: ' + 
                Highcharts.dateFormat('%Y-%m-%d %H:%M', this.point.x2);
        }
      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
        enabled: false
      },

      plotOptions: {
        series: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
      },

      series: [{
        name: 'State',
        pointWidth: 50,
        data: props.dataSource.data || [],
      }],
      credits: {
        enabled: props.dataSource.credits
      }
    })
    watch(
      () => props.dataSource,
      (newVolume) => {
        console.log('newVolume', newVolume)
      },
      { deep: true }
    )
    return {
      gaugeOptions
    }
  }
}
</script>
