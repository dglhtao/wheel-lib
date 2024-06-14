import BsTableColumn from './table-column'

export default {
  name: 'BsTableBody',

  props: {
    columns: {
      type: Array,
      default: () => ([])
    },
    data: {
      type: Array,
      required: true
    },
    clientWidth: {
      type: Number,
      required: true
    },
    haveSafeLine: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      showIndex: -1
    }
  },

  methods: {
    handleIndex (index) {
      this.showIndex = index
    },
    handleSlot (slotName, row) {
      const slot = this.$scopedSlots[slotName]
      if (slot) {
        return slot(row)
      }
      return row[slotName]
    },
    handleOp (row, index) {
      if (this.showIndex !== index) return
      this.handleSlot('op', row) && this.$nextTick(() => {
        this.$el.querySelector('.bs-table-op').style.transform = this.$el.querySelector('.fix-left').style.transform
      })
      return (
        this.handleSlot('op', row) && <div class="bs-table-op border-bottom">{this.handleSlot('op', row)}</div>
      )
    }
  },

  render () {
    return (
      <tbody class="bs-table-tbody">
        {this.data.map((row, index) => {
          return [<BsTableColumn
            columns={this.columns}
            row={row}
            index={index}
            showIndex={this.showIndex}
            scopedSlots={this.$scopedSlots}
            on={{ ...this.$listeners, 'on-index': this.handleIndex }} />, this.handleOp(row, index)]
        })}
        {this.data.length !== 0 && this.haveSafeLine && <div class="td-height"></div>}
      </tbody>
    )
  }
}
