export const toFixed = (num, fractionDigits = 2) => {
  return Number(num).toFixed(fractionDigits)
}

export const integerSign = (val, digit = 2) => {
  const num = Number(val)
  if (num > 0) {
    return `+${toFixed(num, digit)}`
  } else {
    return toFixed(num, digit)
  }
}

// 百分比
export const percentage = val => {
  return `${toFixed(val)}%`
}

// 正负百分比
export const signPercentage = val => {
  return Number(toFixed(val)) > 0 ? `+${toFixed(val)}%` : `${toFixed(val)}%`
}

export const getMarkColor = ({ num1, num2, mode = 1 }) => {
  let color = 'flat-color'
  switch (mode) {
    case 1:
      if (num1 === 1) {
        color = 'rise-color'
      }
      if (num1 === 2) {
        color = 'guard-color'
      }
      return color
    case 2:
      if (num1 > 0) {
        color = 'rise-color'
      }
      if (num1 < 0) {
        color = 'guard-color'
      }
      return color
    case 3:
      if (num1 < num2) {
        color = 'fall-color'
      } else if (num1 > num2) {
        color = 'rise-color'
      }
      return color
  }
}

export const getBsTypeColor = (val, suffix = 'color') => {
  let color = `flat-${suffix}`
  if (val === 1) {
    color = `rise-${suffix}`
  }
  if (val === 2) {
    color = `guard-${suffix}`
  }
  return color
}

export const getFlag = (num, suffix = 'color') => {
  let flag = `flat-${suffix}`
  if (num < 0) {
    flag = `fall-${suffix}`
  } else if (num > 0) {
    flag = `rise-${suffix}`
  }

  return flag
}

export const getFlag2 = (num1, num2, suffix = 'color') => {
  let flag = `flat-${suffix}`
  if (num1 < num2) {
    flag = `fall-${suffix}`
  } else if (num1 > num2) {
    flag = `rise-${suffix}`
  }

  return flag
}

export const getPrefixMark = val => {
  const mark = String(val).substr(0, 2)
  switch (true) {
    case ['60'].includes(mark):
      return '沪A'
    case ['00'].includes(mark):
      return '深A'
    case ['30'].includes(mark):
      return '创'
    case ['68'].includes(mark):
      return '科'
  }
}

// 中文单位数字
export const toChNum = (numStr) => {
  let sign = ''
  if (['-', '+'].includes(numStr[0])) {
    sign = numStr[0]
    numStr = numStr.slice(1, numStr.length)
  }
  let num = Number(numStr)
  const chNum = ['元', '万', '亿', '兆']
  const numBool = [false, false, false, false]
  let index = 0
  while (num > 0) {
    let val = num - Math.floor(num / 10000) * 10000
    if (val >= 0.01) {
      if (index === 0) {
        val = toFixed(val, 2)
        if (Math.abs(toFixed(val, 1) - toFixed(val, 2)) < 0.001) {
          val = toFixed(val, 1)
          if (Math.abs(toFixed(val, 0) - toFixed(val, 1)) < 0.01) { val = toFixed(val, 0) }
        }
      }
      chNum[index] = val + chNum[index]
      numBool[index] = true
    }
    num = Math.floor(num / 10000)
    index++
  }
  let strNum = ''
  for (index = 3; index > 0; index--) {
    if (numBool[index]) {
      strNum = strNum + chNum[index]
    }
  }
  strNum = strNum + chNum[0]
  if (strNum === '元') { strNum = '0' + strNum }
  strNum = strNum.slice(0, strNum.length - 1)
  return (sign + strNum)
}

export const num8toDate = (num8, insertStr = '.') => {
  const str = String(num8)
  return str.slice(0, 4) + insertStr + str.slice(4, 6) + insertStr + str.slice(6, 8)
}

export const second2Time = (second, len = 3) => {
  return `${Math.floor(second / 3600)}:${Math.floor(second % 3600 / 60)}:${Math.floor(second % 60)}`
    .split(':').map(item => item.length < 2 ? `0${item}` : item).slice(0, len).join(':')
}

export const time2Second = (timeStr) => {
  let second = 0
  const arr = [3600, 60, 1]
  timeStr.split(':').forEach((item, index) => {
    if (index > 2) { return }
    second += Number(item) * arr[index]
  })
  return second
}

const numFontSizeClass = {
  8: '',
  9: 'fs30',
  10: 'fs28',
  11: 'fs26',
  12: 'fs24',
  13: 'fs22',
  14: 'fs20',
  15: 'fs18',
  16: 'fs16'
}

export const numFontSize = (num, isCN = false, addSize = 0, maxSize = 9999) => {
  const str = String(num)
  let len = str.length
  if (isCN) {
    len = len * 2
    const numOrChar = /[0-9a-zA-z]/
    for (let index = 0; index < str.length; index++) {
      if (numOrChar.test(str[index])) {
        len -= 1
      }
    }
  }
  if (len < 8) { len = 8 }
  if (len > 16) { len = 16 }
  if (!numFontSizeClass[len]) { return '' }
  const fsNum = Math.min(Number(numFontSizeClass[len].slice(2)) + addSize, maxSize)
  return `fs${fsNum}`
}

export const numChLen = (str) => {
  str = String(str)
  let len = str.length
  len = len * 2
  const numOrChar = /[0-9a-zA-z]/
  for (let index = 0; index < str.length; index++) {
    if (numOrChar.test(str[index])) {
      len -= 1
    }
  }
  return len
}

export const getNumPart = (str) => {
  let num = ''
  for (let index = 0; index < str.length; index++) {
    if (/^[0-9]$/.test(str[index])) {
      num += str[index]
    }
  }
  return num
}

export const getCharPart = (str) => {
  let char = ''
  for (let index = 0; index < str.length; index++) {
    if (!/^[0-9]$/.test(str[index])) {
      char += str[index]
    }
  }
  return char
}
