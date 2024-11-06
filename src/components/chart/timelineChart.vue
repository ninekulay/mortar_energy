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
    // const parseDateToUTC = (dateStr) => {
    //   const [datePart, timePart] = dateStr.split(' ');
    //   const [year, month, day] = datePart.split('-').map(Number);
    //   const [hours, minutes, seconds] = timePart.split(':').map(Number);

    //   return Date.UTC(year, month - 1, day, hours, minutes, seconds); 
    // }
    // const utcDate = parseDateToUTC('2024-09-19 10:00:00')
    const gaugeOptions = reactive({
      chart: {
        type: 'xrange',
        width: props?.width || null,
        borderRadius: 8,
        spacing: [0, 0, 0, 0],
        zoomType: 'x',
        panning: {
          enabled: true,
          type: 'x',
        },
        resetZoomButton: {
          position: {
            align: 'right',
            verticalAlign: 'top',
            x: -10,
            y: 10,
          },
          useHTML: true, 
          theme: {
            // Using Tailwind CSS colors
            fill: '#58c3fb', // equivalent to '#f7f7f7' in Tailwind
            borderRadius: 10,
            stroke: 'border-gray-300', // equivalent to 'silver'
            r: 10,
            style: {
              color: 'white', // equivalent to '#333'
            },
            states: {
              hover: {
                fill: '#1da5ec', // equivalent to '#e6e6e6'
                // style: {
                //   color: 'text-gray-800', // equivalent to '#333'
                // },
              },
            },
          },
        },
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
        if (newVolume?.data) {
          gaugeOptions.series[0].data = newVolume.data
        }
      },
      { deep: true }
    )
    return {
      gaugeOptions
    }
  }
}
</script>
