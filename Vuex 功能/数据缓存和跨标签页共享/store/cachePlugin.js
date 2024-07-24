import { isObject, merger, removeObserve, setItem, getItem } from '@/utils/utils'

// const get = (data, path) => {
//   return path.split('/').reduce((obj, key) => {
//     return obj && obj[key]
//   }, data)
// }

// const set = (data, path, val) => {
//   const ps = path.split('/')
//   const obj = ps.slice(0, -1).reduce((obj, key) => {
//     return obj[key] ? obj[key] : {}
//   }, data)
//   obj[ps.pop()] = val

//   return data
// }

export default ({ prefix = '__vuex__', lm = [] }) => {
  return store => {
    const lmfn = key => {
      const cacheData = getItem(`${prefix}${key}`)
      if (isObject(cacheData)) {
        const state = merger(removeObserve(store.state[key]), cacheData)
        store.state[key] = state
      }
    }

    lm.forEach(lmfn)

    store.replaceState(store.state)

    // 每次mutation时会调用store.subscribe
    store.subscribe((mutation, state) => {
      const { type } = mutation
      lm.forEach(m => {
        if (type.startsWith(m)) {
          setItem(`${prefix}${m}`, state[m])
        }
      })
    })
  }
}
