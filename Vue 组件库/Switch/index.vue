<template>
  <div ref="switch" class="switch" :class="[{'active-bg' : value, 'disabled-style' : disabled}, type]" @click="clickEvent">
    <div ref="slide-block" class="slide-block"></div>
  </div>
</template>

<script>
import { isIOS } from '@/utils/utils'

export default {
  name: 'Switch',

  props: {
    value: {
      type: Boolean,
      default: false,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      switchWidth: null,
      blockWidth: null,
      blockLeft: null,
      isIOS: isIOS()
    }
  },

  watch: {
    value () {
      this.changeBtn()
    }
  },

  mounted () {
    this.switchWidth = this.$refs['switch'].clientWidth
    this.blockWidth = this.$refs['slide-block'].clientWidth
    const blockMarginStr = getComputedStyle(this.$refs['slide-block'], null).marginLeft
    this.blockMargin = Number(blockMarginStr.slice(0, blockMarginStr.length - 2))
    this.changeBtn()
    // console.log(this.switchWidth, this.blockWidth, blockMarginStr.slice(0, blockMarginStr.length - 2))
  },

  methods: {
    clickEvent () {
      if (this.disabled) { return }
      this.$emit('click')
    },
    changeBtn () {
      if (this.value) {
        if (!this.isIOS) {
          this.$refs['slide-block'].style.left = (this.switchWidth - this.blockWidth - 4 * this.blockMargin + 1) + 'px'
        } else {
          this.$refs['slide-block'].style.left = (this.switchWidth - this.blockWidth - 4 * this.blockMargin + (this.type === 'ctrigger-price27-switch' ? 1 : 0)) + 'px'
        }
      } else {
        this.$refs['slide-block'].style.left = ''
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.switch {
  width: 80px;
  height: 48px;
  // padding: 3.1px;
  // background: var(--color11);
  background: var(--color5);
  border-radius: 24px;
  position: relative;
  transition: background-color .3s;
  cursor: pointer;
}
.active-bg {
  background: #FD263F;
}
.slide-block {
  width: 41.81px;
  height: 41.81px;
  margin: 3.1px;
  background: #FFFFFF;
  box-shadow: 0px 4px 2px 0px rgba(0,0,0,0.0600), 0px 4px 12px 0px rgba(0,0,0,0.1500);
  border: 1px solid rgba(0,0,0,0.0400);
  box-sizing: border-box;
  border-radius: 50%;
  position: absolute;
  left: 0;
  top: 0;
  transition: left .3s;
}
.disabled-style {
  cursor: not-allowed;
  opacity: .5;
}
.ctrigger-price27-switch {
  height: 32px;
  width: 60px;
  .slide-block {
    height: 26px;
    width: 26px;
  }
}
</style>
