// ES6
export const uniqueArray = arr => {
  return [...new Set(arr)]
}

//ES5
export const uniqueArrayES5 = function (arr) {
  return arr.filter(function (value, index, self) {
    return self.indexOf(value) === index
  })
}
