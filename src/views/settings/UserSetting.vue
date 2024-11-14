<template>
    <div>
        <QDashboard :width="sidebar.width">
            <template #sider>
                <QSidebar v-model:is-collapsed="sidebar.isCollapsed" :width="sidebar.width"/>
            </template>
            <template #content>
                <div class="flex flex-col gap-4 w-full ml-2">
                    <h2 class="font-semibold text-xl text-left px-4 py-2">Settings</h2>
                    <div class="flex flex-col px-4 gap-4 flex-wrap">
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

        const dataSource = ref({})

        return {
            sidebar,
            dataSource
        }
    }
}
</script>