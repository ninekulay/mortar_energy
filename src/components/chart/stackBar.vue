<template>
    <chart class="width-100pc" :options="gaugeOptions" :width="width" :updateArgs="[true, true]"/>
  </template>
  <style scoped lang="scss">

  </style>
<script>
import { Chart } from 'highcharts-vue'
import { reactive, watch } from 'vue'

export default {
  name: 'C-Chart-StackBar',
  components: { Chart },
  props: {
    dataSource: {},
    width: {
      type: String,
      default: '600'
    }
  },
  setup (props) {
    const gaugeOptions = reactive({
      chart: {
        type: 'column',
        width: props.width || null,
        height: null
      },
      title: {
        text: null,
        align: 'center'
      },

      yAxis: {
        min: 0,
        title: {
          text: 'Count'
        },
        stackLabels: {
          enabled: true
        }
      },

      xAxis: {
        categories: []
      },

      legend: {
        // layout: 'vertical',
        // align: 'right',
        // verticalAlign: 'middle'
      },

      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: true
          }
        }
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
      },
      series: [],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      },
      credits: {
        enabled: false
      }
    })
    watch(
      () => props.dataSource,
      (newVolume) => {
        gaugeOptions.title.text = newVolume.title
        gaugeOptions.series = []
        gaugeOptions.series = newVolume.data
        gaugeOptions.xAxis.categories = []
        gaugeOptions.xAxis.categories = newVolume.categories
        gaugeOptions.credits.enabled = newVolume.credits
        gaugeOptions.yAxis.stackLabels.enabled = newVolume.stackLabels
        gaugeOptions.plotOptions.column.dataLabels.enabled = newVolume.dataLabels

        gaugeOptions.chart.width = props.width || null
        gaugeOptions.chart.height = props.height || null
      },
      { deep: true }
    )
    return {
      gaugeOptions
    }
  }
}
</script>
