// Get client version
export const clientVersion = () => {
  if (isAPP()) {
    try {
      if (isIOS()) {
        const index = UA().indexOf('iOS_') + 4
        if (index - 4 === -1) {
          throw new Error('appVersion has no "iOS_"')
        }
        const versionSliceStr = UA().slice(index, index + 10)
        const versionStrList = (/[0-9]\d*\.[0-9]\d*\.[0-9]\d*/).exec(versionSliceStr)
        if (versionStrList !== null) {
          return versionStrList[0]
        }
        throw new Error('appVersion has no client version')
      } else
      if (isAndroid()) {
        const index = UA().indexOf('android_') + 8
        if (index - 8 === -1) {
          throw new Error('appVersion has no "android_"')
        }
        const versionSliceStr = UA().slice(index, index + 10)
        const versionStrList = (/[0-9]\d*\.[0-9]\d*\.[0-9]\d*/).exec(versionSliceStr)
        if (versionStrList !== null) {
          return versionStrList[0]
        }
        throw new Error('appVersion has no client version')
      }
    } catch (err) {
      console.log('=== clientVersion error ===', err)
      return false
    }
  }
  return false
}

// 仅大于某版本号时返回true
export const afterClientVersion = (clientVersion, settingVersion = '6.42.99') => {
  if (!/^\d+\.\d+\.\d+$/.test(clientVersion)) { return false }
  const clientArr = clientVersion.split('.')
  const settingArr = settingVersion.split('.')
  for (let index = 0; index < clientArr.length; index++) {
    if (Number(clientArr[index]) > Number(settingArr[index])) {
      return true
    } else
    if (Number(clientArr[index]) < Number(settingArr[index])) {
      return false
    }
  }
  return false
}
