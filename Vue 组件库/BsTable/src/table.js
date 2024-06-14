import './index.scss'
import BsTableColgroup from './table-colgroup'
import BsTableHeader from './table-header'
import BsTableBody from './table-body'
import { throttle } from '@/utils/utils'
import Bs from 'better-scroll'

export default {
  name: 'BsTable',

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
      timer2: null
    }
  },

  mounted () {
    this.dataLen = this.data.length
    this.clientWidth = this.$el.querySelector('.bs-table-container').clientWidth
    this.clientHeight = this.$el.querySelector('.bs-table-container').clientHeight
    this.$nextTick(() => {
      if (this.timer1 === -1) { return }
      this.timer1 = setTimeout(() => {
        // console.log('init')
        this.initBs()
        this.resetXY()
      }, 0)
      if (this.timer2 === -1) { return }
      this.timer2 = setTimeout(() => {
        // console.log('init')
        this.initBs()
        this.resetXY()
      }, 400)
    })
  },
  beforeDestroy () {
    this.timer1 = -1
    this.timer2 = -1
  },

  watch: {
    data (newVal, oldVal) {
      // console.log('oldVal', oldVal.length, 'newVal', newVal.length)
      // 从空表到有数据
      if (oldVal.length === 0 && newVal.length !== 0) {
        this.$nextTick(() => {
          if (this.bsTable) { this.resetXY() }
          this.initBs()
        })
      } else
      // 持仓数变化（或loading)
      if (this.bsTable && newVal.length !== this.dataLen) {
        this.$nextTick(() => {
          this.bsTable.refresh()
        })
        // console.log('refresh', this.dataLen, newVal.length)
      }
      this.dataLen = newVal.length
    }
  },

  methods: {
    initBs () {
      this.bsTable = new Bs('.bs-table-container', {
        bounce: false,
        preventDefault: false,
        scrollX: true,
        scrollY: true,
        startX: this.scrollLeft,
        startY: this.scrollTop,
        useTransition: false,
        // freeScroll: true,
        freeScroll: false,
        probeType: 3
      })
      // 滚动事件
      this.bsTable.on('scroll', (pos) => {
        this.$emit('isScroll')
        const transX = 'translateX(' + (0 - pos.x) + 'px)'
        const transY = 'translateY(' + (0 - pos.y) + 'px)'
        // 首列
        this.$el.querySelectorAll('.fix-left').forEach(element => {
          element.style.transform = transX
        })
        // 首行
        this.$el.querySelector('.bs-table-thead').style.transform = transY
        // 表格首列加阴影
        const table = this.$el.querySelector('table')
        if (pos.x !== 0) {
          table.className = 'has-fix'
        } else {
          table.className = ''
        }
        // 点击项
        const op = this.$el.querySelector('.bs-table-op')
        if (op) { op.style.transform = transX }
        // 判断最左/右端（滑动）
        this.horizontalSlide(pos.x)

        // 慢响应事件
        this.onscrollEvent(pos)
      })
    },
    // 慢响应事件
    onscroll (pos) {
      const scrollTop = 0 - pos.y
      const scrollHeight = this.$el.querySelector('.bs-table-container').scrollHeight
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

    // 更新位置
    resetXY () {
      this.bsTable.scrollTo(this.scrollLeft, this.scrollTop, 300, undefined, undefined)
      if (this.scrollLeft !== 0) {
        const transX = 'translateX(' + (0 - this.scrollLeft) + 'px)'
        // 首列
        this.$el.querySelectorAll('.fix-left').forEach(element => {
          element.style.transform = transX
        })
        // 阴影
        this.$el.querySelector('table').className = 'has-fix'
        // 点击项
        const op = this.$el.querySelector('.bs-table-op')
        if (op) { op.style.transform = transX }
      }
      if (this.scrollTop !== 0) {
        const transY = 'translateY(' + (0 - this.scrollTop) + 'px)'
        // 首行
        this.$el.querySelector('.bs-table-thead').style.transform = transY
      }
      // 左右端
      this.horizontalSlide(this.scrollLeft)
    },

    // 滑动最左右端
    horizontalSlide (x) {
      const container = this.$el.querySelector('.bs-table-container')
      this.$emit('horizontalSlide', {
        toLeft: Math.abs(x) <= 10,
        toRight: Math.abs(x) + container.clientWidth >= container.scrollWidth - 10
      })
    },
    handleScrollTop () {
      this.$refs['bs-table-container'].scrollTop = 0
    },
    handleSlot (slotName, row) {
      const slot = this.$scopedSlots[slotName]
      if (slot) {
        return slot(row)
      }
    },
    handleTouchend (e) {
      // const tcEL = this.$el.querySelector('.bs-table-container')
      // const cols = this.$el.querySelectorAll('colgroup > col')
      // let width = 0

      // for (let i = 0; i < cols.length; i++) {
      //   const col = cols[i]
      //   width += col.clientWidth
      //   if (tcEL.scrollLeft > width / 2) {
      //     return tcEL.scrollTo({
      //       behavior: 'smooth',
      //       left: width,
      //       top: tcEL.scrollTop
      //     })
      //   }
      //   tcEL.scrollTo({
      //     behavior: 'smooth',
      //     left: 0,
      //     top: tcEL.scrollTop
      //   })
      // }
    },
    clickSortBtn (slot) {
      this.$emit('clickSortBtn', slot)
    }
  },

  render () {
    return (
      <div class="bs-table">
        <div ref="bs-table-container" class="bs-table-container" ontouchend={this.handleTouchend}>
          <table>
            <BsTableColgroup columns={this.column} />
            <BsTableBody columns={this.column}
              data={this.data}
              scopedSlots={this.$scopedSlots}
              clientWidth={this.clientWidth}
              haveSafeLine={this.haveSafeLine}
              on={this.$listeners} />
            <BsTableHeader columns={this.column}
              settingBtn={this.settingBtn}
              sortColumn={this.sortColumn}
              on={{ ...this.$listeners, clickSortBtn: this.clickSortBtn }} />
          </table>
          {this.data.length === 0 && this.handleSlot('empty')}
        </div>
      </div>
    )
  }
}
