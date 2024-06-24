const toString = Object.prototype.toString
export const isObject = v => toString.call(v) === '[object Object]'
export const isArray = v => toString.call(v) === '[object Array]'

export const removeObserve = data => {
  const target = isArray(data) ? [] : {}

  if (isObject(data)) {
    for (const key in data) {
      target[key] = removeObserve(data[key])
    }
  }

  if (isArray(data)) {
    for (const key in data) {
      target[key] = removeObserve(data[key])
    }
    return target
  }

  if (!isObject(data) && !isArray(data)) {
    return data
  }

  return target
}

// 或

const _sampleDeepClone = target => {
  console.log(target)
  if (Array.isArray(target)) {
      const arr = []
      target.forEach(item => {
          arr.push(_sampleDeepClone(item))
      })
      return arr
  } else
  if (typeof target === 'object' && target !== null) {
      const set = {}
      Object.keys(target).forEach(key => {
          set[key] = _sampleDeepClone(target[key])
      })
      return set
  }
  return target
}