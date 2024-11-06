<template>
    <div class="flex justify-center items-center h-full w-full min-h-screen main-div absolute">
        <div class="flex flex-col h-96 w-96 rounded-xl border shadow-xl backdrop-blur-xl bg-white/70">
            <h2 class="w-full text-center py-2 px-8 font-semibold text-xl cursor-default">Machine Performance System</h2>
            <div class="flex w-full justify-start px-4 gap-4">
                <h2 for="email" class="text-left p-2 w-1/3 font-semibold cursor-default">Email</h2>
            </div>
            <div class="flex w-full justify-start px-4 gap-4">
                <input v-model="dataSource.email" type="email" placeholder="Email" class="w-full p-2 border border-sky-300 rounded-lg" />
            </div>
            <div class="flex w-full justify-start px-4 gap-4">
                <h2 for="email" class="text-left p-2 w-1/3 font-semibold cursor-default">Password</h2>
            </div>
            <div class="flex w-full justify-start px-4 gap-4">
                <input v-model="dataSource.password" type="password" placeholder="Password" class="w-full p-2 border border-sky-300 rounded-lg" />
            </div>
            <div class="flex w-full justify-center items-center mt-8">
                <button @click="login" class="w-2/3 p-2 bg-sky-500 text-white rounded-lg font-semibold shadow-lg hover:bg-sky-600">Login</button>
            </div>
            <div class="flex w-full mt-4">
                <p class="text-black text-left text-sm px-4 cursor-default">Please login with your email and password or contract to <a class="cursor-pointer" style="color: blue">www.qonnect.ai</a></p>
            </div>
            <div class="flex h-full w-full items-end justify-end align-middle px-4">
                <div class="flex w-full items-center justify-end py-2 gap-3">
                    <p class="text-sm">Power by</p>
                    <img :src="logoQonnectBlackFull" class="w-24">
                </div>
            </div>
        </div>
        <TransitionRoot :show="modal.open">
            <Dialog class="relative z-10" @close="modal.open = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                    <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <div>
                        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                        <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                        </div>
                        <div class="mt-3 text-center sm:mt-5">
                        <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">{{ modal.header }}</DialogTitle>
                        <div class="mt-2">
                            <p class="text-sm text-gray-500">{{ modal.message }}</p>
                        </div>
                        </div>
                    </div>
                    </DialogPanel>
                </TransitionChild>
                </div>
            </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>
<script>
import { logoQonnectBlackFull, logoQonnectWhiteFull, logoQonnectWhiteFullSvg } from '@/assets/helper/assets'
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { userLogin, saveUserAuth } from '@/store/userManagement'

export default {
    name: 'LoginPage',
    components: {
        Dialog,
        DialogPanel,
        DialogTitle,
        TransitionChild,
        TransitionRoot,
        ExclamationTriangleIcon
    },
    setup() {
        const modal = ref({
            open: false,
            header: 'Login Failed',
            message: 'Please check your email and password'
        })
        const dataSource = ref({
            email: '',
            password: ''
        })
        return {
            logoQonnectBlackFull,
            logoQonnectWhiteFull,
            logoQonnectWhiteFullSvg,
            modal,
            dataSource
        }
    },
    methods: {
        async login() {
        //    this.modal.open = !this.modal.open
            const sendParams = {
                email: this.dataSource.email,
                password: this.dataSource.password
            }
            const result = await userLogin(sendParams)
            if (result.message.toLowerCase() === 'ok') {
                saveUserAuth(result.token)
                this.$router.push({ name: 'home' })
            } else {
                this.modal.open = !this.modal.open
            }
        }
    }
}
</script>
<style>
.main-div {
    background: url('@/assets/image/background/login-background.jpg') no-repeat center center fixed;
    background-size: cover;
}
</style>