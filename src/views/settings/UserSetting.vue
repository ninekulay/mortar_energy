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
                                <input type="time" class="border border-gray-300 rounded-lg p-2 w-2/3" />
                                <label class="w-1/3 text-right">End</label>
                                <input type="time" class="border border-gray-300 rounded-lg p-2 w-2/3" />
                            </div>
                            <div class="flex w-full justify-end">
                                <button class="bg-sky-500 text-white rounded-lg px-4 py-2">Save</button>
                            </div>
                        </div>
                        <div class="w-full flex flex-col relative border border-gray-300 ml-4 p-4 rounded-xl gap-4" style="max-width: 600px;">
                            <div class="flex justify-start items-center gap-4 w-full">
                                <label class="pr-2 text-left absolute top-0 bg-white" style="transform: translate(0, -13px);">Machine Name</label>
                                <label class="w-1/3 text-left">From</label>
                                <select class="border border-gray-300 rounded-lg p-2 w-2/3">
                                    <option value="1">Machine 1</option>
                                    <option value="2">Machine 2</option>
                                    <option value="3">Machine 3</option>
                                </select>
                                <label class="w-1/3 text-right">to</label>
                                <input type="text" class="border border-gray-300 rounded-lg p-2 w-2/3" />
                            </div>
                            <div class="flex w-full justify-end">
                                <button class="bg-sky-500 text-white rounded-lg px-4 py-2">Save</button>
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
import { reactive, watch } from 'vue'

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

        return {
            sidebar
        }
    }
}
</script>