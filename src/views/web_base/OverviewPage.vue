<template>
  <div>
      <QDashboard :width="sidebar.width">
      <template #sider>
          <QSidebar v-model:is-collapsed="sidebar.isCollapsed" :width="sidebar.width" :is-television="true" @check-request="handleTvMode"/>
      </template>
      <template #content>
          <div class="flex flex-col justify-center overscroll-x-auto"></div>
          <div class="flex justify-center gap-4 w-full min-h-60 px-4 sm:flex-col lg:flex-row" :style="`${userScreenType === 'tablet' ? 'height: fit-content;' : 'height: calc(100vh - 15vh);'}`">
            <div class="sm:w-full lg:w-1/2 flex flex-col h-full relative bg-white my-2 shadow-xl rounded-xl border border-gray-100" :style="`${userScreenType !== 'tablet' ? 'min-height: 710px;': ''}`">
              <div class="h-full relative flex items-center justify-center">
                <!-- Image Container -->
                <div class="relative" :style="userScreenType === 'tablet' ? 'max-width: 500px; max-height: 500px;' : ''">
                  <img :src="robotPalletIcon" class="object-cover w-full" alt="robot pallet">
                  
                  <!-- Button 1 - positioned relative to image -->
                  <button class="absolute" style="top: 42%; left: 2%;" @click="changeStateCard('position1')">
                    <img :src="iconSearch" class="object-cover" alt="search"/>
                  </button>

                  <!-- Button 2 - positioned relative to image -->
                  <button class="absolute" style="top: 15%; right: 2%;" @click="changeStateCard('position2')">
                    <img :src="iconSearch" class="object-cover" alt="search"/>
                  </button>
                </div>
              </div>

              <div class="bg-gray-300 min-h-20 p-4 rounded-md flex flex-col gap-2 absolute shadow-lg top-60" v-if="displayCard.position1">
                <div class="flex justify-between gap-4 items-center">
                  <div class="flex justify-start gap-4 items-center">
                    <div class="bg-green-400 rounded-full h-4 w-4 border border-black"></div>
                    <h2 class="text-black font-semibold">Industrial Robot 101</h2>
                  </div>
                  <h2 class="text-black font-semibold border border-black rounded-full px-2 py-1 cursor-pointer bg-gray-100" @click="() => displayCard.position1 = false">X</h2>
                </div>
                <div class="bg-white h-full rounded-lg flex flex-col gap-2 py-2">
                  <h2>State : Berserk</h2>
                  <h2>Position : </h2>
                  <div class="flex justify-center gap-4">
                    <h2>X : 99</h2>
                    <h2>Y : 99</h2>
                    <h2>Z : 99</h2>
                  </div>
                </div>
              </div>

              <div class="bg-gray-300 min-h-20 p-4 rounded-md flex flex-col gap-2 absolute shadow-lg right-0 top-24" v-if="displayCard.position2">
                <div class="flex justify-between gap-4 items-center">
                  <div class="flex justify-start gap-4 items-center">
                    <div class="bg-green-400 rounded-full h-4 w-4 border border-black"></div>
                    <h2 class="text-black font-semibold">Storage</h2>
                  </div>
                  <h2 class="text-black font-semibold border border-black rounded-full px-2 py-1 cursor-pointer bg-gray-100" @click="() => displayCard.position2 = false">X</h2>
                </div>
                <div class="bg-white h-full rounded-lg flex flex-col gap-2 min-h-12 items-center justify-center">
                  <h2 class="px-4">Package count : 9,999</h2>
                </div>
              </div>
            </div>
            <div class="sm:w-full lg:w-1/2 flex flex-col h-full gap-4 my-2">
              <div class="w-full min-h-20 bg-white flex flex-col shadow-xl rounded-xl border border-gray-100" style="height: calc(100%); min-height: 230px;">
                <div class=" w-full flex justify-start items-center gap-2">
                  <h2 class="font-semibold bg-gray-300  px-2 py-1 mt-2 ml-2 rounded-md">OEE</h2>
                  <label class="text-gray-500 py-2 mt-2 text-sm">(08.00 - 07.59)</label>
                </div>
                <div class="w-full h-full flex justify-center" v-show="userScreenType !== 'tablet2'">
                  <div class="w-full flex flex-col justify-center m-0 p-0 relative items-center">
                    <d-chart-circle-gauge :data-source="dataSource.oeeValue"/>
                    <label 
                        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -100%); width: 100px;" 
                        class="text-black text-xl font-normal">
                        <span class="text-gray-500 sm:text-xs lg:text-md">99.99%</span>
                    </label>
                    <label class="font-semibold sm:text-sm lg:text-md">
                      Overall
                    </label>
                  </div>
                  <div class="w-full flex flex-col justify-center m-0 p-0 relative items-center">
                    <d-chart-circle-gauge :data-source="dataSource.aValue"/>
                    <label 
                        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -100%); width: 100px;" 
                        class="text-black text-xl font-normal">
                        <span class="text-gray-500 sm:text-xs lg:text-md">99.99%</span>
                    </label>
                    <label class="font-semibold sm:text-sm lg:text-md">
                      Avaliability
                    </label>
                  </div>
                  <div class="w-full flex flex-col justify-center m-0 p-0 relative items-center">
                    <d-chart-circle-gauge :data-source="dataSource.pValue"/>
                    <label 
                        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -100%); width: 100px;" 
                        class="text-black text-xl font-normal">
                        <span class="text-gray-500 sm:text-xs lg:text-md">99.99%</span>
                    </label>
                    <label class="font-semibold sm:text-sm lg:text-md">
                      Performance
                    </label>
                  </div>
                  <div class="w-full flex flex-col justify-center m-0 p-0 relative items-center">
                    <d-chart-circle-gauge :data-source="dataSource.qValue"/>
                    <label 
                        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -100%); width: 100px;" 
                        class="text-black text-xl font-normal">
                        <span class="text-gray-500 sm:text-xs lg:text-md">99.99%</span>
                    </label>
                    <label class="font-semibold sm:text-sm lg:text-md">
                      Quality
                    </label>
                  </div>
                </div>

                <div class="w-full h-full flex justify-center" v-show="userScreenType === 'tablet2'">
                  <div class="w-full flex flex-col justify-center">
                    <div class="flex justify-between items-center">
                      <div class="w-full flex flex-col justify-center m-0 p-0 relative items-center">
                        <d-chart-circle-gauge :data-source="dataSource.oeeValue"/>
                        <label 
                            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -100%); width: 100px;" 
                            class="text-black text-xl font-normal">
                            <span class="text-gray-500 sm:text-xs lg:text-md">99.99%</span>
                        </label>
                        <label class="font-semibold sm:text-sm lg:text-md">
                          Overall
                        </label>
                      </div>
                      <div class="w-full flex flex-col justify-center m-0 p-0 relative items-center">
                        <d-chart-circle-gauge :data-source="dataSource.aValue"/>
                        <label 
                            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -100%); width: 100px;" 
                            class="text-black text-xl font-normal">
                            <span class="text-gray-500 sm:text-xs lg:text-md">99.99%</span>
                        </label>
                        <label class="font-semibold sm:text-sm lg:text-md">
                          Avaliability
                        </label>
                      </div>
                    </div>
                    <div class="flex justify-between items-center">
                      <div class="w-full flex flex-col justify-center m-0 p-0 relative items-center">
                        <d-chart-circle-gauge :data-source="dataSource.pValue"/>
                        <label 
                            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -100%); width: 100px;" 
                            class="text-black text-xl font-normal">
                            <span class="text-gray-500 sm:text-xs lg:text-md">99.99%</span>
                        </label>
                        <label class="font-semibold sm:text-sm lg:text-md">
                          Performance
                        </label>
                      </div>
                      <div class="w-full flex flex-col justify-center m-0 p-0 relative items-center">
                        <d-chart-circle-gauge :data-source="dataSource.qValue"/>
                        <label 
                            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -100%); width: 100px;" 
                            class="text-black text-xl font-normal">
                            <span class="text-gray-500 sm:text-xs lg:text-md">99.99%</span>
                        </label>
                        <label class="font-semibold sm:text-sm lg:text-md">
                          Quality
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="w-full min-h-20 bg-white flex flex-col shadow-xl rounded-xl border border-gray-100 gap-4" style="height: calc(75%); min-height: 230px;">
                <div class="w-full flex justify-start items-center gap-2">
                  <h2 class="font-semibold px-2 py-2 bg-gray-300 mt-2 ml-2 rounded-md">Utilization</h2>
                  <label class="text-gray-500 py-2 mt-2 text-sm">(08.00 - 07.59)</label>
                </div>
                <div class="w-full px-4 flex justify-center" style="margin-top: -15px;">
                    <d-chart-donut :data-source="dataSource.utilizationValue" style="height: 150px;"/>
                </div>
              </div>
              <div class="w-full min-h-20 bg-white shadow-xl rounded-xl border border-gray-100" style="height: calc(75%); min-height: 220px;">
                <div class="w-full flex justify-start items-center gap-2">
                  <h2 class="font-semibold px-2 py-2 bg-gray-300 mt-2 ml-2 rounded-md">Timeline</h2>
                  <label class="text-gray-500 py-2 mt-2 text-sm">(08.00 - 07.59)</label>
                </div>
                <div class="w-full px-4">
                  <d-chart-timeline :data-source="dataSource.timelineValue" style="height: 150px;"/>
                </div>
              </div>
            </div>
          </div>
      </template>
      </QDashboard>
  </div>
