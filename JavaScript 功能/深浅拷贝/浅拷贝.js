const _shallowClone = target => {
    if (Array.isArray(target)) {
        const arr = []
        target.forEach(item => {
            arr.push(item)
        })
        return arr
    } else
    if (typeof target === 'function') {
        return target
    } else
    if (typeof target === 'object' && target !== null) {
        const set = {}
        Object.keys(target).forEach(key => {
            set[key] = target[key]
        })
        return set
    }
    return target
}
