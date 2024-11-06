<template>
    <div class="flex justify-center w-full mt-4">
        <div class="flex flex-col gap-4 shadow-lg rounded-lg p-4 justify-start items-start" style="max-width: 800px; min-width: 400px;">
            <h2 class="font-semibold text-xl w-full text-center">Register</h2>
            <div class="flex w-full justify-start gap-4 items-center max-w-96">
                <label class="w-1/3 text-left" for="email">Email</label>
                <input type="email" v-model="dataSource.email" class="w-2/3 border border-gray-300 rounded-lg p-2">
            </div>
            <div class="flex w-full justify-start gap-4 items-center max-w-96 relative">
                <label class="w-1/3 text-left" for="password">Password</label>
                <input type="password" id="password" v-model="dataSource.password" class="w-2/3 border border-gray-300 rounded-lg p-2">
                <img @click="visiblePassword('password')" :src="helperParams.isShowPassword ? iconEye : iconEyeSlash" class="absolute right-2 top-2 cursor-pointer" alt="icon-eye">
            </div>
            <div class="flex w-full justify-start gap-4 items-center max-w-96 relative">
                <label class="w-1/3 text-left" for="confirm_password">Confirm Password</label>
                <input type="password" id="confirm_password" v-model="dataSource.password_confirmation" class="w-2/3 border border-gray-300 rounded-lg p-2">
                <img @click="visiblePassword('confirm_password')" :src="helperParams.isShowConfirmPassword ? iconEye : iconEyeSlash" class="absolute right-2 top-3 cursor-pointer" alt="icon-eye">
            </div>
            <div class="flex w-full justify-start gap-4 items-center max-w-96">
                <label class="w-1/3 text-left" for="location">Location</label>
                <input type="location" v-model="dataSource.location" class="w-2/3 border border-gray-300 rounded-lg p-2">
            </div>
            <div class="flex w-full justify-start gap-4 items-center max-w-96">
                <label class="w-1/3 text-left" for="login_type">Login Type</label>
                <select
                    v-model="dataSource.login_type"
                    class="w-2/3 border border-gray-300 rounded-lg p-2"
                >
                    <option value="email">Email</option>
                    <option value="scg">SCG</option>
                </select>
            </div>
            <div class="w-full justify-center">
                <button class="bg-blue-500 text-white rounded-lg p-2 w-full" @click="register">Register</button>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from "vue";
import { iconEye, iconEyeSlash } from '@/utils/helper-asset-icon.ts'
import { userRegister } from '@/store/userManagement'

export default {
    name: "RegisterPage",
    setup() {
        const helperParams = ref({
            isShowPassword: false,
            isShowConfirmPassword: false
        })
        const dataSource = ref({
            email: "",
            password: "",
            password_confirmation: "",
            location: "",
            login_type: "email"
        });

        const validateSamePassword = () => {
            return dataSource.value.password === dataSource.value.password_confirmation;
        };
        const register = () => {
            if (!validateSamePassword()) {
                alert("Password and Confirm Password must be the same");
                return;
            }
            prepareData();
            console.log(dataSource.value);
        };
        const prepareData = () => {
            let checkAllFields = true;
            const sendParams = {
                email: dataSource.value.email,
                username: dataSource.value.email,
                password: dataSource.value.password,
                location: dataSource.value.location,
                login_type: dataSource.value.login_type
            };
            if (!validateEmail()) {
                alert("Invalid email");
                return;
            }
            for (const key in sendParams) {
                if (!sendParams[key]) {
                    checkAllFields = false;
                    alert("Please fill in all fields");
                    return;
                }
                if (!isValidInput(sendParams[key])) {
                    checkAllFields = false;
                    alert("Invalid input");
                    return;
                }
            }
            if (!validatePassword()) {
                alert("Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long");
                return;
            }
            if (checkAllFields) {
                sendingRegister(sendParams);
            }
        };
        const sendingRegister = async (sendParams) => {
            const result = await userRegister(sendParams);
            alert(result.message);
        };
        const validateEmail = () => {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return emailPattern.test(dataSource.value.email)
        }
        const validatePassword = () => {
            // at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long
            // const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

            // at least 8 characters long
            const passwordPattern = /^.{8,}$/
            return passwordPattern.test(dataSource.value.password)
        }
        const visiblePassword = (type) => {
            if (type === 'password') {
                helperParams.value.isShowPassword = !helperParams.value.isShowPassword
                if (document.getElementById('password').type === 'text') {
                    document.getElementById('password').type = 'password'
                } else {
                    document.getElementById('password').type = 'text'
                }
            } else {
                helperParams.value.isShowConfirmPassword = !helperParams.value.isShowConfirmPassword
                if (document.getElementById('confirm_password').type === 'text') {
                    document.getElementById('confirm_password').type = 'password'
                } else {
                    document.getElementById('confirm_password').type = 'text'
                }
            }
        }
        const isValidInput = (data) => {
            // Include Thai characters by adding the Unicode range \u0E00-\u0E7F
            const allowedPattern = /^[a-zA-Z0-9_@.!: \u0E00-\u0E7F-]*$/
            const containsDoubleHyphen = /--/.test(data)
            return allowedPattern.test(data) && !containsDoubleHyphen
        }
        return {
            dataSource,
            iconEye,
            iconEyeSlash,
            helperParams,
            register,
            visiblePassword
        };
    },
    methods: {
    }
};
</script>
