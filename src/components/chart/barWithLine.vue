<template>
    <chart class="width-100pc" :options="gaugeOptions" :updateArgs="[true, true]"/>
  </template>
  <style scoped lang="scss">

  </style>
<script>
import { Chart } from 'highcharts-vue'
import { reactive, watch } from 'vue'

export default {
  name: 'C-Chart-BarLine',
  components: { Chart },
  props: {
    dataSource: {}
  },
  setup (props) {
    const gaugeOptions = reactive({
      chart: {
        // zoomType: 'xy'
        height: props.dataSource.height || 400
      },
      title: {
        text: props.dataSource.name,
        align: 'center'
      },

      yAxis: { // Primary yAxis
        labels: {
          format: '{value}',
          style: {
            color: '#000000'
          }
        },
        title: {
          text: '',
          style: {
            color: '#808080'
          }
        }
      },

      xAxis: {
        categories: props.dataSource.categories
      },
      tooltip: {
        shared: true
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        enabled: true,
        // align: 'bottom',
        // // x: 80,
        // verticalAlign: 'top',
        // y: 0,
        // floating: true,
        backgroundColor: 'rgba(255,255,255,0.25)'
      },
      series: [{
        name: props.dataSource.data.seriesA.name,
        type: 'column',
        data: props.dataSource.data.seriesA.data,
        tooltip: {
          valueSuffix: ''
        },
        dataLabels: {
          enabled: false
        },
        color: '#08638C'
      }, {
        name: props.dataSource.data.seriesB.name,
        type: 'spline',
        data: props.dataSource.data.seriesB.data,
        color: '#6EC9F2',
        dataLabels: {
          enabled: false
        }
      }],
      credits: {
        enabled: props.dataSource.credits
      }
    })
    watch(
      () => props.dataSource,
      (newVolume) => {
        gaugeOptions.series[0].data = []
        gaugeOptions.series[1].data = []
        gaugeOptions.xAxis.categories = newVolume.categories
        gaugeOptions.series[0].data = newVolume.data.seriesA.data
        gaugeOptions.series[1].data = newVolume.data.seriesB.data
        gaugeOptions.series[0].name = newVolume.data.seriesA.name
        gaugeOptions.series[1].name = newVolume.data.seriesB.name
        gaugeOptions.title = newVolume.name || 'Data'
        if (newVolume && newVolume.credits !== undefined) {
          gaugeOptions.credits.enabled = newVolume.credits
        } else {
          gaugeOptions.credits.enabled = true // Default to true if dataMaster.credits is not provided or undefined
        }
        if (newVolume.dataLabels !== undefined) {
          gaugeOptions.series[0].dataLabels.enabled = newVolume.dataLabels
          gaugeOptions.series[1].dataLabels.enabled = newVolume.dataLabels
        }
        if (newVolume.height !== undefined) {
          gaugeOptions.chart.height = newVolume.height
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
