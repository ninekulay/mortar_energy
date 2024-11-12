import axios from 'axios'
import { checkAuth } from './userManagement'
// const username = `${process.env.VUE_APP_SERVICE_AUTH_USER}`
// const password = `${process.env.VUE_APP_SERVICE_AUTH_PASSWORD}`

// // Encode the username and password in Base64
// const tokenAuth = btoa(`${username}:${password}`)

export async function getDataFromMachine (data) {
  const checkAuthValid = await checkAuth()
  if (checkAuthValid) {
    try {
      const myurl = `${process.env.VUE_APP_URL_BACKEND}`
      const myExactPath = `${myurl}/api/machine_status/get-machine_status/${data.machine_name}/${data.line_name}/${data.location}`
      const response = await axios.get(myExactPath, {
        headers: {
          Authorization: checkAuthValid
        }
      })
      return response.data // You can return the response data for further use
    } catch (error) {
      // alert('ไม่พบข้อมูล')
      return []
      // throw error; // Rethrow the error for the caller to handle
    }
  }
  return []
}

export async function getAllMachineByLineName (data) {
  const checkAuthValid = await checkAuth()
  if (checkAuthValid) {
    try {
      const myurl = `${process.env.VUE_APP_URL_BACKEND}`
      const myExactPath = `${myurl}/api/machine_status/get-machine-in-line/${data.line_name}/${data.location}`
      const response = await axios.get(myExactPath, {
        headers: {
          Authorization: checkAuthValid
        }
      })
      return response.data // You can return the response data for further use
    } catch (error) {
      // alert('ไม่พบข้อมูล')
      return []
      // throw error; // Rethrow the error for the caller to handle
    }
  }
  return []
}

export async function updateFriendlyMachineName (data) {
  const checkAuthValid = await checkAuth()
  if (checkAuthValid) {
    try {
      const myurl = `${process.env.VUE_APP_URL_BACKEND}`
      const myExactPath = `${myurl}/api/machine_status/update-friendly-machine-name`
      const response = await axios.post(myExactPath, data, {
        headers: {
          Authorization: checkAuthValid
        }
      })
      return response.data // You can return the response data for further use
    } catch (error) {
      // alert('ไม่พบข้อมูล')
      return null
      // throw error; // Rethrow the error for the caller to handle
    }
  }
  return []
}

export async function updateProductionSettings (data) {
  const checkAuthValid = await checkAuth()
  if (checkAuthValid) {
    try {
      const myurl = `${process.env.VUE_APP_URL_BACKEND}`
      const myExactPath = `${myurl}/api/machine_status/update-production-settings`
      const response = await axios.post(myExactPath, data, {
        headers: {
          Authorization: checkAuthValid
        }
      })
      return response.data // You can return the response data for further use
    } catch (error) {
      // alert('ไม่พบข้อมูล')
      return null
      // throw error; // Rethrow the error for the caller to handle
    }
  }
  return []
}