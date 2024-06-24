const toString = Object.prototype.toString
export const isObject = v => toString.call(v) === '[object Object]'
export const isArray = v => toString.call(v) === '[object Array]'

export const merger = (...objs) => {
  const res = {}

  const clone = obj => {
    for (const key in obj) {
      if (isObject(obj[key])) {
        res[key] = merger(res[key], obj[key])
      } else {
        res[key] = obj[key]
      }
    }
  }

  for (let i = 0; i < objs.length; i++) {
    clone(objs[i])
  }

  return res
}
