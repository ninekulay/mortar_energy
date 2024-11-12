<template>
    <div>
        <QDashboard :width="sidebar.width">
            <template #sider>
                <QSidebar v-model:is-collapsed="sidebar.isCollapsed" :width="sidebar.width" :is-television="true" @check-request="handleTvMode"/>
            </template>
            <template #content>
                <div class="flex flex-col gap-4 w-full ml-2">
                    <h2 class="font-semibold text-xl text-left px-4 py-2">Settings</h2>
                    <div class="flex flex-col px-4 gap-4 flex-wrap">
                        <div class="w-full flex flex-col relative border border-gray-300 ml-4 p-4 rounded-xl gap-4" style="max-width: 800px;">
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
                        <div class="w-full flex flex-col relative border border-gray-300 ml-4 p-4 rounded-xl gap-4" style="max-width: 800px;">
                            <div class="grid grid-cols-[120px,auto,50px,auto,auto,50px] items-center gap-4 w-full">
                                <label class="pr-2 text-left absolute top-0 bg-white" style="transform: translate(0, -13px);">Parameter Machine</label>
                                <label class="text-left">Name</label>
                                <select class="border border-gray-300 rounded-lg p-2 w-full lg:min-w-52"
                                    v-model="dataSource.machineName.id"
                                    @change="selectMachineName(dataSource.machineName.id)"
                                >
                                    <option value="" disabled>Select Machine</option>
                                    <option v-for="item in dataSource.machineList" :key="item" :value="item.id">{{item.friendly_machine_name}}</option>
                                </select>
                                <span class="text-left text-gray-400"></span>
                                <label class="text-right">to</label>
                                <input type="text" v-model="dataSource.machineName.new" class="border border-gray-300 rounded-lg p-2 w-full" />
                            </div>
                            <div class="grid grid-cols-[120px,auto,50px,auto,auto,50px] items-center gap-4 w-full">
                                <label class="pr-2 text-left absolute top-0 bg-white" style="transform: translate(0, -13px);">Parameter Machine</label>
                                <label class="text-left">SKU</label>
                                <input type="text" v-model="dataSource.productionSetting.sku" class="border border-gray-300 rounded-lg p-2 w-full lg:min-w-52" />
                                <span class="text-left text-gray-400"></span>
                                <label class="text-right">to</label>
                                <input type="text" v-model="dataSource.productionSettingNew.sku" class="border border-gray-300 rounded-lg p-2 w-full" />
                            </div>
                            <div class="grid grid-cols-[120px,auto,50px,auto,auto,50px]  items-center gap-4 w-full">
                                <label class="text-left">Target</label>
                                <input type="number" step="1" min="1" v-model="dataSource.productionSetting.target" class="border border-gray-300 rounded-lg p-2 w-full lg:min-w-52" />
                                <label class="text-left text-gray-400">pcs</label>
                                <label class="text-right">to</label>
                                <input type="number" step="1" min="1" v-model="dataSource.productionSettingNew.target" class="border border-gray-300 rounded-lg p-2 w-full" />
                                <label class="text-left text-gray-400">pcs</label>
                            </div>
                            <div class="grid grid-cols-[120px,auto,50px,auto,auto,50px]  items-center gap-4 w-full">
                                <label class="text-left">Standard Time</label>
                                <input type="number" step="1" min="1" v-model="dataSource.productionSetting.standardTime" class="border border-gray-300 rounded-lg p-2 w-full lg:min-w-52" />
                                <label class="text-left text-gray-400">pcs / min.</label>
                                <label class="text-right">to</label>
                                <input type="number" step="1" min="1" v-model="dataSource.productionSettingNew.standardTime" class="border border-gray-300 rounded-lg p-2 w-full" />
                                <label class="text-left text-gray-400">pcs / min.</label>
                            </div>
                            <div class="grid grid-cols-[120px,auto,50px,auto,auto,50px] items-center gap-4 w-full">
                                <label class="text-left">1 Lot</label>
                                <input type="number" step="1" min="1" v-model="dataSource.productionSetting.pcsPerLot" class="border border-gray-300 rounded-lg p-2 w-full lg:min-w-52" />
                                <label class="text-left text-gray-400">pcs</label>
                                <label class="text-right">to</label>
                                <input type="number" step="1" min="1" v-model="dataSource.productionSettingNew.pcsPerLot" class="border border-gray-300 rounded-lg p-2 w-full" />
                                <label class="text-left text-gray-400">pcs</label>
                            </div>
                            <div class="flex w-full justify-end">
                                <button class="bg-sky-500 text-white rounded-lg px-4 py-2" @click="handleSubmit('change_machine_name')">Save</button>
                            </div>
                        </div>
                        <div class="w-full flex flex-col relative border border-gray-300 ml-4 p-4 rounded-xl gap-4" style="max-width: 800px;">
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
import { getAllMachineByLineName, updateFriendlyMachineName, updateProductionSettings } from '@/store/machineStatus'

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
            productionSetting: {
                sku: '',
                target: 1,
                standardTime: 1,
                pcsPerLot: 1
            },
            productionSettingNew: {
                sku: '',
                target: '',
                standardTime: '',
                pcsPerLot: ''
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
                let changeMachineName = false;
                let changeProductionSetting = false;
                const sendParams = {
                    id: this.dataSource.machineName.id,
                }
                if (this.dataSource.machineName.new.trim() !== '') {
                    sendParams.friendly_machine_name = this.dataSource.machineName.new;

                    changeMachineName = true;
                }
                if (this.dataSource.productionSettingNew.sku.trim() !== '' || this.dataSource.productionSettingNew.target !== '' || this.dataSource.productionSettingNew.standardTime !== '' || this.dataSource.productionSettingNew.pcsPerLot !== '') {
                    sendParams.product_id = this.dataSource.productionSettingNew.sku !== '' ? this.dataSource.productionSettingNew.sku : this.dataSource.productionSetting.sku;
                    sendParams.production_target = this.dataSource.productionSettingNew.target !== '' ? this.dataSource.productionSettingNew.target : this.dataSource.productionSetting.target;
                    sendParams.standard_time = this.dataSource.productionSettingNew.standardTime !== '' ? this.dataSource.productionSettingNew.standardTime : this.dataSource.productionSetting.standardTime;
                    sendParams.pcs_per_lot = this.dataSource.productionSettingNew.pcsPerLot !== '' ? this.dataSource.productionSettingNew.pcsPerLot : this.dataSource.productionSetting.pcsPerLot;

                    changeProductionSetting = true;
                }
                
                if (changeMachineName && changeProductionSetting) {
                    const result = await updateProductionSettings(sendParams);
                    if (result !== null) {
                        alert('Parameter machine updated');
                        await this.getAllMachineName();
                        this.selectMachineName(this.dataSource.machineName.id)
                    }
                } else if (changeMachineName) {
                    const result = await updateFriendlyMachineName(sendParams);
                    if (result !== null) {
                        alert('Parameter machine updated');
                        await this.getAllMachineName();
                        this.selectMachineName(this.dataSource.machineName.id)
                    }
                } else if (changeProductionSetting) {
                    const result = await updateProductionSettings(sendParams);
                    if (result !== null) {
                        alert('Parameter machine updated');
                        await this.getAllMachineName();
                        this.selectMachineName(this.dataSource.machineName.id)
                    }
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
                this.dataSource.machineName.id = result[0].id;
                this.selectMachineName(result[0].id);
            }
            return
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
        },
        selectMachineName(value) {
            const selectedMachine = this.dataSource.machineList.find(item => item.id === value);
            if (selectedMachine) {
                const productionSetting = selectedMachine.production_setting;
                if (productionSetting) {
                    this.dataSource.productionSetting.sku = productionSetting.product_id;
                    this.dataSource.productionSetting.target = productionSetting.production_target;
                    this.dataSource.productionSetting.standardTime = productionSetting.standard_time;
                    this.dataSource.productionSetting.pcsPerLot = productionSetting.pcs_per_lot;
                }
            }
        }
    }
}
</script>