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
