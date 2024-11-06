import axios from 'axios'
import CryptoJS from 'crypto-js'
import router from '@/router'
// import { UserAgentApplication } from 'msal'

// import { checkAuth } from './login'
const username = `${process.env.VUE_APP_SERVICE_AUTH_USER}`
const password = `${process.env.VUE_APP_SERVICE_AUTH_PASSWORD}`

// Encode the username and password in Base64
const tokenAuth = btoa(`${username}:${password}`)

export async function userRegister (data) {
//   const checkAuthValid = await checkAuth()
  if (tokenAuth) {
    try {
        const secretKey = process.env.VUE_APP_SECRET_FRONT
        const userAuthData = JSON.parse(JSON.stringify(data))
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(userAuthData), secretKey).toString()

        const sendParams = {
            data: encryptedData
        }
        const myurl = `${process.env.VUE_APP_URL_BACKEND}`
        const myExactPath = `${myurl}/api/user-managements/register`
        const response = await axios.post(myExactPath, sendParams, {
            headers: {
            Authorization: `Basic ${tokenAuth}`
            }
        })
        return response.data // You can return the response data for further use
    } catch (error) {
        return { message: error?.response?.data?.message ?? 'Error', code: error.response.status || 'Unknown' }
    }
  }
  return []
}

export async function userLogin (data) {
    //   const checkAuthValid = await checkAuth()
      if (tokenAuth) {
        try {
            const secretKey = process.env.VUE_APP_SECRET_FRONT
            const userAuthData = JSON.parse(JSON.stringify(data))
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(userAuthData), secretKey).toString()
    
            const sendParams = {
                data: encryptedData
            }
            const myurl = `${process.env.VUE_APP_URL_BACKEND}`
            const myExactPath = `${myurl}/api/user-managements/login`
            const response = await axios.post(myExactPath, sendParams, {
                headers: {
                Authorization: `Basic ${tokenAuth}`
                }
            })
            return response.data // You can return the response data for further use
        } catch (error) {
            return { message: error?.response?.data?.message ?? 'Error', code: error.response.status || 'Unknown' }
        }
      }
      return []
    }

export function getUserAuth () {
    try {
        const secretKey = process.env.VUE_APP_SECRET_FRONT
        const decryptedBytes = CryptoJS.AES.decrypt(sessionStorage.getItem('userAuth'), secretKey)
        const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8))
        return decryptedData
    } catch (error) {
        // alert('ไม่พบข้อมูลผู้ใช้งาน')
        return null
    }
    }
    
export function saveUserAuth (obj) {
    try {
        const secretKey = process.env.VUE_APP_SECRET_FRONT
        const userAuthData = JSON.parse(JSON.stringify(obj))
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(userAuthData), secretKey).toString()
        sessionStorage.setItem('userAuth', encryptedData)
        sessionStorage.setItem('userToken', obj.accessToken)
    } catch (error) {
        alert('ไม่สามารถเข้าสู่ระบบ')
        return null
    }
}

export function getAdvanceAuth () {
    const accessToken = sessionStorage.getItem('userToken')
    const advanceAuth = `Basic ${tokenAuth}<;>${accessToken}`
    return advanceAuth
  }
  
  export async function checkAuth () {
    const myurl = `${process.env.VUE_APP_URL_BACKEND}`
    const myExactPath = `${myurl}/api/user-managements/verify-token`
  
    try {
      const response = await axios.get(myExactPath, {
        headers: {
          Authorization: getAdvanceAuth()
        }
      })
  
      if (response && response.data.message === 'Token is valid') {
        return getAdvanceAuth()
      }
      return null
    } catch (err) {
      if (err.response && err.response.status === 401) {
        const accessToken = await reGenerateToken()
        if (accessToken) {
          try {
            const response = await axios.get(myExactPath, {
              headers: {
                Authorization: getAdvanceAuth()
              }
            })
            if (response && response.data.message === 'Token is valid') {
              return getAdvanceAuth()
            }
          } catch (retryErr) {
            console.error('Retry failed:', retryErr)
            router.push({ name: 'LoginPage' })
          }
        }
      }
      console.error('Auth check failed:', err)
      router.push({ name: 'LoginPage' })
      return null
    }
  }
  
  export async function reGenerateToken () {
    try {
      const userAuth = sessionStorage.getItem('userAuth')
      const bytes = CryptoJS.AES.decrypt(userAuth, process.env.VUE_APP_SECRET_FRONT)
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  
      const myurl = `${process.env.VUE_APP_URL_BACKEND}`
      const myExactPath = `${myurl}/api/user-managements/regenerate-token`
  
      const sendParams = {
        refreshToken: decryptedData.refreshToken || null
      }
  
      const response = await axios.post(myExactPath, sendParams, {
        headers: {
          Authorization: `Basic ${tokenAuth}`
        }
      })
  
      if (response) {
        const accessToken = response.data.accessToken
        sessionStorage.setItem('userToken', accessToken)
        return accessToken
      }
    } catch (err) {
      return null
    }
  }
  