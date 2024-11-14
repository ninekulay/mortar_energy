<template>
    <QDashboard :width="sidebar.width">
        <template #sider>
            <QSidebar v-model:is-collapsed="sidebar.isCollapsed" :width="sidebar.width"/>
        </template>
        <template #content>
            <div class="flex flex-col px-4 py-2 ml-2 gap-4">
                <div class="w-full">
                    <h2 class="text-2xl font-semibold text-left">Export data</h2>
                </div>
                <div class="shadow-xl rounded-xl" style="max-width: 800px;">
                    <div class="w-full flex justify-start gap-4 items-center min-h-20 px-4">
                        <label class="text-gray-500 font-semibold w-1/6 text-left" style="min-width: 160px;">Select data to export :</label>
                        <div 
                            class="border border-gray-400 px-4 py-2 rounded-lg min-w-44 min-h-12 flex items-center relative cursor-pointer w-5/6"
                            id="multi-select-data"
                            @click="openMultiSelect"
                        >
                            <div class="flex px-2 cursor-pointer gap-4 w-full z-50 flex-wrap" v-show="filter.selectedItems.length > 0">
                                    <div class="bg-sky-500 rounded-xl text-white w-fit flex justify-start gap-2 px-4 z-50"
                                        v-for="item in filter.selectedItems" :key="item"
                                        @click.stop="handleRemoveParams(item)"
                                    >
                                        <div class="w-full text-left">{{item}}</div>
                                        <div class="text-white hover:text-red-400">X</div>
                                    </div>
                            </div>
                            <div class="bg-white flex flex-col w-full absolute top-0 left-0 border border-gray-400 rounded-lg py-2 px-1 z-50" v-show="filter.multiSelect">
                                <span v-for="item in mockParams" :key="item">
                                    <div 
                                        :class="`min-w-12 text-black gap-2 flex px-2 cursor-pointer hover:bg-sky-500 hover:text-white justify-start ${filter.selectedItems.includes(item) ? 'bg-sky-500 text-white' : ''}`"
                                    >
                                        <div class="w-full text-left" @click="handleSelectParams(item)">{{item}}</div>
                                    </div>
                                </span>
                            </div>
                        </div>

                    </div>
                    <div>
                        <span v-if="filter.overLimitParams" class="text-red-500">You can only select up to 10 items</span>
                    </div>
                    <div class="w-full flex justify-start gap-4 items-center min-h-20 px-4">
                        <label class="text-gray-500 font-semibold">Select Date :</label>
                        <input type="date" class="border border-gray-400 px-4 py-2 rounded-lg min-w-64">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg">Export</button>
                    </div>
                </div>
            </div>
        </template>
    </QDashboard>
</template>
<script>
import QDashboard from '@/layouts/dashboard/q-dashboard-default.vue'
import QSidebar from '@/components/bar/sidebar.vue'
import { reactive, ref, watch } from 'vue'

export default {
    name: 'ExportDataPage',
    components: {
        QDashboard,
        QSidebar,
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

        const filter = ref({
            multiSelect: false,
            overLimitParams: false,
            selectedItems: []
        })
        const mockParams = ['ABC', 'BCD', 'EFG', 'HIJ', 'KLM', 'NOP', 'QRS', 'TUV', 'WXY', 'Z', '11', '22']
        const openMultiSelect = () => {
            filter.value.multiSelect = !filter.value.multiSelect
        }
        const handleSelectParams = (item) => {
            if (filter.value.selectedItems.length >= 10) {
                filter.value.overLimitParams = true
                return
            }
            if (filter.value.selectedItems.includes(item)) {
                filter.value.selectedItems = filter.value.selectedItems.filter((i) => i !== item)
            } else {
                filter.value.selectedItems.push(item)
            }
        }
        const handleRemoveParams = (item) => {
            if (filter.value.selectedItems.includes(item)) {
                filter.value.selectedItems = filter.value.selectedItems.filter((i) => i !== item)
                if (filter.value.selectedItems.length < 10) {
                    filter.value.overLimitParams = false
                }
            }
        }
        return {
            sidebar,
            dataSource,
            mockParams,
            filter,
            openMultiSelect,
            handleSelectParams,
            handleRemoveParams
        }
    },
    methods: {
        handleClickOutside(event) {
        const multiSelectElement = document.getElementById("multi-select-data");
            if (multiSelectElement && !multiSelectElement.contains(event.target)) {
                this.filter.multiSelect = false; // Close the multi-select dropdown
            }
        },
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },
}
</script>
