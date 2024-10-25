<template>
  <chart class="width-100pc" :options="gaugeOptions" :updateArgs="[true, true]"/>
</template>
<script>
import { reactive, watch } from 'vue'
import { Chart } from 'highcharts-vue'
export default {
  name: 'C-Chart-Bar',
  components: {
    Chart
  },
  props: {
    dataSource: {},
    color: {
      default: () => ({ background: '#D1E7DD', font: '#198754' }),
      type: Object,
      required: false
    }
  },
  setup (props) {
    const gaugeOptions = reactive({
      chart: {
        type: 'column',
        reflow: true, // Ensures chart resizes with the container
        // width: 1200,
        backgroundColor: null // Makes the background transparent
      },
      title: {
        text: null
      },
      xAxis: {
        categories: [],
        lineWidth: 0,
        gridLineWidth: 0, // This will remove the x-axis grid lines
        title: {
          text: null // Removes the y-axis title
        },
        labels: {
          enabled: true, // Removes the y-axis labels
          style: {
            textOutline: 'none', // This adds a 1px stroke to the text. 'contrast' is a Highcharts keyword that applies a high-contrast outline.
            fontSize: '20px', // Set the font size
            fontWeight: '700', // Set the font weight
            color: '#262626' // Set the color
            // Add more styles as needed
          }
        }
      },
      yAxis: {
        min: 0,
        gridLineWidth: 0, // This will remove the x-axis grid lines
        title: {
          text: null // Removes the y-axis title
        },
        labels: {
          enabled: false // Removes the y-axis labels
        }
      },
      legend: {
        enabled: false // Removes the legend
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y} units</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        series: {
          // pointWidth: 100,
          maxPointWidth: 200
        },
        column: {
          // maxPointWidth: 800,
          groupPadding: 0, // Removes the padding between each category's columns or bars
          pointPadding: 0.04,
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            overflow: 'none', // Hide overflow
            crop: false // Allow the text to extend outside the column
          }
        }
      },
      series: [{
        name: 'Quantity',
        color: props.color.background,
        data: [], // Replace with your actual data
        dataLabels: {
          enabled: true,
          style: {
            textOutline: 'none', // This adds a 1px stroke to the text. 'contrast' is a Highcharts keyword that applies a high-contrast outline.
            fontSize: '24px', // Set the font size
            fontWeight: '700', // Set the font weight
            color: props.color.font // Set the color
            // Add more styles as needed
          }
        }
      }]
    })
    watch(
      () => props.dataSource,
      (newVolume) => {
        // Update gaugeOptions based on newVolume
        const series = gaugeOptions.series[0]
        gaugeOptions.xAxis.categories = []
        series.data = []
        setTimeout(() => {
          newVolume.forEach(element => {
            gaugeOptions.xAxis.categories.push(element.metric)
            series.data.push(element.value)
          })
        }, 300)
      }
    )
    return {
      gaugeOptions
    }
  }
}
</script>
