<template>
  <chart :options="gaugeOptions" :updateArgs="[true, true]"></chart>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { reactive, watch } from 'vue'
import { Chart } from 'highcharts-vue'
export default {
  name: 'C-Chart-Gauge',
  components: {
    Chart
  },
  props: {
    dataSource: {
      default: () => 0,
      type: Number,
      required: true
    }
  },
  setup (props) {
    const gaugeOptions = reactive({
      chart: {
        type: 'solidgauge',
        height: 160,
        backgroundColor: 'transparent' // Set the background color to transparent
      },
      title: null,
      pane: {
        center: ['50%', '100%'],
        size: '240',
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor: '#FFFFFF',
          //   Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc'
        }
      },
      exporting: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      // the value axis
      yAxis: {
        min: 0,
        max: 100,
        stops: [
          [0, '#DC3545'], // Red
          [0.249, '#DC3545'], // Red
          [0.250, '#FFC107'], // Yellow - Starts earlier, less linear
          [0.500, '#FFC107'], // Yellow
          [0.501, '#198754'], // Green - Starts earlier, less linear
          [1, '#198754'] // Green
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
          // text: 'Speed',
          y: -70
        },
        labels: {
          y: 16,
          formatter: function () {
            // Check the value and return an empty string for 0 and 100, else return the default value
            if (this.value === 0 || this.value === 100) {
              return ''
            }
            return this.value
          }
        }
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Speed',
        data: [props.dataSource],
        dataLabels: {
          useHTML: true,
          formatter: () => {
            let color
            if (props.dataSource <= 50) {
              color = '#DC3545' // Red
            } else if (props.dataSource <= 80) {
              color = '#FFC107' // Yellow
            } else {
              color = '#198754' // Green
            }
            return '<div style="text-align:center; position: absolute; left: -45px; top:-45px;"><h3 style="font-size:28px;color: ' + color + '">' + props.dataSource.toFixed(2) + '%</h3></div>'
          }
          // format:
          //   '<div style="text-align:center; position: absolute; top: -50px; left: -15px;">' +
          //   '<h3 class="color-font-blue-500">{y}%</h3>' +
          //   // '<span style="font-size:12px;opacity:0.4">km/h</span>' +
          //   '</div>'
        }
        // tooltip: {
        //   valueSuffix: ' km/h'
        // }
      }]
    })
    return {
      gaugeOptions
    }
  }
}
</script>
