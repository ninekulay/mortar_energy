import axios from 'axios'
import { checkAuth } from './userManagement'
// const username = `${process.env.VUE_APP_SERVICE_AUTH_USER}`
// const password = `${process.env.VUE_APP_SERVICE_AUTH_PASSWORD}`

// // Encode the username and password in Base64
// const tokenAuth = btoa(`${username}:${password}`)

export async function getStandardDataFromUser (data) {
  const checkAuthValid = await checkAuth()
  if (checkAuthValid) {
    try {
      const myurl = `${process.env.VUE_APP_URL_BACKEND}`
      const myExactPath = `${myurl}/api/std-params/get-data-by-user`
      const response = await axios.post(myExactPath, data, {
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

export async function updateDataByDataType (data) {
  const checkAuthValid = await checkAuth()
  if (checkAuthValid) {
    try {
      const myurl = `${process.env.VUE_APP_URL_BACKEND}`
      const myExactPath = `${myurl}/api/std-params/update-by-datatype-line_name`
      const response = await axios.post(myExactPath, data, {
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