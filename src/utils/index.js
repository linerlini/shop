function getDecimal(value) {
  const valueStr = `${value}`
  if (valueStr.includes('.')) {
    return valueStr.split('.')[1]
  }
  return ''
}
export function add(v1, v2) {
  const decimal1 = getDecimal(v1)
  const decimal2 = getDecimal(v2)
  const maxDecimalLength = Math.max(decimal1.length, decimal2.length)
  const rate = 10 ** maxDecimalLength
  const integerV1 = v1 * rate
  const integerV2 = v2 * rate
  return (integerV1 + integerV2) / rate
}
export function sub(v1, v2) {
  return add(v1, -1 * v2)
}
export const CouponTimeStatus = {
  AVAILABLE: 'available',
  OUT: 'out',
  BEFORE: 'before',
}
export function validateCouponTime(startTime, endTime) {
  const startTimeStamp = new Date(startTime).valueOf()
  const endTimeStamp = new Date(endTime).valueOf()
  const curTimeStamp = Date.now()
  if (startTimeStamp > curTimeStamp) {
    return CouponTimeStatus.BEFORE
  }
  if (endTimeStamp < curTimeStamp) {
    return CouponTimeStatus.OUT
  }
  return CouponTimeStatus.AVAILABLE
}
export function numberToStr(value) {
  return value > 10 ? `${value}` : `0${value}`
}
export function formatTime(timeStr) {
  const date = new Date(timeStr)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${numberToStr(month)}-${numberToStr(day)}`
}
