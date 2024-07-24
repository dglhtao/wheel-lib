const to2 = (val) => {
  val = val.toString()
  return val.length > 1 ? val : '0' + val
}

export const getDateInfo = (date = new Date()) => {
  const YYYY = date.getFullYear().toString()
  const YY = YYYY.toString().slice(2)
  const M = (date.getMonth() + 1)
  const D = date.getDate()
  const H = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()

  const MM = to2(M)
  const DD = to2(D)
  const HH = to2(H)
  const mm = to2(m)
  const ss = to2(s)

  const ms = date.getMilliseconds() // 不可format
  const time = date.getTime() // 不可format

  const dCNArr = ['日', '一', '二', '三', '四', '五', '六']
  const ddddArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const d = date.getDay()
  const dCN = dCNArr[date.getDay()]  // 不可format
  const dd = ddddArr[date.getDay()].slice(0, 2)
  const ddd = ddddArr[date.getDay()].slice(0, 3)
  const dddd = ddddArr[date.getDay()]
  return { YYYY, MM, DD, HH, mm, ss, ms, time, d, dCN, dd, ddd, dddd, YY, M, D, H, m, s}
}

export const myFormat = (date = new Date(), str = 'YYYY-MM-DD HH:mm:ss dddd') => {
  const set = getDateInfo(date)
  const priority = ['YYYY', 'MM', 'DD', 'HH', 'mm', 'ss', 'YY', 'M', 'D', 'H', 'm', 's', 'dddd', 'ddd', 'dd', 'd']
  for (let index = 0; index < priority.length; index++) {
    const item = priority[index]
    const reg = new RegExp(item, 'g')
    if (['ddd', 'dddd'].includes(item)) {
      const key = 'D'.repeat(item.length)
      set[key] = set[item];
      set[item] = key
      priority.push(key)
    }
    str = str.replace(reg, set[item])
  }
  return str
}

