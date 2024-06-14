import { mapGetters } from 'vuex'

export default {
  name: 'BsTableHeader',

  props: {
    columns: {
      type: Array,
      default: () => ([])
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

  computed: {
    ...mapGetters({
      isWhite: 'baseInfo/isWhite'
    })
  },

  methods: {
    clickSettingBtn () {
      this.$router.push({ path: '/trade/list-setting', query: { buysellCurrent: 'hold' } })
    },
    clickSortBtn (slot) {
      this.$emit('clickSortBtn', slot)
    }
  },

  render () {
    return (
      <thead class="bs-table-thead">
        <tr class="no-wrap">
          {this.columns.map((column, index) => {
            const classStr = column.fixed === 'left' ? 'fix-left pos-rel' : 'pos-rel'

            const styles = { left: 0 }
            return (
              <th class={classStr} style={styles} onclick={() => {
                (!this.settingBtn || column.fixed !== 'left') &&
                  this.clickSortBtn(column.slot)
              }}>
                <span onclick={() => {
                  this.settingBtn && column.fixed === 'left' &&
                  this.clickSortBtn(column.slot)
                }}>{column.label}</span>

                {this.isWhite && this.sortColumn.show && <div class="icon-table-sortbtn">
                  {this.sortColumn.slot === column.slot &&
                    (this.sortColumn.dir === 'down'
                      ? <Svg iconClass="icon-table-sortdown" class="icon-table-sort" />
                      : <Svg iconClass="icon-table-sortdown" class="icon-table-sort icon-table-sortup" />)}
                  {this.sortColumn.slot !== column.slot &&
                    <Svg iconClass="icon-table-nosort" class="icon-table-sort" />}
                </div>}
                {!this.isWhite && this.sortColumn.show && <div class="icon-table-sortbtn">
                  {this.sortColumn.slot === column.slot &&
                    (this.sortColumn.dir === 'down'
                      ? <Svg iconClass="icon-table-sortdown-black" class="icon-table-sort" />
                      : <Svg iconClass="icon-table-sortdown-black" class="icon-table-sort icon-table-sortup" />)}
                  {this.sortColumn.slot !== column.slot &&
                    <Svg iconClass="icon-table-nosort-black" class="icon-table-sort" />}
                </div>}

                {this.settingBtn && column.fixed === 'left' &&
                  <i class="icon icon-shezhi1 right-part" onclick={this.clickSettingBtn} />}
              </th>
            )
          })}
        </tr>
      </thead>
    )
  }
}
