<script>
import { logoQonnectWhite, logoQonnectWhiteFull, logoQonnectWhiteFullSvg, logoQonnectBlack, logoScg } from '@/assets/helper/assets'
import { reactive, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { routeTo } from '@/utils/helper'
import {
  PowerIcon
} from '@heroicons/vue/24/outline'

import {
  pieIcon, pieIconBlue, buildingIconBlue, buildingIcon, warningIcon, warningIconBlue,
  folderIcon, folderIconBlue, cloudIcon, cloudIconBlue, logoutIcon, televisionIcon,
  documentCheckIcon, documentCheckIconBlue, documentMinusIcon, documentMinusIconBlue,
  documentUpIcon, documentUpIconBlue, documentDownIcon, documentDownIconBlue, doubleRightIcon, doubleLeftIcon,
  toolsIconWhite, toolsIconBlue, clipboardDataIconWhite, clipboardDataIconBlue
} from '@/utils/helper-asset-icon.ts'

export default {
  name: 'Q-Sidebar',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    PowerIcon

  },
  emits: ['update:isCollapsed'],
  props: {
    width: {
      type: Number,
      required: false,
      default: () => 240
    },
    isCollapsed: {
      type: Boolean,
      required: true,
      default: () => true
    },
    isTelevision: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  setup (props, { emit }) {
    const componentIcons = {
      PowerIcon,
      pieIcon,
      pieIconBlue,
      buildingIcon,
      buildingIconBlue,
      warningIcon,
      warningIconBlue,
      folderIcon,
      folderIconBlue,
      cloudIcon,
      cloudIconBlue,
      documentCheckIcon,
      documentCheckIconBlue,
      documentMinusIcon,
      documentMinusIconBlue,
      documentUpIcon,
      documentUpIconBlue,
      documentDownIcon,
      documentDownIconBlue,
      toolsIconWhite,
      toolsIconBlue,
      clipboardDataIconWhite,
      clipboardDataIconBlue
    }
    const isTelevisionMode = ref(false)

    const route = useRoute()
    const menu = reactive([
      { title: 'Overview', label: 'Overview', link: 'home', icon: 'pieIcon', iconActive: 'pieIconBlue', iconType: 'hero-icons', active: false, hover: false, fill: 'white' },
      { title: 'Monitor', label: 'Monitor', link: 'MonitoringPage', icon: 'clipboardDataIconWhite', iconActive: 'clipboardDataIconBlue', iconType: 'hero-icons', active: false, hover: false, fill: 'white' },
      { title: 'Export', label: 'Export', link: 'ExportDataPage', icon: 'documentUpIcon', iconActive: 'documentUpIconBlue', iconType: 'hero-icons', active: false, hover: false, fill: 'white' },
      // { title: 'Reject', label: 'Reject', link: 'RejectLogs', icon: 'documentMinusIcon', iconActive: 'documentMinusIconBlue', iconType: 'hero-icons', active: false, hover: false, fill: 'white' },
      { title: 'Settings', label: 'Settings', link: 'UserSetting', icon: 'toolsIconWhite', iconActive: 'toolsIconBlue', iconType: 'hero-icons', active: false, hover: false, fill: 'white' },

    ])
    const menuMinimize = reactive([
      { title: 'Overview', label: 'Machine Overview', link: 'home', icon: 'pieIcon', iconActive: 'pieIconBlue', iconType: 'hero-icons', active: false, hover: false, fill: 'white' },
      { title: 'Monitor', label: 'Monitor', link: 'MonitoringPage', icon: 'clipboardDataIconWhite', iconActive: 'clipboardDataIconBlue', iconType: 'hero-icons', active: false, hover: false, fill: 'white' },
      { title: 'Export', label: 'Export', link: 'ExportDataPage', icon: 'documentUpIcon', iconActive: 'documentUpIconBlue', iconType: 'hero-icons', active: false, hover: false, fill: 'white' },
      // { title: 'Reject', label: 'Reject', link: 'RejectLogs', icon: 'documentMinusIcon', iconActive: 'documentMinusIconBlue', iconType: 'hero-icons', active: false, hover: false, fill: 'white' },
      { title: 'Settings', label: 'Settings', link: 'UserSetting', icon: 'toolsIconWhite', iconActive: 'toolsIconBlue', iconType: 'hero-icons', active: false, hover: false, fill: 'white' },
    ])

    const onCollapsed = () => {
      emit('update:isCollapsed', !props.isCollapsed)
    }
    const handleTvMode = () => {
      isTelevisionMode.value = !isTelevisionMode.value
      makeFullScreenPage()
      emit('check-request', isTelevisionMode.value)
    }
    const makeFullScreenPage = () => {
    try {
        const doc = window.document
        const docEl = doc.documentElement

        const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen
        const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen

        if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
          requestFullScreen.call(docEl)
        } else {
          cancelFullScreen.call(doc)
        }
      } catch {
        console.warn('Fullscreen is not supported')
      }
    }
    const onItem = (item) => {
      if (item.children !== undefined && item.children.length > 0) {
        if (item.disabled === undefined || !item.disabled) {
          item.active = !item.active
        }
      } else {
        item.active = !item.active
      }
    }
    const getCurrentTime = () => {
      // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
      const dateFrom = new Date()
      return `${dateFrom.getFullYear()}-${(dateFrom.getMonth() + 1).toString().padStart(2, '0')}-${dateFrom.getDate().toString().padStart(2, '0')} ${dateFrom.getHours().toString().padStart(2, '0')}:${dateFrom.getMinutes().toString().padStart(2, '0')}:${dateFrom.getSeconds().toString().padStart(2, '0')}`
    }
    const currentServerTime = reactive(getCurrentTime())
    const logout = () => {
      sessionStorage.removeItem('userAuth')
      sessionStorage.removeItem('userToken')
      routeTo('LoginPage')
    }

    const classBindingCollapsed = computed(() => {
      console.log('props.isCollapsed', props.isCollapsed)
      return `${!props.isCollapsed ? 'w-full' : 'w-1/2'}`;
    });
    return {
      menu,
      menuMinimize,
      route,
      logoQonnectWhite,
      logoQonnectBlack,
      logoQonnectWhiteFull,
      logoQonnectWhiteFullSvg,
      logoScg,
      onCollapsed,
      handleTvMode,
      onItem,
      logout,
      currentServerTime,
      componentIcons,
      doubleRightIcon,
      doubleLeftIcon,
      logoutIcon,
      televisionIcon,
      isTelevisionMode,
      classBindingCollapsed,
    }
  },
  computed: {
    filteredMenu () {
      return this.menu.filter(item => item.children === undefined || item.children.length === 0)
    },
    filteredMenuNonTablet () {
      return this.menu.filter(item => item.type !== 'tablet')
    },
    filteredMenuTablet () {
      return this.menu.filter(item => item.type === 'tablet')
    }
  },
  mounted () {
    this.OnActive()
  },
  methods: {
    handleChangePage (name) {
      console.log('name', name)
      routeTo(name)
    },
    OnActive () {
      let notFound = true
      this.menu = [...this.menu] // Spread operator forces reactivity
      this.menuMinimize = [...this.menuMinimize]
      for (const item of this.menu) {
        if (item.link === this.route.name) {
            item.active = true
          }
      }
      for (const item of this.menuMinimize) {
        if (item.link === this.route.name) {
          item.active = true
          notFound = false
        }
      }
      if (notFound) {
        switch (this.route.name) {
          case 'home':
            this.menu[0].active = true
            this.menuMinimize[0].active = true
            break
        }
      }
    }
  }
}
</script>
<template lang="html">
  <section>
    <div class="bg-white h-11 absolute top-0 right-0 flex justify-between align-middle items-center shadow-sm z-0 w-full" :style="{ width: `calc(100vw - ${width}px)`}">
      <div class="flex w-1/2 justify-start gap-4 items-center" v-if="isCollapsed">
        <img class="h-8 ml-8" :src="logoScg"/>
        <h2 class="font-semibold">Energy Monitoring</h2>
      </div>
      <div :class="`flex justify-end align-middle items-center ${classBindingCollapsed}`">
        <button v-if="isTelevision" class="flex justify-between align-middle items-center text-sky-500 mx-8 text-sm border border-gray-300 rounded-lg px-2 py-1 font-semibold max-lg:hidden" @click="handleTvMode">
          <img class="h-4" :src="televisionIcon"/>
          <span class="ml-2 max-lg:text-xxs lg:text-xs xl:text-sm" v-if="!isTelevisionMode">Television Mode</span>
          <span class="ml-2" v-else>Normal Mode</span>
        </button>
        <div v-if="userEmail != ''" class="text-sm bg-sky-500 rounded-full w-5 mr-2 text-white cursor-default" v-show="!isTelevisionMode">C</div>
        <span class="font-light max-lg:text-xxs lg:text-xs xl:text-sm text-gray-500 cursor-default" v-show="!isTelevisionMode">chanin@scg.com</span>
        <button class="flex justify-between align-middle items-center text-sky-500 mx-8 text-sm" @click="logout">
          <img class="h-4" :src="logoutIcon"/>
          <span class="ml-2 max-lg:text-xxs lg:text-xs xl:text-sm">Logout</span>
        </button>
      </div>
    </div>
  </section>
  <nav :class="`q-sidebar ${isCollapsed? 'collapsed' : ''} h-full`" :style="`--sidebar-width: ${width}; position: relative`">
    <section style="position: absolute; right: 0;">
      <button
        :style="`--sidebar-width: ${width}; position: relative;`"
        class="relative"
        @click="onCollapsed"
      >
        <!-- Background Image -->
        <img
          src="@/assets/image/sidebar/curveButtonSidebar.svg"
          alt="Curve Button Sidebar"
          class="relative"
        />

        <!-- Overlay Image -->
        <img
          :src="doubleRightIcon"
          alt="Double Right Icon"
          class="absolute"
          style="top: 50%; left: 50%; transform: translate(-50%, -50%);"
          v-if="isCollapsed"
        />
        <img
          :src="doubleLeftIcon"
          alt="Double Left Icon"
          class="absolute"
          style="top: 50%; left: 50%; transform: translate(-50%, -50%);"
          v-else
        />
      </button>
    </section>

    <section :class="`q-sidebar-menu ${isCollapsed ? 'mt-8' : ''}`">
      <img alt="logo" class="logo ml-5 h-12" :src="logoScg" v-show="!isCollapsed" style="filter: invert(100%) sepia(100%) brightness(200%);"/>
      <h1 class="text-left text-white font-semibold ml-5 mt-4 text-xl" v-show="!isCollapsed">Energy Monitoring</h1>
      <ul class="mt-5 font-semibold" v-show="!isCollapsed">
        <li v-for="(item, index) in filteredMenuNonTablet" :key="index"
            :class="[
              item.active == true && item.children == undefined ? 'active' : '',
              item.disabled ? 'disabled' : '',
              item.children !== undefined && item.children.length > 0 ? 'sublist' : ''
            ]"
            @click="onItem(item)"
          >
          <div
            :class="`flex items-center ${isCollapsed ? 'center' : 'space-between'}`"
              @mouseenter="item.hover = true"
              @mouseleave="item.hover = false"
            @click="handleChangePage(item.link)"
          >
            <div class="flex">
              <img :src="`${item.hover || item.active ? componentIcons[item.iconActive]: componentIcons[item.icon]}`" :class="['w-6 h-6 text-white']">
                <span class="typography-b3 font-semibold" v-if="item.children == undefined ">
                  {{ item.label }}
                </span>
                <span class="typography-b3 font-semibold" v-else>
                  {{ item.label }}
                </span>
              </div>
            </div>
          </li>
        </ul>

        <ul class="mt-5 font-semibold" v-show="isCollapsed">
          <li v-for="(item, index) in menuMinimize" :key="index"
            :class="[
              item.active == true ? 'active' : '',
              item.disabled ? 'disabled' : '',
            ]"
            style="padding: 0px 8px !important;"
            @click="onItem(item)"
            @mouseenter="item.hover = true"
            @mouseleave="item.hover = false"
        >
          <div class="flex justify-center py-2" @click="handleChangePage(item.link)">
            <img :src="`${item.hover || item.active ? componentIcons[item.iconActive]: componentIcons[item.icon]}`" :class="['w-6 h-6 text-white']">
          </div>
        </li>
      </ul>

    </section>
    <!-- <section class="q-sidebar-action">
      <button class="q-sidebar-action-collapse" @click="onCollapsed">
        <v-icon :scale="1.25" :name="`md-keyboarddoublearrow${isCollapsed? 'right' : 'left'}-outlined`"/>
        <span class="typography-b3">Hide Sidebar</span>
      </button>
    </section> -->
    <!-- <section >
      <span class="text-white font-light text-sm">{{ currentServerTime }}</span>
    </section> -->
    <section class="w-full flex justify-center align-middle items-center mb-4">
          <span class="text-xs text-white" v-if="!isCollapsed">Power by</span>
          <img :src="logoQonnectWhiteFullSvg" :class="`${!isCollapsed ? 'ml-2' : ''}`" style="width: 56px; margin-top: 1px;"/>
    </section>
    <!-- <section class="mt-4 flex justify-center items-center cursor-pointer bg-red-300" @click="logout">
      <div class="flex items-center justify-normal" v-show="!isCollapsed">
        <button class="q-sidebar-action-collapse w-full m-4 text-center rounded-md">
          Logout
        </button>
        <PowerIcon class="text-black h-10"/>
      </div>
      <div v-show="isCollapsed">
        <PowerIcon class="text-black w-8 h-8 my-4"/>
      </div>
    </section> -->
    <!-- <img class="h-full absolute" src="@/assets/image/sidebar/Vector-130.png"/> -->
  </nav>