</template>

<script>
import QDashboard from '@/layouts/dashboard/q-dashboard-default.vue'
import QSidebar from '@/components/bar/sidebar.vue'
import { reactive, watch, ref } from 'vue'
import { iconSearch, robotPalletIcon } from '@/utils/helper-asset-icon.ts'
import { DChartCircleGauge, DChartDonut, DChartTimeline } from '@/components/export'

export default {
  name: 'OverviewPage',
  components: { QSidebar, QDashboard, DChartCircleGauge, DChartDonut, DChartTimeline },
  setup () {
    const sidebar = reactive({
      size: {
        collapsed: 80,
        normal: 240
      },
      width: 80,
      isCollapsed: true
    })

    const userScreenType = ref('desktop')

    const displayCard = reactive({
      position1: false,
      position2: false
    })

    const isTelevisionMode = ref(false)

    watch(() => sidebar.isCollapsed, () => {
      sidebar.width = sidebar.isCollapsed ? sidebar.size.collapsed : sidebar.size.normal
    })

    const dataSource = reactive({
      oeeValue: {
        title: '',
        fontSize: '16px',
        chartWidth: '150',
        chartHeight: '150',
        data: [{
          color: '#0EA5E9',
          radius: '110%',
          innerRadius: '85%',
          y: 90
        }]
      },
      aValue: {
        title: '',
        fontSize: '16px',
        chartWidth: '150',
        chartHeight: '150',
        data: [{
          color: '#4fb891',
          radius: '110%',
          innerRadius: '85%',
          y: 90
        }]
      },
      pValue: {
        title: '',
        fontSize: '16px',
        chartWidth: '150',
        chartHeight: '150',
        data: [{
          color: '#f8d363',
          radius: '110%',
          innerRadius: '85%',
          y: 90
        }]
      },
      qValue: {
        title: '',
        fontSize: '16px',
        chartWidth: '150',
        chartHeight: '150',
        data: [{
          color: '#db8132',
          radius: '110%',
          innerRadius: '85%',
          y: 90
        }]
      },
      utilizationValue: {
        name: 'Production',
        data: [
          { name: 'Uptime', y: 80, color: '#6BE895' },
          { name: 'Downtime', y: 15, color: '#F27E6E' },
          { name: 'Idle', y: 5, color: '#FFE178' }
        ],
        unit: 'Production',
        width: 350,
        chartSize: 150,
        credits: false,
        legend: {
          textSize: 14,
        }
      },
      timelineValue: {
        name: '',
        data: []
      }
    })

    const parseDateToUTC = (dateStr) => {
      const [datePart, timePart] = dateStr.split(' ');
      const [year, month, day] = datePart.split('-').map(Number);
      const [hours, minutes, seconds] = timePart.split(':').map(Number);

      return Date.UTC(year, month - 1, day, hours, minutes, seconds); 
    }

    const generateMockData = () => {
      let lastValue = ''
      const data = [];
      const startDate = new Date(Date.UTC(2024, 9, 19, 2, 0)); // Start from 00:00
      const endDate = new Date(Date.UTC(2024, 9, 20, 22, 0)); // Up to 22:00
      const totalEntries = 5; // Total number of data objects

      for (let i = 0; i < totalEntries; i++) {
        const randomStartHour = Math.floor(Math.random() * 2); // Random hour from 0 to 21
        const randomStartMinute = Math.floor(Math.random() * 60); // Random minute from 0 to 59
        const startTime = new Date(startDate);
        startTime.setHours(randomStartHour);
        startTime.setMinutes(randomStartMinute);

        // Generate a random duration between 30 minutes and 1.5 hours
        const durationInMinutes = Math.floor(Math.random() * (90 - 30 + 1)) + 30; // Random duration from 30 to 90 minutes
        const endTime = new Date(startTime);
        endTime.setMinutes(startTime.getMinutes() + durationInMinutes);

        // Ensure the end time does not exceed 22:00
        if (endTime > endDate) {
            continue; // Skip this entry if it exceeds the allowed time
        }

        // Determine the color and label based on random choice
        let isRunning = Math.random() > 0.5; // 50% chance to be "RUNNING" or "STOP"
        if (lastValue === 'RUNNING') {
          isRunning = false
        }
        const color = isRunning ? '#6BE895' : '#F27E6E';
        const label = isRunning ? 'RUNNING' : 'STOP';
        lastValue = label

        data.push({
            x: startTime.getTime(), // Start time (timestamp)
            x2: endTime.getTime(), // Stop time (timestamp)
            y: 0, // Y-axis category (Status)
            color: color, // Color for this state
            label: label // State label
        });
      }

      return data;
    }

    const mockData = generateMockData();
    console.log('mockData', mockData);
    dataSource.timelineValue.data = mockData;
    const checkScreenSize = () => {
      const screenWidth = window.innerWidth // Get the current screen width

      // Check screen width and apply the conditions
      if (screenWidth <= 768) {
        dataSource.oeeValue.chartWidth = '100'
        dataSource.oeeValue.chartHeight = '100'
        dataSource.aValue.chartWidth = '100'
        dataSource.aValue.chartHeight = '100'
        dataSource.pValue.chartWidth = '100'
        dataSource.pValue.chartHeight = '100'
        dataSource.qValue.chartWidth = '100'
        dataSource.qValue.chartHeight = '100'
        dataSource.utilizationValue.chartSize = 120
        dataSource.utilizationValue.legend.textSize = 10
        userScreenType.value = 'tablet'
      } else if (screenWidth <= 1024) {
        dataSource.oeeValue.chartWidth = '100'
        dataSource.oeeValue.chartHeight = '100'
        dataSource.aValue.chartWidth = '100'
        dataSource.aValue.chartHeight = '100'
        dataSource.pValue.chartWidth = '100'
        dataSource.pValue.chartHeight = '100'
        dataSource.qValue.chartWidth = '100'
        dataSource.qValue.chartHeight = '100'
        dataSource.utilizationValue.chartSize = 100
        dataSource.utilizationValue.legend.textSize = 12
        userScreenType.value = 'labtop'
      } else {
        dataSource.oeeValue.chartWidth = '150'
        dataSource.oeeValue.chartHeight = '150'
        dataSource.aValue.chartWidth = '150'
        dataSource.aValue.chartHeight = '150'
        dataSource.pValue.chartWidth = '150'
        dataSource.pValue.chartHeight = '150'
        dataSource.qValue.chartWidth = '150'
        dataSource.qValue.chartHeight = '150'
        dataSource.utilizationValue.chartSize = 150
        dataSource.utilizationValue.legend.textSize = 14
        userScreenType.value = 'desktop'
      }
    }
    checkScreenSize()
    return {
      sidebar,
      iconSearch,
      robotPalletIcon,
      displayCard,
      isTelevisionMode,
      dataSource,
      parseDateToUTC,
      userScreenType
    }
  },
  // computed: {
  //   computedWidth () {
  //     const screenWidth = window.innerWidth // Get the current screen width
  //     const maxWidth = 150 // Set the maximum width

  //     // Check screen width and apply the conditions
  //     if (screenWidth <= 1024) {
  //       return `${maxWidth}px` // Set to 200px if width > 200
  //     }
  //     return '325px' // Otherwise, return the original width
  //   }
  // },
  methods: {
    changeStateCard (position) {
      this.displayCard[position] = !this.displayCard[position]
    },
    handleTvMode () {
      this.isTelevisionMode = !this.isTelevisionMode
      if (this.isTelevisionMode) {
        this.sidebar.isCollapsed = true
      }
    }
  }
}
</script>
