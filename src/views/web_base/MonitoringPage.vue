<template>
    <QDashboard :width="sidebar.width">
        <template #sider>
            <QSidebar v-model:is-collapsed="sidebar.isCollapsed" :width="sidebar.width"/>
        </template>
        <template #content>
            <div class="flex flex-col px-4 py-2 ml-2 gap-4">
                <div class="w-full">
                    <h2 class="text-2xl font-semibold text-left">Monitoring</h2>
                </div>
                <div class="w-full flex justify-start gap-2 items-center px-4">
                   <label class="text-gray-500 font-semibold">Select Zone :</label>
                   <select class="w-1/3 border border-gray-300 rounded-md p-2">
                       <option value="1">Zone 1</option>
                       <option value="2">Zone 2</option>
                       <option value="3">Zone 3</option>
                     </select>
                </div>
                <div class="w-full grid grid-cols-[100px,auto] min-h-32 gap-6">
                    <div class="bg-slate-300 flex justify-center items-center">
                        <h2 class="font-semibold">kWh</h2>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="grid grid-cols-[auto,auto,auto,auto,auto,auto] gap-4">
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.todayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.yesterdayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.effeiciency.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.yesterdayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.effeiciency.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.effeiciency.data" />
                            </div>
                        </div>
                        <div class="grid grid-cols-[auto,auto,auto,auto,auto,auto] gap-4">
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.todayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.yesterdayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.effeiciency.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.todayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.yesterdayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.effeiciency.data" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full grid grid-cols-[100px,auto] min-h-32 gap-6">
                    <div class="bg-slate-300 flex justify-center items-center">
                        <h2 class="font-semibold">kWh</h2>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="grid grid-cols-[auto,auto,auto,auto,auto,auto] gap-4">
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.todayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.yesterdayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.effeiciency.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.yesterdayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.effeiciency.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.effeiciency.data" />
                            </div>
                        </div>
                        <div class="grid grid-cols-[auto,auto,auto,auto,auto,auto] gap-4">
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.todayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.yesterdayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.effeiciency.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.todayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.yesterdayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.effeiciency.data" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full grid grid-cols-[100px,auto] min-h-32 gap-6">
                    <div class="bg-slate-300 flex justify-center items-center">
                        <h2 class="font-semibold">kWh</h2>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="grid grid-cols-[auto,auto,auto,auto,auto,auto] gap-4">
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.todayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.yesterdayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.effeiciency.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.yesterdayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.effeiciency.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.effeiciency.data" />
                            </div>
                        </div>
                        <div class="grid grid-cols-[auto,auto,auto,auto,auto,auto] gap-4">
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.todayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.yesterdayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.effeiciency.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.todayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.yesterdayKwh.data" />
                            </div>
                            <div class="div-display-box">
                                <DisplayBox :data-source="mockupSensorValue.effeiciency.data" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </QDashboard>
</template>
<script>
import QDashboard from '@/layouts/dashboard/q-dashboard-default.vue'
import QSidebar from '@/components/bar/sidebar.vue'
import { DisplayBox } from "@/components/export";
import { reactive, ref, watch } from 'vue'

export default {
    name: 'MonitoringPage',
    components: {
        QDashboard,
        QSidebar,
        DisplayBox
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
        return {
            sidebar,
            dataSource,
            mockupSensorValue
        }
    }
}
</script>
<style scoped>
.div-display-box {
    width: 180px;
}
</style>