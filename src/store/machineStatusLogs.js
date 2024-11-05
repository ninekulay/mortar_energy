import axios from 'axios'
// import { checkAuth } from './login'
const username = `${process.env.VUE_APP_SERVICE_AUTH_USER}`
const password = `${process.env.VUE_APP_SERVICE_AUTH_PASSWORD}`

// Encode the username and password in Base64
const tokenAuth = btoa(`${username}:${password}`)

export async function getStatusLogsFromMachine (data) {
//   const checkAuthValid = await checkAuth()
  if (tokenAuth) {
    try {
      const myurl = `${process.env.VUE_APP_URL_BACKEND}`
      const myExactPath = `${myurl}/api/machine_status_logs/get-logs-by-machine/${data.machine_name}/${data.line_name}/${data.location}/${data.time_from}/${data.time_to}`
      const response = await axios.get(myExactPath, {
        headers: {
          Authorization: `Basic ${tokenAuth}`
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