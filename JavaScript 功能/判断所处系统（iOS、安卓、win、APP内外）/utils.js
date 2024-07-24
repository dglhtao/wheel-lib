
// Window userAgent
export const UA = () => {
  return window.navigator.userAgent
}

// Checks if in the IOS
export const isIOS = () => {
  return /iphone|ipad|ipod/i.test(UA())
}

// Checks if in the Android
export const isAndroid = () => {
  return /android/i.test(UA())
}

// Checks if in Client
export const isWin = () => {
  return typeof window !== 'undefined'
}

// Checks if in the APP
export const isAPP = () => {
  return isWin() && (/APP标识1/i.test(UA()) || /APP标识2/i.test(UA()))
  // return isWin() && (/n8Web/i.test(UA()) || /JZDYH5/i.test(UA()))
}
