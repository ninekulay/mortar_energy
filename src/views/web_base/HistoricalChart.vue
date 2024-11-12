<template>
    <QDashboard :width="sidebar.width">
        <template #sider>
            <QSidebar v-model:is-collapsed="sidebar.isCollapsed" :width="sidebar.width" @check-request="handleTvMode"/>
        </template>
        <template #content>
            <div class="flex flex-col px-4 py-2 ml-2 gap-4">
                <h2 class="font-semibold text-left">Historical Data</h2>
                <div class="w-full flex flex-col gap-4 px-4 py-2">
                    <div class="flex justify-start gap-4 items-center pt-4">
                        <span>From</span>
                        <input type="date" v-model="dataSource.searchParams.time_from" class="border border-gray-300 rounded-md p-1"/>
                        <span>To</span>
                        <input type="date" v-model="dataSource.searchParams.time_to" class="border border-gray-300 rounded-md p-1"/>
                        <button class="bg-sky-500 text-white rounded-md px-4 py-2">Submit</button>
                    </div>
                </div>
                <div class="mt-4 flex flex-col gap-2 shadow-lg rounded-xl p-4">
                    <h2 class="text-left font-semibold pb-2 ml-4 text-gray-500">% OEE </h2>
                    <DChartBarLine :dataSource="dataSource.oeeValue"/>
                </div>
                <div class="mt-4 flex flex-col gap-2 shadow-lg rounded-xl p-4">
                    <h2 class="text-left font-semibold pb-2 ml-4 text-gray-500">Plan vs Actual <span class="text-sm">(pcs)</span></h2>
                    <DChartBarBasic :dataSource="dataSource.planActual"/>
                </div>
                <div class="mt-4 flex flex-col gap-2 shadow-lg rounded-xl p-4">
                    <h2 class="text-left font-semibold pb-2 ml-4 text-gray-500">Machine Status <span class="text-sm">(min.)</span></h2>
                    <DChartStackBar :dataSource="dataSource.operateTime"/>
                </div>
            </div>
        </template>
    </QDashboard>
</template>
<script>
import QDashboard from '@/layouts/dashboard/q-dashboard-default.vue'
import QSidebar from '@/components/bar/sidebar.vue'
import { reactive, ref, watch } from 'vue'
import { DChartBarLine, DChartBarBasic, DChartStackBar } from '@/components/export'
import { getDailyDataFromMachine } from '@/store/dailyDataLogs'

