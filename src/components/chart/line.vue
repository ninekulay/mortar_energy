<template>
  <chart class="width-100pc" :options="gaugeOptions" :updateArgs="[true, true]"/>
</template>
<script>
import { Chart } from 'highcharts-vue'
import { reactive, watch } from 'vue'

export default {
  name: 'C-Chart-Line',
  components: { Chart },
  props: {
    dataSource: {},
    width: {
      type: String,
      default: '100%'
    }
  },
  setup (props) {
    const gaugeOptions = reactive({
      chart: {
        width: props?.width || null
      },
      title: {
        text: null,
        align: 'left'
      },

      yAxis: {
        title: {
          text: null
        }
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>',
        valueDecimals: 2
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
        series: {
          label: {
            connectorAllowed: false
          }
          // pointStart: 2010
        }
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
      }
    })
    watch(
      () => props.dataSource,
      (newVolume) => {
        // Update gaugeOptions based on newVolume
        // gaugeOptions.series[0].data = [newVolume]
        gaugeOptions.series = []
        gaugeOptions.xAxis.categories = []

        gaugeOptions.credits = {
          enabled: newVolume.credits
        }
        gaugeOptions.title.text = newVolume.name !== undefined ? newVolume.name : '-'
        let insertTime = false
        for (const [key] of Object.entries(newVolume)) {
          const newArray = []
          try {
            newVolume[key].forEach(element => {
              newArray.push(parseFloat(element.value.toFixed(2)))
              if (insertTime === false) {
                const dateMoth = element.date.split(' ')[0].split('-')
                const timeHour = element.date.split(' ')[1].split(':')
                const timeDisplay = `${dateMoth[1]}/${dateMoth[2]} ${timeHour[0]}:${timeHour[1]}`
                gaugeOptions.xAxis.categories.push(timeDisplay)
              }
            })
            insertTime = true
            const newObj = {
              name: key,
              data: newArray
            }
            gaugeOptions.series.push(newObj)
          } catch {
            gaugeOptions.series = [...newVolume.series]
            gaugeOptions.xAxis.categories = newVolume.categories
          }
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
