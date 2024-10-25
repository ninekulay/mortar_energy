<template>
  <chart class="width-100pc" :options="gaugeOptions" :updateArgs="[true, true]"/>
</template>
<style scoped lang="scss">

</style>
<script>
import { Chart } from 'highcharts-vue'
import { reactive, watch } from 'vue'

export default {
  name: 'C-Chart-Bar',
  components: { Chart },
  props: {
    dataSource: {},
    width: {
      type: String,
      default: null
    }
  },
  setup (props) {
    const gaugeOptions = reactive({
      chart: {
        type: 'column',
        width: props?.width || null
      },
      title: {
        text: props.dataSource.name,
        align: 'center',
        fontSize: props.dataSource?.fontSize || '16px'
      },

      yAxis: {
        title: {
          text: null
        }
      },

      xAxis: {
        categories: props.dataSource.categories,
        labels: {
          style: {
            fontSize: props.dataSource?.fontSize || '12px' // Adjust X axis label font size
          }
        }
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        enabled: true
      },

      plotOptions: {
        column: {
          dataLabels: {
            enabled: props.dataSource.datalabels || false
          }
        },
        series: {
          label: {
            connectorAllowed: false
          }
          // pointStart: 2010
        }
      },

      series: props.dataSource.data,
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
        enabled: props.dataSource.credits
      }
    })
    watch(
      () => props.dataSource,
      (newVolume) => {
        gaugeOptions.series = []
        gaugeOptions.xAxis.categories = newVolume.categories
        gaugeOptions.series = newVolume.data
        gaugeOptions.title = newVolume.name || 'Data'
        if (newVolume && newVolume.credits !== undefined) {
          gaugeOptions.credits.enabled = newVolume.credits
        } else {
          gaugeOptions.credits.enabled = true // Default to true if dataMaster.credits is not provided or undefined
        }

        if (newVolume.datalabels !== undefined) {
          gaugeOptions.plotOptions.column.dataLabels.enabled = newVolume.datalabels
          gaugeOptions.legend.layout = newVolume?.legend?.layout || 'horizontal'
          gaugeOptions.legend.align = newVolume?.legend?.align || 'center'
          gaugeOptions.legend.verticalAlign = newVolume?.legend?.verticalAlign || 'bottom'
        }
        if (newVolume?.legend !== undefined && newVolume?.legend?.enabled !== undefined) {
          gaugeOptions.legend.enabled = newVolume.legend?.enabled
        }
        if (newVolume?.xAxis?.visible !== undefined) {
          gaugeOptions.xAxis.visible = newVolume.xAxis.visible
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