</template>
<style lang="scss" scoped>
$sidebar-width: calc(var(--sidebar-width) * 1px);
svg.white {
  fill: var(--color-white);
}
svg.blue {
  fill: var(--color-blue);
}
.q-sidebar {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 40px;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  // position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: $sidebar-width;
  background: transparent;
  transition: 0.5s width;
  overflow: hidden;
  //overflow-y: scroll;
  &.collapsed {
    span {
      display: none;
    }
    ul {
      li {
        text-align: center;
        justify-content: center !important;
      }
    }
    .item-sublist {
      display: none;
    }
  }
  .q-sidebar-menu {
    grid-area: 1 / 1 / 2 / 2;
    width: inherit;
    padding: 24px 0px;
    img {
      &.logo {
        width: auto;
        object-fit: contain;
      }
    }
    ul {
      list-style-type: none;
      padding: 0 8px;
      text-align: start;
      color: var(--color-white);
      li {
        cursor: pointer;
        padding: 8px;
        border-radius: 8px;
        margin-top: 4px;
        transition: 0.2s ease-in;
        &:not(.sublist):hover {
          background: var(--Color-Surface-primary, #FFF);
          color: #0EA5E9
          //color: var(--color-white);
        }
        &.active {
          background: var(--Color-Surface-primary, #FFF);
          color: #0EA5E9
        }
        &.disabled {
          cursor: not-allowed;
          opacity: 0.4;
        }
        span {
          margin-left: 12px;
        }
      }
    }
  }
  .q-sidebar-action {
    grid-area: 2 / 1 / 3 / 2;
    width: inherit;
    button {
      cursor: pointer;
      &.q-sidebar-action-collapse {
        border: none;
        outline: none;
        color: var(--color-white);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: transparent;
      }
    }
  }
}
@keyframes item-center {
  from { text-align: start}
  to { text-align: center }
}

</style>
