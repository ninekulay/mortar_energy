import axios from 'axios'
import { checkAuth } from './userManagement'

export async function getDailyDataFromMachine (data) {
  const checkAuthValid = await checkAuth()
  if (checkAuthValid) {
    try {
      const myurl = `${process.env.VUE_APP_URL_BACKEND}`
      const myExactPath = `${myurl}/api/daily-data-logs/get-daily-logs/${data.machine_name}/${data.line_name}/${data.location}/${data.time_from}/${data.time_to}`
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
