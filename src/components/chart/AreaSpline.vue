<template>
  <chart
    class="width-100pc"
    :options="gaugeOptions"
    :updateArgs="[true, true]"
  />
</template>
<style scoped lang="scss"></style>
<script>
import { Chart } from "highcharts-vue";
import { reactive, watch } from "vue";

export default {
  name: "QChartAreaSpline",
  components: { Chart },
  props: {
    dataSource: {},
  },
  setup(props) {
    const gaugeOptions = reactive({
        chart: {
          // zoomType: 'xy'
          height: props.dataSource.height || 400,
        },
      title: {
        text: props.dataSource.name,
        align: "center",
      },

      yAxis: {
        // Primary yAxis
        labels: {
          format: "{value}",
          style: {
            color: "#000000",
          },
        },
        title: {
          text: "",
          style: {
            color: "#808080",
          },
        },
      },

      xAxis: {
        categories: props.dataSource.categories,
      },
      tooltip: {
        shared: true,
      },

      legend: {
        align: "right",
        // x: 80,
        verticalAlign: "right",
        // y: 60,
        // floating: true,
        backgroundColor: "rgba(255,255,255,0.25)",
        enabled: props.dataSource?.legend?.enabled || false,
      },
      series: [
        {
          name: props.dataSource.data.seriesA.name,
          type: "area",
          data: props.dataSource.data.seriesA.data,
          tooltip: {
            valueSuffix: "",
          },
          color: "#eb8f34",
        },
      ],
      credits: {
        enabled: props.dataSource.credits,
      },
    });
    watch(
      () => props.dataSource,
      (newVolume) => {
        gaugeOptions.series[0].data = [];
        gaugeOptions.series[1].data = [];
        gaugeOptions.xAxis.categories = newVolume.categories;
        gaugeOptions.series[0].data = newVolume.data.seriesA.data;
        gaugeOptions.series[0].name = newVolume.data.seriesA.name;
        gaugeOptions.title = newVolume.name || "Data";
        if (newVolume && newVolume.credits !== undefined) {
          gaugeOptions.credits.enabled = newVolume.credits;
        } else {
          gaugeOptions.credits.enabled = true; // Default to true if dataMaster.credits is not provided or undefined
        }
      },
      { deep: true }
    );
    return {
      gaugeOptions,
    };
  },
};
</script>
