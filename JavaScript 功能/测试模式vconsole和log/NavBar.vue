<template>
  
</template>
<script>
export default {
  data () {
    return {
      timer: null
    }
  },
  methods: {
    // 预设机制1秒内点击某处十次，则唤醒VConsole一小时
    // 切换环境
    handleEnv () {
      clearTimeout(this.timer)
      this.time++
      if (this.time === 10) {
        // eslint-disable-next-line no-new
        new window.VConsole()
        localStorage.setItem('show_console', new Date().getTime() + 3600000)
        console.log('version', this.version)
        console.log('clientVersion', this.clientVersion)
      }
      this.timer = setTimeout(() => {
        this.time = 0
      }, 1000)
    },
  }
}
</script>