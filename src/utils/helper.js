import router from '@/router'

export const delay = async (ms) => await setTimeout(() => {}, ms)

export const count = (numbers) => numbers.reduce((accumulator, currentValue) => { return accumulator + currentValue }, 0)
export const arrayAllZero = (numbers) => {
  let isZero = true
  numbers.forEach((number) => {
    if (parseInt(number) !== 0) {
      isZero = false
    }
  })
  return isZero
}
export const convertToThaiMonth = (numericMonth) => {
  const thaiMonths = [
    'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.',
    'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.',
    'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
  ]
  // Ensure the month value is within a valid range (1 to 12)
  const normalizedMonth = Math.max(1, Math.min(12, numericMonth))
  // Return the corresponding Thai month text
  return thaiMonths[normalizedMonth - 1]
}

export const routeTo = (name, params) => {
  const routes = router.options.routes
  const routeExist = checkRouteName(routes, name, params)
  if (routeExist) {
    router.push({ name, params })
  }
}

function checkRouteName (routes, routeName) {
  return routes.some(route => {
    if (route.name === routeName) {
      return true
    }
    if (route.children && route.children.length > 0) {
      return checkRouteName(route.children, routeName)
    }
    return false
  })
}
