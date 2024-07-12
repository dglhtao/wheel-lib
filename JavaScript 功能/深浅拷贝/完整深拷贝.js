const _completeDeepClone = (target, map = new Map()) => {
  // function及ES6对象，用构造函数创建新实例
  if ([Function, RegExp, Date, Set].includes(target.__proto__.constructor)) {
      return new target.__proto__.constructor(target)
  }
  if (typeof target !== 'object' || target === null) { return target }
  if (map.has(target)) { return map.get(target) }
  const obj = Array.isArray(target) ? [] : {}
  map.set(target, obj)
  for (let key in target) {
      obj[key] = _completeDeepClone(target[key], map)
  }
  return obj
}

// Eslint 不允许直接使用__proto__
export const deepClone = (data, map = new Map()) => {
  if (data === undefined || data === null) { return data }
  if ([Function, Set, RegExp, Date].includes(Object.getPrototypeOf(data).constructor)) {
    // 因为浏览器安全策略很多不允许 new Function()，所以可以视情况，对这类数据直接引用
    // return data
    return new (Object.getPrototypeOf(data).constructor)(data)
  }
  if (typeof data !== 'object') { return data }
  if (map.has(data)) { return map.get(data) }
  const target = Array.isArray(data) ? [] : {}
  map.set(data, target)
  for (const key in data) {
    target[key] = deepClone(data[key], map)
  }
  return target
}
