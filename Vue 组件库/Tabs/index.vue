<template>
  <div>
    <!-- <div v-if="type !== 'scroll'" :class="[`${type}-tabs`,'flex', {'h96': h96}, {'Ctrigger-tabs-white': type === 'Ctrigger' && isWhite}]"> -->
    <div v-if="type !== 'scroll'" :class="[`${type}-tabs`, `${extendType}-tabs`, 'flex', {'h96': h96}, {'Ctrigger-tabs-white': type === 'Ctrigger'}]">
      <div class="tab flex flex-1"
      v-for="(item) in list" :key="item.key"
      :class="{active: current === item.key, 'h96': h96, 'blue-active': planType === 'guard'}"
      @click="handleTab(item.key)"
      :style="{...styles}"
        >{{item.name}}<span v-if="item.num" :class="{'rise-color': item.key === 'record'}">({{item.num}})</span></div>
    </div>
    <div v-else class="scroll-tab flex">
      <div ref="scrollBox" class="scroll-box">
        <div :class="[`${type}-tabs`, `${extendType}-tabs`]">
          <div :ref="item.key" class="tab flex flex-1"
          v-for="(item) in list" :key="item.key"
          :class="{active: current === item.key}"
          @click="handleTab(item.key)"
          :style="{...styles}"
            >{{item.name}}<span v-if="item.num" class="rise-color">({{item.num}})</span></div>
        </div>
      </div>
      <i ref="showScroll" class="icon icon-mulu f40c1 showScroll flex" @click="showScroll"></i>
    </div>
  </div>
</template>

