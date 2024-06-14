import './index.scss'
import { throttle } from '@/utils/utils'
import store from '@/store'
import { mapGetters } from 'vuex'

export default {
  name: 'Table',
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
    },
    floatTableHead: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showIndex: -1
    }
  },
  computed: {
    ...mapGetters({
      isWhite: 'baseInfo/isWhite'
    })
  },
  methods: {
    clickSettingBtn () {
      this.$router.push({ path: '/trade/list-setting', query: { buysellCurrent: 'hold' } })
    },
    handleClick (index, row) {
      if (this.showIndex === index) {
        this.showIndex = -1
      } else {
        this.showIndex = index
      }
      this.$emit('on-click', row)
    },
    clickSortBtn (slot) {
      this.$emit('clickSortBtn', slot)
    },
    handleHead () {
      const fromWhere = store.getters['common/fromWhere']
      const channel = store.getters['loginData/channel']
      const homeTheadTopClass = (fromWhere === 'details' || channel !== 'DYH5' || this.$route.path === '/') ? 'fix-to-top-nav' : 'fix-to-top'
      return (
        <div>
          {/* 首页thead吸顶 */}
          {this.floatTableHead && <thead class={homeTheadTopClass}>
            <tr class="flex no-wrap">
              {this.column.map((col, index) => {
                if (col.slot === 'a5') { return }
                return (
                  <th class="flex pos-rel" key={col.label} style={{ fixed: col.fixed, flex: col.flex }}
                    onclick={() => {
                      (!this.settingBtn || col.fixed !== 'left') &&
                      this.clickSortBtn(col.slot)
                    }}
                  >
                    {/* <div>{col.label}</div> */}
                    <span onclick={() => {
                      this.settingBtn && col.fixed === 'left' &&
                      this.clickSortBtn(col.slot)
                    }}>{col.label}</span>

                    {this.isWhite && this.sortColumn.show && <div class="icon-table-sortbtn-normalTable">
                      {this.sortColumn.slot === col.slot &&
                        (this.sortColumn.dir === 'down'
                          ? <Svg iconClass="icon-table-sortdown" class="icon-table-sort" />
                          : <Svg iconClass="icon-table-sortdown" class="icon-table-sort icon-table-sortup" />)}
                      {this.sortColumn.slot !== col.slot &&
                        <Svg iconClass="icon-table-nosort" class="icon-table-sort" />}
                    </div>}
                    {!this.isWhite && this.sortColumn.show && <div class="icon-table-sortbtn-normalTable">
                      {this.sortColumn.slot === col.slot &&
                        (this.sortColumn.dir === 'down'
                          ? <Svg iconClass="icon-table-sortdown-black" class="icon-table-sort" />
                          : <Svg iconClass="icon-table-sortdown-black" class="icon-table-sort icon-table-sortup" />)}
                      {this.sortColumn.slot !== col.slot &&
                        <Svg iconClass="icon-table-nosort-black" class="icon-table-sort" />}
                    </div>}

                    {this.settingBtn && index === 0 &&
                      <i class="icon icon-shezhi1 right-part" onclick={this.clickSettingBtn} />}
                  </th>
                )
              })}
            </tr>
          </thead>}
          <thead class="home-thead">
            <tr class="flex no-wrap">
              {this.column.map((col, index) => {
                if (col.slot === 'a5') { return }
                return (
                  <th class="flex pos-rel" key={col.label} style={{ fixed: col.fixed, flex: col.flex }}
                    onclick={() => {
                      col.slot !== 'cancel' && (!this.settingBtn || col.fixed !== 'left') &&
                      this.clickSortBtn(col.slot)
                    }}
                  >
                    {/* <div>{col.label}</div> */}
                    <span onclick={() => {
                      col.slot !== 'cancel' && this.settingBtn && col.fixed === 'left' &&
                      this.clickSortBtn(col.slot)
                    }}>{col.label}</span>

                    {col.slot !== 'cancel' && this.isWhite && this.sortColumn.show && <div class="icon-table-sortbtn-normalTable">
                      {this.sortColumn.slot === col.slot &&
                        (this.sortColumn.dir === 'down'
                          ? <Svg iconClass="icon-table-sortdown" class="icon-table-sort" />
                          : <Svg iconClass="icon-table-sortdown" class="icon-table-sort icon-table-sortup" />)}
                      {this.sortColumn.slot !== col.slot &&
                        <Svg iconClass="icon-table-nosort" class="icon-table-sort" />}
                    </div>}
                    {col.slot !== 'cancel' && !this.isWhite && this.sortColumn.show && <div class="icon-table-sortbtn-normalTable">
                      {this.sortColumn.slot === col.slot &&
                        (this.sortColumn.dir === 'down'
                          ? <Svg iconClass="icon-table-sortdown-black" class="icon-table-sort" />
                          : <Svg iconClass="icon-table-sortdown-black" class="icon-table-sort icon-table-sortup" />)}
                      {this.sortColumn.slot !== col.slot &&
                        <Svg iconClass="icon-table-nosort-black" class="icon-table-sort" />}
                    </div>}

                    {this.settingBtn && index === 0 &&
                      <i class="icon icon-shezhi1 right-part" onclick={this.clickSettingBtn} />}
                  </th>
                )
              })}
            </tr>
          </thead>
        </div>
      )
    },
    handleSlot (slotName, row) {
      const slot = this.$scopedSlots[slotName]
      if (slot) {
        return slot(row)
      }
    },
    handleBody () {
      return (
        <tbody>
          {this.data.map((row, index) => {
            return (
              <div>
                <tr class={['flex flex-wrap-nowrap', row.markColor]} key={row.id} onclick={() => this.handleClick(index, row)}>
                  {this.column.map(col => {
                    if (col.slot === 'a5') { return }
                    return (
                      <td class="flex" key={col.label} style={{ flex: col.flex }}>
                        <div class="cell">
                          {this.handleSlot(col.slot, row)}
                        </div>
                      </td>
                    )
                  })}
                </tr>
                {row.remark && row.remark !== '' && <div class={['remark-info border-bottom flex-align-center p-lr-30', row.markColor]}>备注：{row.remark}</div>}
                {this.showIndex === index && this.handleSlot('op', row)}
              </div>
            )
          })}
        </tbody>
      )
    },
    onscroll (e) {
      const scrollTop = e.target.scrollTop
      const clientHeight = e.target.clientHeight
      const scrollHeight = e.target.scrollHeight
      if (scrollTop + clientHeight + 240 > scrollHeight) {
        if (!this.loading) {
          this.$emit('load')
        }
      }
      if (scrollTop === 0) {
        this.$emit('scrollToTop')
      }
    },
    handleScrollTop () {
      this.$refs['scroll-body'].scrollTop = 0
    }
  },

  render () {
    return (
      <div class="dy-table">
        <div>
          <table>
            {this.handleHead()}
          </table>
        </div>
        <div ref="scroll-body" class="scroll-body" onscroll={throttle(this.onscroll, 300)}>
          <table>
            {this.handleBody()}
          </table>
          {this.data.length === 0 && this.handleSlot('empty')}
          {this.data.length !== 0 && this.lastHeight && <div class="td-height"></div>}
        </div>
      </div>
    )
  }
}
