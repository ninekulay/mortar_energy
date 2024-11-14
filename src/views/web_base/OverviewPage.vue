<template>
  <div>
      <QDashboard :width="sidebar.width">
      <template #sider>
          <QSidebar v-model:is-collapsed="sidebar.isCollapsed" :width="sidebar.width" :is-television="true" @check-request="handleTvMode"/>
      </template>
      <template #content>
        <div class="flex flex-col gap-4 px-4 py-2">
          <div class="grid grid-cols-[auto,auto,auto,auto,auto,auto] gap-4">
            <div class="col-span-2">
              <DisplayBox :data-source="mockupSensorValue.effeiciency.data" />
            </div>
            <div class="">
              <DisplayBox :data-source="mockupSensorValue.todayKwh.data" />
            </div>
            <div class="">
              <DisplayBox :data-source="mockupSensorValue.yesterdayKwh.data" />
            </div>
            <div class="ml-4">
              <DisplayBox :data-source="mockupSensorValue.date.data" />
            </div>
            <div class="">
              <DisplayBox :data-source="mockupSensorValue.time.data" />
            </div>
          </div>
          <div class="flex justify-start w-full px-4 py-4 gap-4">
            <div class="w-2/3 p-4 shadow-xl rounded-xl flex justify-start gap-2">
              <div class="w-5/6 flex flex-col">
                <h2 class="pb-4 pt-2">Historical Power Consumption</h2>
                <DChartBarLine :data-source="dataSourceDisplayChart2.data" />
              </div>
              <div class="w-1/6 px-2 flex flex-col gap-2 items-center h-full justify-center mx-2">
                <h2>Avg Energy Consumption</h2>
                <div class="flex justify-center gap-2">
                  <h2 class="font-semibold">12,342</h2>
                  <h2 class="font-semibold">kWh/month</h2>
                </div>
              </div>
            </div>
            <div class="w-1/3 p-4 shadow-xl rounded-xl flex flex-col">
              <h2 class="pb-4 pt-2">Today Power Consumption</h2>
              <DChartAreaSpline :data-source="dataSourceDisplayChart.areaSpline" />
            </div>
          </div>
          <div class="w-full bg-emerald-500 py-2 rounded-lg">
            <h2 class="text-white font-semibold text-2xl">Daily Power Consumption</h2>
          </div>
          <div class="px-4 py-2 shadow-xl rounded-xl">
            <DChartBarLine :data-source="dataSourceDisplayChart2.data" />
          </div>
        </div>
      </template>
      </QDashboard>
  </div>
</template>
          <!-- <span v-for="data in mockupSensorValue" :key="data">
            <DisplayBox :data-source="data" />
          </span> -->
<script>
import QDashboard from '@/layouts/dashboard/q-dashboard-default.vue'
import QSidebar from '@/components/bar/sidebar.vue'
import { reactive, watch, ref } from 'vue'
import { iconInfoCircle, robotPalletIcon } from '@/utils/helper-asset-icon.ts'
import { DChartBarLine, DChartAreaSpline, DisplayBox } from "@/components/export";
// eslint-disable-next-line no-unused-vars
import { getUserAuth } from '@/store/userManagement'

export default {
  name: 'OverviewPage',
  // eslint-disable-next-line vue/no-unused-components
  components: { QSidebar, QDashboard, DisplayBox, DChartBarLine, DChartAreaSpline },
  setup () {
    const sidebar = reactive({
      size: {
        collapsed: 80,
        normal: 240
      },
      width: 80,
      isCollapsed: true
    })

    const isTelevisionMode = ref(false)

    watch(() => sidebar.isCollapsed, () => {
      sidebar.width = sidebar.isCollapsed ? sidebar.size.collapsed : sidebar.size.normal
    })

    const dataSource = ref({})

    const mockupSensorValue = ref({
      effeiciency: {
        data: {
          header: {
            text: "24 Hr Efficiency",
            style:
              "text-lg text-white font-semibold bg-emerald-500 px-4 py-2 rounded-tl-xl rounded-tr-xl",
          },
          body: {
            text: "+30%",
            style:
              "text-lg font-normal shadow-xl rounded-bl-xl rounded-br-xl bg-white border border-gray-300 min-h-12 items-center align-middle flex justify-center",
          },
        }
      },
      todayKwh: {
        data: {
          header: {
            text: "Today (kWh)",
            style:
              "text-lg text-white font-semibold bg-amber-500 px-4 py-2 rounded-tl-xl rounded-tr-xl",
          },
          body: {
            text: "21,450",
            style:
              "text-lg font-normal shadow-xl rounded-bl-xl rounded-br-xl bg-white border border-gray-300 min-h-12 items-center align-middle flex justify-center",
          },
        }
      },
      yesterdayKwh: {
        data: {
          header: {
            text: "Yesterday (kWh)",
            style:
              "text-lg text-white font-semibold bg-emerald-500 px-4 py-2 rounded-tl-xl rounded-tr-xl",
          },
          body: {
            text: "16,500",
            style:
              "text-lg font-normal shadow-xl rounded-bl-xl rounded-br-xl bg-white border border-gray-300 min-h-12 items-center align-middle flex justify-center",
          },
        }
      },
      date: {
        data: {
          header: {
            text: "Date",
            style:
              "text-lg text-white font-semibold bg-amber-500 px-4 py-2 rounded-tl-xl rounded-tr-xl",
          },
          body: {
            text: "2024-11-13",
            style:
              "text-lg font-normal shadow-xl rounded-bl-xl rounded-br-xl bg-white border border-gray-300 min-h-12 items-center align-middle flex justify-center",
          },
        }
      },
      time: {
        data: {
          header: {
            text: "Time",
            style:
              "text-lg text-white font-semibold bg-emerald-500 px-4 py-2 rounded-tl-xl rounded-tr-xl",
          },
          body: {
            text: "10:00",
            style:
              "text-lg font-normal shadow-xl rounded-bl-xl rounded-br-xl bg-white border border-gray-300 min-h-12 items-center align-middle flex justify-center",
          },
        }
      },
    });
    const dataSourceDisplayChart2 = ref({
      data: {
        name: "",
        height: 300,
        data: {
          seriesA: {
            name: "Actual",
            data: [100, 120, 80, 90, 110, 130, 100],
          },
          seriesB: {
            name: "Average",
            data: [90, 100, 70, 80, 90, 110, 100],
          },
        },
        categories: [
          "2024-08-01",
          "2024-08-02",
          "2024-08-03",
          "2024-08-04",
          "2024-08-05",
          "2024-08-06",
          "2024-08-07",
        ],
        credits: false,
      },
    });
    const dataSourceDisplayChart = ref({
      areaSpline: {
        name: "",
        height: 300,
        data: {
          seriesA: {
            name: "Actual",
            data: [100, 120, 130, 140, 150, 160, 170],
          },
        },
        categories: [
          "2024-08-01",
          "2024-08-02",
          "2024-08-03",
          "2024-08-04",
          "2024-08-05",
          "2024-08-06",
          "2024-08-07",
        ],
        credits: false,
      },
    });
    return {
      sidebar,
      iconInfoCircle,
      robotPalletIcon,
      isTelevisionMode,
      dataSource,
      mockupSensorValue,
      dataSourceDisplayChart2,
      dataSourceDisplayChart
    }
  },
}
</script>
