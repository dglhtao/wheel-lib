import Vue from 'vue'

Vue.directive('lazy', {
  bind (el, binding) {
    const dataSrc = el.getAttribute('data-src')
    if (dataSrc = undefined) { return }
    const src = el.getAttribute('src')
    if (!src) { el.setAttribute('src', '默认图片') }
    const observer = new IntersectionObserver((entries) => {
      if (entrise[0] && entries[0].isIntersecting) {
        el.setAttribute('src', dataSrc)
        observer.unobserve(el)
      }
    }, { // options支持root, rootMargin, threshold。rootMargin不支持正数
      rootMargin: '0px 0px -10px 0px'
    })
  }
})

// 使用
// <img v-lazy data-src="@/assets/images/buy.png" />
