// 删除数组中首个（或全部）某元素
export const removeArrEl = (arr, val, all = false) => {
  const index = arr.indexOf(val)
  if (index > -1) {
    arr.splice(index, 1)
    if (all) {
      removeArrEl(arr, val, all)
    }
  }
}
