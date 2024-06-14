<template>
  <div class="input-number flex" :class="[type, disabled ? 'disabled' : '']">
    <div v-if="type !== 'priceRange'" class="jian flex" @click="handleDown">
      <div class="icon icon-jian2 icon-inp"></div>
    </div>
    <div :class="['input-number-box', numColor]">
      <span v-if="currentValue !== '' && (leftStr !== '' || rightStr !== '')" class="boxStr box-left" :class="{'long-box-left': longBox}">{{leftStr}}</span>
      <input class="input" :class="{'iOSInput' : isIOS}" maxlength="20" :disabled="disabled" :placeholder="placeholder"
        :value="currentValue" @change="handleChange" @focus="handleFocus" @keydown="handleEnter" @blur="handleBlur" type="number" />
      <span v-if="currentValue !== '' && (leftStr !== '' || rightStr !== '')" class="boxStr box-right" :class="{'long-box-right': longBox}">{{rightStr}}</span>
    </div>
    <div v-if="type !== 'priceRange'" class="jia flex" @click="handleUp">
      <div class="icon icon-jia2 icon-inp"></div>
    </div>
    <div class="toast" :class="{'toast-black' : !isWhite}" v-show="toast">{{toastValue}}</div>
  </div>
</template>

<script>
import { add, sub, toFixed, isIOS } from '@/utils/utils'
import { mapGetters } from 'vuex'
const isValueNumber = value => (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1})$/).test(value + '')

export default {
  name: 'InputNumber1',
  props: {
    max: {
      type: Number,
      default: 1000000000.00
      // default: Infinity
    },
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 0.01
    },
    digit: {
      type: Number,
      default: 2
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    value: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Number,
      default: ''
    },
    toastValue: {
      type: String,
      default: ''
    },
    styles: {
      type: Object,
      require: false,
      default: () => ({})
    },
    type: {
      type: String,
      default: 'rise'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    leftStr: {
      type: String,
      default: ''
    },
    rightStr: {
      type: String,
      default: ''
    },
    numColor: {
      type: String,
      default: ''
    },
    longBox: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      currentValue: '',
      timer: null,
      toast: false,
      isIOS: isIOS()
    }
  },
  computed: {
    ...mapGetters({
      isWhite: 'baseInfo/isWhite'
    })
  },

  mounted () {
    this.updateValue(this.value)
  },

  watch: {
    currentValue (val) {
      this.$emit('change', val)
      this.$emit('input', val)
    },

    value (val) {
      this.updateValue(val)
    },

    toastValue (val) {
      this.showToast()
    }
  },

  methods: {
    handleDown () {
      if (this.disabled) return
      this.$emit('manual')
      if (this.currentValue <= this.min) {
        this.currentValue = ''
        return
      }
      const v = sub(this.currentValue, this.step)
      this.currentValue = toFixed(v, this.digit)
    },

    handleUp () {
      if (this.disabled) return
      this.$emit('manual')
      if (this.currentValue >= this.max) return
      const v = add(this.currentValue, this.step)
      this.currentValue = toFixed(v, this.digit)
    },

    updateValue (val) {
      if (val === '') {
        this.currentValue = val
        return
      }
      if (val > this.max) val = this.max
      if (val < this.min) val = this.min
      this.currentValue = toFixed(val, this.digit)
    },

    showToast () {
      this.toast = false
      if (['', '0.00', '0.00%'].includes(this.toastValue)) return
      this.toast = true
      clearTimeout(this.timer)

      this.timer = setTimeout(() => {
        this.toast = false
      }, 2000)
    },

    handleChange (e) {
      this.$emit('manual')
      const { max, min } = this
      let val = e.target.value.trim()
      if (val === '') {
        this.currentValue = val
        e.target.value = this.currentValue
        return
      }
      if (isValueNumber(val)) {
        val = Number(val)
        let v = val
        if (val > max) {
          v = max
        } else if (val < min) {
          v = min
        }
        this.currentValue = toFixed(v, this.digit)
        e.target.value = this.currentValue
      } else {
        e.target.value = this.currentValue
      }
    },

    handleFocus () {
      this.$emit('manual')
    },
    handleBlur (e) {
      this.handleChange(e)
    },
    handleEnter (e) {
      if (e.keyCode === 13) {
        this.handleChange(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input-number {
  position: relative;
  box-sizing: border-box;
  position: relative;
  width: 100%;
  min-width: 250px;
  height: 64px;
  padding: 0 64px;
  border: 1px solid #FD263F;
  // border-radius: 8px;
  .input {
    width: 100%;
    height: 100%;
    font-size: 32px;
    font-weight: 600;
    text-align: center;
    // color: var(--color1);
    background: var(--color8);
  }
  .input::-webkit-input-placeholder {
    color: var(--color3);
    font-weight: 400;
  }
  .boxStr {
    background-color: var(--color8);
    font-size: 30px;
    min-width: 30px;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .box-left {
    // padding-left: 6px;
    padding-left: 15px;
    justify-content: flex-start;
  }
  .box-right {
    // padding-right: 6px;
    padding-right: 15px;
    justify-content: flex-end;
  }
  // .long-box-left {
  //   padding-left: 15px;
  // }
  // .long-box-right {
  //   padding-right: 15px;
  // }
  .red {
    color: #FD263F;
  }
  .green {
    color: #00AA3B;
  }
  .input-number-box {
    height: 100%;
    display: flex;
  }
  .jia, .jian {
    position: absolute;
    top: 0;
    bottom: 0;
    font-size: 28px;
    width: 64px;
    box-sizing: border-box;
    background-color: rgba(red, .1);
    border-color: #FD263F;
  }
  .jia {
    right: 0;
    // border-radius: 0 8px 8px 0;
    border-left: 2px solid #FD263F;
  }
  .jian {
    left: 0;
    // border-radius: 8px 0 0 8px;
    border-right: 2px solid #FD263F;
  }
  .icon-inp {
    color: #FD263F;
  }
  &.guard {
    border-color: #086FF9;
    .jia, .jian {
      background-color: rgba(#0569ff, .1);
      border-color: #086FF9;
    }
    .icon-inp {
      color: #086FF9;
    }
  }
  &.disabled {
    border-color: var(--color4);
    .input {
      color: var(--color4);
    }
    .input::-webkit-input-placeholder {
      color: var(--color4);
    }
    .jia, .jian {
      background-color: var(--color4-rgba3);
      border-color: var(--color4);
    }
    .icon-inp {
      color: var(--color4);
    }
    .iOSInput {
      color: var(--color1);
    }
  }
  .toast {
    position: absolute;
    padding: 0 10px;
    top: -58px;
    left: 50%;
    transform: translateX(-50%);
    min-width: 134px;
    height: 44px;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    // text-align: center;
    // line-height: 44px;
    color: #fff;
    border-radius: 8px;
    background-color: rgba(0, 0, 0, .7);
    &::after {
      content: '';
      position: absolute;
      top: 44px;
      left: 50%;
      transform: translateX(-50%);
      display: block;
      width: 0;
      border: 12px solid;
      border-color: rgba(0, 0, 0, .7) transparent transparent transparent;
    }
  }
  .toast-black {
    background-color: rgba(#666666, .7);
    &::after {
      border-color: rgba(#666666, .7) transparent transparent transparent;
    }
  }
}
.priceRange {
  min-width: 200px;
  // width: 208px;
  height: 64px;
  padding: 0;
  border: 1px solid var(--color5);
  border-radius: 4px;
  .input {
    background: var(--color10);
    border-radius: 4px;
  }
}
</style>