export default {
    name: 'HistoricalChart',
    components: {
        QDashboard,
        QSidebar,
        DChartBarLine,
        DChartBarBasic,
        DChartStackBar
    },
    setup () {
        const sidebar = reactive({
            size: {
                collapsed: 80,
                normal: 240
            },
            width: 80,
            isCollapsed: true
        })

        watch(() => sidebar.isCollapsed, () => {
            sidebar.width = sidebar.isCollapsed ? sidebar.size.collapsed : sidebar.size.normal
        })

        const now = new Date()
        // const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`
        const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`
        const Last7Days = new Date()
        Last7Days.setDate(Last7Days.getDate() - 7)
        const formattedLast7Days = `${Last7Days.getFullYear()}-${(Last7Days.getMonth() + 1).toString().padStart(2, '0')}-${Last7Days.getDate().toString().padStart(2, '0')}`

        const dataSource = ref({
            searchParams: {
                machine_name: 'ajinomoto-mc_1',
                line_name: 'ajinomoto_pathum',
                location: 'ajinomoto',
                time_from: formattedLast7Days,
                time_to: formattedDate
            },
            oeeValue: {
                name: '',
                height: 200,
                categories: ['2024-11-10', '2024-11-11', '2024-11-12'],
                data: {
                    seriesA: {
                        name: 'OEE',
                        data: [70, 72, 75]
                    },
                    seriesB: {
                        name: 'Standard',
                        data: [80, 80, 80]
                    },
                },
                dataLabels: true,
                credits: false,
            },
            planActual: {
                name: '',
                height: 200,
                categories: ['2024-11-10', '2024-11-11', '2024-11-12'],
                data: [
                    {
                        name: 'Actual',
                        data: [45321, 14000, 10000],
                        color: '#08638C'
                    },
                    {
                        name: 'Target',
                        data: [38779, 18000, 12900],
                        color: '#0EA5E9'
                    }
                ],
                dataLabels: true,
                credits: false,
            },
            operateTime: {
                name: '',
                height: 400,
                width: null,
                categories: ['2024-11-10', '2024-11-11', '2024-11-12'],
                data: [
                    {
                        name: 'RUN',
                        data: [387, 180, 120],
                        color: '#6BE895'
                    },
                    {
                        name: 'STOP',
                        data: [45, 140, 100],
                         color: '#F27E6E'
                    },
                    {
                        name: 'IDLE',
                        data: [453, 140, 100],
                        color: '#FFE178'
                    },
                    {
                        name: 'OFFLINE',
                        data: [453, 140, 100],
                        color: '#e0ded5'
                    }
                ],
                dataLabels: true,
                credits: false,
            }
        })
        const getOeeValue = async () => {
            const sendParams = {
                machine_name: dataSource.value.searchParams.machine_name,
                line_name: dataSource.value.searchParams.line_name,
                location: dataSource.value.searchParams.location,
                time_from: dataSource.value.searchParams.time_from,
                time_to: dataSource.value.searchParams.time_to
            }
            const result = await getDailyDataFromMachine(sendParams)
            if (result.length > 0) {
                const duplicateDate = []
                const standardOee = 80
                const minutePerDay = 1440
                const oeeData = {
                    categories: [],
                    standard: [],
                    actual: []
                }
                const planActual = {
                    categories: [],
                    actual: [],
                    target: []
                }

                const operateTime = {
                    categories: [],
                    run: [],
                    stop: [],
                    idle: [],
                    offline: []
                }
                result.forEach(item => {
                    const convertDate = new Date(item.created_at)
                    const formattedDate = `${convertDate.getFullYear()}-${(convertDate.getMonth() + 1).toString().padStart(2, '0')}-${convertDate.getDate().toString().padStart(2, '0')}`
                    if (!duplicateDate.includes(formattedDate)) {
                        duplicateDate.push(formattedDate)
                        oeeData.categories.push(formattedDate)

                        const oeeValue = parseFloat(item.daily_data.oee_value)
                        oeeData.actual.push(!isNaN(oeeValue) && oeeValue !== undefined ? parseFloat(oeeValue.toFixed(2)) : 0)
                        oeeData.standard.push(standardOee)

                        const actual = parseInt(item.daily_data.count_item)
                        const target = actual * 1.1
                        planActual.categories.push(formattedDate)
                        planActual.actual.push(actual)
                        planActual.target.push(target)

                        const run = convertSecondToMinute(parseInt(item.daily_data.run_time))
                        const stop = convertSecondToMinute(parseInt(item.daily_data.stop_time))
                        const idle = convertSecondToMinute(parseInt(item.daily_data.idle_time))

                        // const totalTime = item.daily_data.run_time + item.daily_data.stop_time + item.daily_data.idle_time
                        // const totalMin = convertSecondToMinute(totalTime)
                        // console.log('totalTime', totalTime, totalMin)

                        const offlineTime = minutePerDay - (run + stop + idle)
                        operateTime.categories.push(formattedDate)
                        operateTime.run.push(run)
                        operateTime.stop.push(stop)
                        operateTime.idle.push(idle)
                        operateTime.offline.push(parseFloat(offlineTime.toFixed(2)))
                    }
                })
                console.log(oeeData)
                dataSource.value.oeeValue.categories = [...oeeData.categories]
                dataSource.value.oeeValue.data.seriesA.data = [...oeeData.actual]
                dataSource.value.oeeValue.data.seriesB.data = [...oeeData.standard]

                dataSource.value.planActual.categories = [...planActual.categories]
                dataSource.value.planActual.data[0].data = [...planActual.actual]
                dataSource.value.planActual.data[1].data = [...planActual.target]

                dataSource.value.operateTime.categories = [...operateTime.categories]
                dataSource.value.operateTime.data[0].data = [...operateTime.run]
                dataSource.value.operateTime.data[1].data = [...operateTime.stop]
                dataSource.value.operateTime.data[2].data = [...operateTime.idle]
                dataSource.value.operateTime.data[3].data = [...operateTime.offline]
            }
        }
        const convertSecondToMinute = (seconds) => {
            // Calculate total minutes and remaining seconds
            let totalMinutes = Math.floor(seconds / 60);
            let remainingSeconds = seconds % 60;

            // Format as "MM.SS" with seconds as decimal part (2 decimal places)
            return parseFloat(`${totalMinutes}.${remainingSeconds.toFixed(2).padStart(2, '0')}`);
        };
        const initialFunction = async () => {
            await getOeeValue()
        }
        initialFunction()
        return {
            sidebar,
            dataSource
        }
    }
}
</script>