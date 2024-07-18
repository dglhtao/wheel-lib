import Vue from 'vue'

Vue.directive('lazy', {
  bind (el, binding) {
    const { lazy, src = '' } = binding.value
    if (!lazy) {
      if (!el.getAttribute('src')) {
        el.setAttribute('src', src)
      }
      return
    }
    // el.setAttribute('src', '默认图片')
    const observer = new IntersectionObserver((entries) => {
      if (entries[0] && entries[0].isIntersecting) {
        el.setAttribute('src', src)
        observer.unobserve(el)
      }
    }, { // options支持root, rootMargin, threshold。rootMargin不支持正数
      rootMargin: '0px 0px -10px 0px'
    })
    observer.observe(el)
  }
})

// 使用
// <img v-lazy="{ lazy: true, src: require('@/assets/images/buy.png') }" />
