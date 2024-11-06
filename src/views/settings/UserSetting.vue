<template>
    <div>
        <QDashboard :width="sidebar.width">
            <template #sider>
                <QSidebar v-model:is-collapsed="sidebar.isCollapsed" :width="sidebar.width" :is-television="true" @check-request="handleTvMode"/>
            </template>
            <template #content>
                <div class="flex flex-col gap-4 w-full">
                    <h2 class="font-semibold text-xl text-left px-4 py-2">Settings</h2>
                    <div class="flex sm:flex-col xl:flex-row px-4 gap-4 flex-wrap">
                        <div class="w-full flex flex-col relative border border-gray-300 ml-4 p-4 rounded-xl gap-4" style="max-width: 600px;">
                            <div class="flex justify-start items-center gap-4 w-full" >
                                <label class="pr-2 text-left absolute top-0 bg-white" style="transform: translate(0, -13px);">Production Time</label>
                                <label class="w-1/3 text-left">Start</label>
                                <input type="time" v-model="dataSource.productionTime.start" class="border border-gray-300 rounded-lg p-2 w-2/3" />
                                <label class="w-1/3 text-right">End</label>
                                <input type="time" v-model="dataSource.productionTime.end" class="border border-gray-300 rounded-lg p-2 w-2/3" />
                            </div>
                            <div class="flex w-full justify-end">
                                <button class="bg-sky-500 text-white rounded-lg px-4 py-2" @click="handleSubmit('production_time')">Save</button>
                            </div>
                        </div>
                        <div class="w-full flex flex-col relative border border-gray-300 ml-4 p-4 rounded-xl gap-4" style="max-width: 600px;">
                            <div class="flex justify-start items-center gap-4 w-full">
                                <label class="pr-2 text-left absolute top-0 bg-white" style="transform: translate(0, -13px);">Machine Name</label>
                                <label class="w-1/3 text-left">From</label>
                                <select class="border border-gray-300 rounded-lg p-2 w-2/3"
                                    v-model="dataSource.machineName.id"
                                >
                                    <option value="" disabled>Select Machine</option>
                                    <option v-for="item in dataSource.machineList" :key="item" :value="item.id">{{item.friendly_machine_name}}</option>
                                </select>
                                <label class="w-1/3 text-right">to</label>
                                <input type="text" v-model="dataSource.machineName.new" class="border border-gray-300 rounded-lg p-2 w-2/3" />
                            </div>
                            <div class="flex w-full justify-end">
                                <button class="bg-sky-500 text-white rounded-lg px-4 py-2" @click="handleSubmit('change_machine_name')">Save</button>
                            </div>
                        </div>
                        <div class="w-full flex flex-col relative border border-gray-300 ml-4 p-4 rounded-xl gap-4" style="max-width: 600px;">
                            <div class="flex flex-col justify-start items-start gap-4 w-full">
                                <label class="pr-2 text-left absolute top-0 bg-white" style="transform: translate(0, -13px);">Change Password</label>
                                <div class="flex items-center justify-start w-full">
                                    <label class="w-1/3 text-left">Old Password</label>
                                    <input type="text" class="border border-gray-300 rounded-lg p-2 w-2/3" />
                                </div>
                                <div class="flex items-center justify-start w-full">
                                    <label class="w-1/3 text-left">New Password</label>
                                    <input type="text" class="border border-gray-300 rounded-lg p-2 w-2/3" />
                                </div>
                                <div class="flex items-center justify-start w-full">
                                    <label class="w-1/3 text-left">Confirm New Password</label>
                                    <input type="text" class="border border-gray-300 rounded-lg p-2 w-2/3" />
                                </div>
                            </div>
                            <div class="flex w-full justify-end">
                                <button class="bg-sky-500 text-white rounded-lg px-4 py-2">Save</button>
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
import { updateDataByDataType } from '@/store/standardSettings'
import { getStandardDataFromLocalStorage, getLineListofUser } from '@/store/localStorageManagement'
import { getAllMachineByLineName, updateFriendlyMachineName } from '@/store/machineStatus'

export default {
    name: 'UserSetting',
    components: { QSidebar, QDashboard},
    setup() {
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

        const dataSource = ref({
            productionTime: {
                start: '',
                end: ''
            },
            machineName: {
                id: '',
                new: ''
            },
            machineList: []
        })

        return {
            sidebar,
            dataSource
        }
    },
    mounted() {
        this.initialFunction();
    },
    methods: {
        initialFunction () {
            this.getAllMachineName();
            this.assignStandardData();
        },
        async handleSubmit(type) {
            if (type === 'production_time') {
                const sendParams = {
                    data_type: 'production_time',
                    line_name: 'ajinomoto_pathum',
                    location: 'ajinomoto',
                    setting_data: JSON.stringify({
                        time_from: this.dataSource.productionTime.start,
                        time_to: this.dataSource.productionTime.end
                    })
                }

                const result = await updateDataByDataType(sendParams);
                console.log(result)
            } else if (type === 'change_machine_name') {
                const sendParams = {
                    id: this.dataSource.machineName.id,
                    friendly_machine_name: this.dataSource.machineName.new
                }
                const result = await updateFriendlyMachineName(sendParams);
                if (result !== null) {
                    alert('Machine Name Updated');
                    this.getAllMachineName();
                }
            }
        },
        async getAllMachineName () {
            const sendParams = {
                line_name: 'ajinomoto_pathum',
                location: 'ajinomoto'
            }
            const result = await getAllMachineByLineName(sendParams);
            if (result.length > 0) {
                console.log('result', result)
                this.dataSource.machineList = [...result];
            }
        },
        assignStandardData() {
            const standardData = getStandardDataFromLocalStorage();
            const  lineList = getLineListofUser();
            console.log(standardData, lineList)
            if (standardData) {
                const jsonStandardData = JSON.parse(standardData);
                const productionTime = jsonStandardData.production_time[0];
                this.dataSource.productionTime.start = productionTime.setting_data.time_from;
                this.dataSource.productionTime.end = productionTime.setting_data.time_to;
            }
        }
    }
}
</script>