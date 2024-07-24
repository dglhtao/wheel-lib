// 精度缺失：除(1/2)^n和任意(1/2)^n累加所得的小数外，在二进制下其它小数以无限循环或无限不循环形式存储，会有精度缺失的问题
// 解决原理：将小数转换为整数四则运算后，再恢复成小数

const getDigitLen = (num) => {
  return (num.toString().split('.')[1] || '').length
}

export const mul = (num1, num2) => {
  const digitLen = getDigitLen(num1) + getDigitLen(num2)
  const baseNum = Math.pow(10, digitLen)
  return Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', '')) / baseNum
}

export const add = (num1, num2) => {
  const digitLen = Math.max(getDigitLen(num1), getDigitLen(num2))
  const baseNum = Math.pow(10, digitLen)
  return (mul(num1, baseNum) + mul(num2, baseNum)) / baseNum
}

export const sub = (num1, num2) => {
  const digitLen = Math.max(getDigitLen(num1), getDigitLen(num2))
  const baseNum = Math.pow(10, digitLen)
  return (mul(num1, baseNum) - mul(num2, baseNum)) / baseNum
}

export const divi = (num1, num2) => {
  const digitLen = Math.max(getDigitLen(num1), getDigitLen(num2))
  const baseNum = Math.pow(10, digitLen)
  return mul(num1, baseNum) / mul(num2, baseNum)
}
