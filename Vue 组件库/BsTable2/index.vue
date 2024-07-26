<template>
  <div class="bs-table2">
    <div class="bs-table2-container">
      <table class="has-fix">
        <BsTableColgroup :column="column" />
        <BsTableBody
          :column="column" :data="data" :haveSafeLine="haveSafeLine"
          :startIndex="startIndex" :showLen="showLen" :itemHeight="itemHeight"
          v-on="$listeners"
        >
          <template v-for="(slot, name) in $scopedSlots" v-slot:[name]="slotProps">
            <slot v-if="slot" :name="name" v-bind="slotProps"></slot>
          </template>
        </BsTableBody>
        <BsTableHeader
          :column="column" :settingBtn="settingBtn" :sortColumn="sortColumn"
          v-on="{ ...$listeners, clickSortBtn }"
        />
      </table>
    </div>
  </div>
</template>
<script>
import './index.scss'
import BsTableColgroup from './components/BsTableColgroup'
import BsTableHeader from './components/BsTableHeader'
import BsTableBody from './components/BsTableBody'
import { throttle } from '@/utils/utils'
import Bs from 'better-scroll'
import { mapGetters } from 'vuex'

export default {
  name: 'BsTable2',

  components: {
    BsTableColgroup,
    BsTableHeader,
    BsTableBody
  },
  props: {
    column: {
      type: Array,
      default: () => ([])
    },
    data: {
      type: Array,
      default: () => ([])
    },
    loading: {
      type: Boolean,
      default: false
    },
    scrollTop: {
      type: Number,
      default: 0
    },
    scrollLeft: {
      type: Number,
      default: 0
    },
    settingBtn: {
      type: Boolean,
      default: false
    },
    sortColumn: {
      type: Object,
      default: () => ({ show: false, slot: '', dir: '' })
    },
    haveSafeLine: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      clientWidth: 375,
      clientHeight: 500,
      onscrollEvent: throttle(this.onscroll, 100),
      bsTable: null,
      dataLen: 0,
      timer1: null,
      timer2: null,
      startIndex: 0
    }
  },
  computed: {
    ...mapGetters({
      pxMulti: 'loginData/pxMulti'
    }),
    itemHeight () {
      return document.querySelector('td')?.clientHeight || (120 * this.pxMulti)
    },
    showLen () {
      return this.itemHeight !== 0 ? this.clientHeight / this.itemHeight : 100
    }
  },
  watch: {
    data (newVal, oldVal) {
      // 从空表到有数据
      if (oldVal.length === 0 && newVal.length !== 0) {
        this.$nextTick(() => {
          console.log('dataChange')
          if (this.bsTable) { this.resetXY() }
          this.initBs()
        })
      } else
      // 持仓数变化（或loading)
      if (this.bsTable && newVal.length !== this.dataLen) {
        this.$nextTick(() => {
          this.bsTable.refresh()
        })
      }
      this.dataLen = newVal.length
    }
  },
  mounted () {
    this.dataLen = this.data.length
    this.clientWidth = this.$el.querySelector('.bs-table2-container').clientWidth
    this.clientHeight = this.$el.querySelector('.bs-table2-container').clientHeight
    this.$nextTick(() => {
      if (this.timer1 === -1) { return }
      this.timer1 = setTimeout(() => {
        console.log('init')
        this.initBs()
        this.resetXY()
      }, 0)
      if (this.timer2 === -1) { return }
      this.timer2 = setTimeout(() => {
        console.log('init')
        this.initBs()
        this.resetXY()
      }, 400)
    })
  },
  beforeDestroy () {
    this.timer1 = -1
    this.timer2 = -1
  },
  methods: {
    // 初始化表格
    initBs () {
      console.log('initBs')
      this.bsTable = new Bs('.bs-table2-container', {
        bounce: false,
        preventDefault: false,
        scrollX: true,
        scrollY: true,
        startX: this.scrollLeft,
        startY: this.scrollTop,
        useTransition: false,
        freeScroll: false,
        probeType: 3
      })
      // 滚动事件
      this.bsTable.on('scroll', (pos) => {
        this.startIndex = Math.floor((-pos.y) / this.itemHeight)
        this.setStatus(pos.x, pos.y)
        this.onscrollEvent(pos) // 慢响应事件
      })
    },
    // 更新位置
    resetXY () {
      console.log('resetXY')
      this.bsTable.scrollTo(this.scrollLeft, this.scrollTop, 300, undefined, undefined)
      this.setStatus(this.scrollLeft, this.scrollTop)
    },

    // 慢响应事件
    onscroll (pos) {
      const scrollTop = 0 - pos.y
      const scrollHeight = this.$el.querySelector('.bs-table2-container').scrollHeight
      if (scrollTop + this.clientHeight * 2 + 50 > scrollHeight) {
        this.$emit('loadingData')
        // console.log('loading')
        if (!this.loading) {
          this.$emit('load')
        }
      }
      // 记录位置
      this.$emit('setScrollTopLeft', { scrollTop: pos.y, scrollLeft: pos.x })
    },

    // 滚动后状态设置
    setStatus (posX, posY) {
      const transX = 'translateX(' + (0 - posX) + 'px)'
      const transY = 'translateY(' + (0 - posY) + 'px)'
      // const transX = ''
      // const transY = ''
      // 首列
      this.$el.querySelectorAll('.fix-left').forEach(element => {
        element.style.transform = transX
      })
      // 首行
      this.$el.querySelector('.bs-table2-thead').style.transform = transY
      // 表格首列加阴影
      const table = this.$el.querySelector('table')
      if (posX !== 0) {
        table.className = 'has-fix'
      } else {
        table.className = ''
      }
      // 点击项
      const op = this.$el.querySelector('.bs-table2-op')
      if (op) { op.style.transform = transX }
      // 判断最左/右端（滑动）
      this.horizontalSlide(posX)
    },

    // 判断是否滑动最左右端
    horizontalSlide (x) {
      const container = this.$el.querySelector('.bs-table2-container')
      this.$emit('horizontalSlide', {
        toLeft: Math.abs(x) <= 10,
        toRight: Math.abs(x) + container.clientWidth >= container.scrollWidth - 10
      })
    },

    clickSortBtn (slot) {
      this.$emit('clickSortBtn', slot)
    }
  }
}
</script>
<style lang="scss" scope>
</style>
