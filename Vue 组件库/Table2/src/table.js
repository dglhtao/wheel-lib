import './index.scss'
import TableColgroup from './table-colgroup'
import TableHeader from './table-header'
import TableBody from './table-body'
import { throttle } from '@/utils/utils'

// column:
// -- label

export default {
  name: 'Table2',

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
    lastHeight: {
      type: Boolean,
      default: true
    },
    settingBtn: {
      type: Boolean,
      default: false
    },
    sortColumn: {
      type: Object,
      default: () => ({ show: false, slot: '', dir: '' })
    }
  },

  data () {
    return {
      clientWidth: 375,
      onscrollEvent: throttle(this.onscroll, 100),
      opTop: 10000,
      oldIndex: -1
    }
  },

  mounted () {
    const tcEL = this.$el.querySelector('.table-container')
    this.clientWidth = tcEL.clientWidth
    this.$refs['table-container'].scrollTop = this.scrollTop
    this.$refs['table-container'].scrollLeft = this.scrollLeft
    this.$emit('horizontalSlide', {
      toLeft: this.scrollLeft <= 10,
      toRight: this.scrollLeft + this.clientWidth >= tcEL.scrollWidth - 10
    })
  },

  methods: {
    changeShowOp (index) {
      // console.log('index', index, this.oldIndex)
      if (index === this.oldIndex) return
      this.$nextTick(() => {
        this.$el.querySelector('.table-op').style.visibility = 'visible'
        this.opTop = this.$el.querySelector('.table-op').offsetTop
        this.oldIndex = index
      })
    },
    onscroll (e) {
      const scrollTop = e.target.scrollTop
      const clientHeight = e.target.clientHeight
      const scrollHeight = e.target.scrollHeight
      if (scrollTop + clientHeight * 2 + 50 > scrollHeight) {
        this.$emit('loadingData')
        if (!this.loading) {
          this.$emit('load')
        }
      }
      this.$emit('setScrollTopLeft', { scrollTop, scrollLeft: e.target.scrollLeft })
    },
    handleScroll (e) {
      if (this.$el.querySelector('.table-op')) {
        // console.log(e.target.scrollTop.toFixed(2), this.opTop)
        if (e.target.scrollTop > this.opTop - 3) {
          this.$el.querySelector('.table-op').style.visibility = 'hidden'
        } else {
          this.$el.querySelector('.table-op').style.visibility = 'visible'
        }
      }
      this.$emit('horizontalSlide', {
        toLeft: e.target.scrollLeft <= 10,
        toRight: e.target.scrollLeft + e.target.clientWidth >= e.target.scrollWidth - 10
      })
      const table = this.$el.querySelector('table')
      if (e.target.scrollLeft > 0) {
        table.className = 'has-fix'
      } else {
        table.className = ''
      }
      this.onscrollEvent(e)
    },
    handleScrollTop () {
      this.$refs['table-container'].scrollTop = 0
    },
    handleSlot (slotName, row) {
      const slot = this.$scopedSlots[slotName]
      if (slot) {
        return slot(row)
      }
    },
    handleTouchend (e) {
      // const tcEL = this.$el.querySelector('.table-container')
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
      <div class="table">
        <div ref="table-container" class="table-container" onscroll={this.handleScroll} ontouchend={this.handleTouchend}>
          <table>
            <TableColgroup columns={this.column} />
            <TableHeader columns={this.column}
              settingBtn={this.settingBtn}
              sortColumn={this.sortColumn}
              on={{ ...this.$listeners, clickSortBtn: this.clickSortBtn }} />
            <TableBody columns={this.column}
              data={this.data}
              scopedSlots={this.$scopedSlots}
              clientWidth={this.clientWidth}
              on={{ ...this.$listeners, 'change-showOp': this.changeShowOp }} />
          </table>
          {this.data.length === 0 && this.handleSlot('empty')}
          {this.data.length !== 0 && this.lastHeight && <div class="td-height"></div>}
        </div>
      </div>
    )
  }
}
