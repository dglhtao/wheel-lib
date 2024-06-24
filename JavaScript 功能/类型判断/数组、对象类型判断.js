const toString = Object.prototype.toString
export const isObject = v => toString.call(v) === '[object Object]'
export const isArray = v => toString.call(v) === '[object Array]'