<script>
import { throttle } from '@/utils/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'Tabs',

  props: {
    current: {
      type: String,
      default: 'buy'
    },
    list: {
      type: Array,
      default: () => ([])
    },
    styles: {
      type: Object,
      require: false,
      default: () => ({})
    },
    type: {
      type: String,
      default: 'default'
    },
    h96: {
      type: Boolean,
      default: false
    },
    extendType: {
      type: String,
      default: ''
    }
  },

  computed: {
    ...mapGetters({
      isWhite: 'baseInfo/isWhite',
      planType: 'planConfig/type'
    })
  },

  watch: {
    current (val) {
      if (this.$refs.scrollBox) {
        // this.$refs[this.current][0].offsetLeft
        // this.$refs[this.current][0].offsetLeft + this.$refs[this.current][0].clientWidth
        if ((this.$refs[this.current][0].offsetLeft < this.$refs.scrollBox.scrollLeft) ||
          (this.$refs[this.current][0].offsetLeft + this.$refs[this.current][0].clientWidth >
          this.$refs.scrollBox.scrollLeft + this.$refs.scrollBox.clientWidth)) {
          this.$refs.scrollBox.scrollLeft = this.$refs[this.current][0].offsetLeft
        }
      }
    }
  },

  mounted () {
    if (this.$refs.scrollBox) {
      this.scrollEvent()
      this.$refs.scrollBox.onscroll = throttle(this.scrollEvent, 10)
      this.$refs.scrollBox.scrollLeft = this.$refs[this.current][0].offsetLeft
    }
  },

  methods: {
    handleTab (key) {
      if (this.current === key) return
      this.$emit('change', key)
    },
    showScroll () {
      this.$emit('showScroll')
    },
    scrollEvent () {
      if (this.$refs.scrollBox.scrollLeft + this.$refs.scrollBox.clientWidth >= this.$refs.scrollBox.scrollWidth - 10) {
        this.$refs.showScroll.style.boxShadow = ''
      } else {
        this.$refs.showScroll.style.boxShadow = '-6px 0px 6px -6px rgba(0, 0, 0, 0.1)'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variable';
.default-tabs {
  height: 80px;
  display: flex;
  align-items: center;
  // line-height: 80px;
  // background-color: #fff;
  background-color: var(--color8);
  // border-bottom: 2px solid #E7E7E7;
  border-bottom: 2px solid var(--color5);

  .tab {
    position: relative;
    height: 80px;
    font-size: 32px;
    font-weight: 400;
    color: var(--color2);

    &.active {
      color: var(--color1);
      // font-weight: 500;
      font-weight: bold;

      &::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 60px;
        height: 4px;
        background-color: $buy-color;
      }
    }
  }
}

.buttom-tabs {
  overflow: hidden;
  width: 100%;
  height: 64px;
  border: 2px solid #FD263F;
  border-radius: 40px;
  // background-color: #fff;
  background-color: var(--color8);

  .tab {
    height: 100%;
    font-size: 28px;
    font-weight: 400;
    color: var(--color2);

    &.active {
      font-weight: bold;
      font-weight: 500;
      color: #fff;
      background-color: #FD263F;
    }
  }
}
.scroll-tab {
  height: 80px;
  // line-height: 80px;
  background-color: var(--color8);
  border-bottom: 2px solid var(--color5);
  .scroll-box {
    width: calc(100% - 100px);
    overflow-x: auto;
    overflow-y: hidden;
    .scroll-tabs {
      height: 78px;
      display: flex;
      align-items: center;
      // height: 80px;
      // line-height: 78px;
      // background-color: var(--color8);
      // border-bottom: 2px solid var(--color5);
      min-width: fit-content;
      // width: calc(50vw * 11);
      white-space: nowrap;
      display: flex;
      // overflow-x: auto;
      // overflow-y: hidden;
      // display: flex;
      // flex: nowrap;
      .tab {
        // width: 25vw;
        width: fit-content;
        padding-left: 25px;
        padding-right: 25px;
        position: relative;
        height: 78px;
        font-size: 32px;
        font-weight: 400;
        color: var(--color2);

        &.active {
          color: var(--color1);
          font-weight: bold;

          &::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
            width: 60px;
            height: 4px;
            background-color: $buy-color;
          }
        }
      }
    }
  }
  .showScroll {
    width: 100px;
  }
}
.login-tabs {
  min-height: 64px;
  min-width: 192px;
  display: flex;
  align-items: center;
  .tab {
    width: 96px;
    height: 64px;
    font-size: 32px;
    color: var(--color3);
    &.active {
      background-color: var(--color9);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      color: #FD263F;
      font-weight: 500;
    }
  }
}
.showChNum-tabs {
  min-height: 56px;
  min-width: 176px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  .tab {
    width: 88px;
    height: 56px;
    font-size: 32px;
    color: var(--color3);
    &.active {
      background-color: var(--color9);
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      color: #FD263F;
      font-weight: 500;
    }
  }
}
.Ctrigger-tabs {
  height: 64px;
  width: 480px;
  background: var(--color10);
  border-radius: 8px;
  .tab {
    box-sizing: border-box;
    font-size: 28px;
    height: 100%;
    border-radius: 8px;
    // border: 1px solid var(--color10);
    color: var(--color2);
    &.active {
      // border: 1px solid var(--color5);
      background: var(--color9);
      font-weight: 500;
      color: #FD263F;
    }
    &.active.blue-active {
      color: #086FF9;
    }
  }
}
.Ctrigger-tabs-white {
  .tab {
    border: 4px solid var(--color10);
    &.active {
      border: 4px solid var(--color10);
    }
  }
}
// .CompetitionList-tabs {
//   width: 100%;
//   height: 88px;
//   border-radius: 16px 16px 0 0;
//   border-bottom: 0;
//   .tab {
//     height: 88px;
//   }
// }
.subscribe-tabs {
  width: 100%;
  height: 88px;
  border-radius: 16px 16px 0 0;
  .tab {
    height: 88px;
  }
  // border-bottom: 1px solid var(--color5);
}
.subscribe-plan-tabs {
  width: 100%;
  height: 88px;
  border-radius: 16px 16px 0 0;
  background: var(--color10);
  .tab {
    height: 88px;
  }
  // border-bottom: 1px solid var(--color5);
}

.strategy-tabs {
  height: 120px;
  border-radius: 16px 16px 0px 0px;
  // background: #FD263F;
  background: rgba(#FD263F, .5);
  border-bottom: 0;

  .tab {
    height: 120px;
    color: #FFFFFF;
    padding-bottom: 32px;
    &.active {
      height: 120px;
      font-weight: 500;
      color: #FFFFFF;
      background: #FD263F;
      border-radius: 16px 16px 0px 0px;
      &::after {
        z-index: 999 !important;
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border: 12px solid transparent;
        border-bottom-color: var(--color10);
        bottom: 31px;
      }
    }
  }
}

.strategy-details-tabs {
  height: 88px;
  border: 0;
  border-radius: 16px;
  .tab {
    height: 88px;
  }
}

.h96 {
  height: 96px !important;
}
</style>
