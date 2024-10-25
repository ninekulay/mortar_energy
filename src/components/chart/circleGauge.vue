<template>
    <chart :options="gaugeOptions" :updateArgs="[true, true]" :style="`width: ${dataSource?.chartWidth ? dataSource.chartWidth + 'px' : '100%'}; height: ${dataSource?.chartHeight ? dataSource.chartHeight + 'px' : '100%'}`"></chart>

  </template>
<script>
// eslint-disable-next-line no-unused-vars
import { reactive, watch } from 'vue'
import { Chart } from 'highcharts-vue'
export default {
  name: 'C-Chart-CircleGauge',
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
        height: '100%',
        backgroundColor: 'transparent'
      },
      title: {
        text: null,
        style: {
          fontSize: props.dataSource.fontSize
        }
      },
      pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{ // Track for Conversion
          outerRadius: '110%',
          innerRadius: '85%',
          backgroundColor: '#d4effa',
          borderWidth: 0
        }]
      },
      yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: []
      },
      tooltip: {
        enabled: false,
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        style: {
          fontSize: props.dataSource.fontSize
        },
        valueSuffix: '%',
        pointFormat: '{series.name}<br>' +
            '<span style="font-size: 2em; color: {point.color}; ' +
            'font-weight: bold">{point.y}</span>',
        positioner: function (labelWidth) {
          return {
            x: (this.chart.chartWidth - labelWidth) / 2,
            y: (this.chart.plotHeight / 2) + 15
          }
        }
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            enabled: false
          },
          linecap: 'round',
          stickyTracking: false,
          rounded: true
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: props.dataSource.title,
        data: props.dataSource.data
      }]
    })
    return {
      gaugeOptions
    }
  }
}
</script>
