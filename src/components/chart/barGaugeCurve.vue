<template>
    <chart :options="gaugeOptions" :updateArgs="[true, true]"/>
  </template>
  <style scoped lang="scss">

  </style>
<script>
import { Chart } from 'highcharts-vue'
// eslint-disable-next-line no-unused-vars
import { reactive, watch } from 'vue'

export default {
  name: 'C-Chart-Bar-Curve',
  components: { Chart },
  props: {
    dataSource: {}
  },
  setup (props) {
    const gaugeOptions = reactive({
      chart: {
        type: 'bar',
        width: props.dataSource.chartWidth || 400,
        height: props.dataSource.chartHeight || 300
      },
      title: {
        text: '',
        align: 'left'
      },
      xAxis: {
        categories: ['', '', '', ''],
        title: {
          text: null
        },
        gridLineWidth: 0,
        lineWidth: 0
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        },
        gridLineWidth: 0,
        max: 100
      },
      tooltip: {
        valueSuffix: ' %'
      },
      plotOptions: {
        bar: {
          borderRadius: '100%',
          dataLabels: {
            enabled: false
          },
          groupPadding: 0.1,
          pointPadding: 0,
          borderWidth: 0
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        shadow: true,
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        name: '',
        color: '#E7F6FD',
        data: [
          { y: 100, dataLabels: { enabled: false } }, // First Plan Background
          { y: 100, dataLabels: { enabled: false } }, // Second Plan Background
          { y: 100, dataLabels: { enabled: false } }, // Second Plan Background
          { y: 100, dataLabels: { enabled: false } } // Second Plan Background
        ],
        pointPadding: 0,
        pointPlacement: -0.2,
        enableMouseTracking: false
      }, {
        name: 'Plan',
        color: '#6EC9F2',
        data: [
          { y: 90, dataLabels: { enabled: false } }, // First Plan Value
          { y: 85, dataLabels: { enabled: false } }, // Second Plan Value
          { y: 85, dataLabels: { enabled: false } }, // Second Plan Value
          { y: 85, dataLabels: { enabled: false } } // Second Plan Value
        ],
        pointPadding: 0,
        pointPlacement: 0.2
      }]
    })
    // watch(
    //   () => props.dataSource,
    //   (newVolume) => {
    //     // console.log(newVolume)
    //     gaugeOptions.series = []
    //     gaugeOptions.xAxis.categories = newVolume.categories
    //     gaugeOptions.series = newVolume.data
    //     gaugeOptions.title = newVolume.name || 'Data'
    //     if (newVolume && newVolume.credits !== undefined) {
    //       gaugeOptions.credits.enabled = newVolume.credits
    //     } else {
    //       gaugeOptions.credits.enabled = true // Default to true if dataMaster.credits is not provided or undefined
    //     }
    //   },
    //   { deep: true }
    // )
    return {
      gaugeOptions
    }
  }
}
</script>
