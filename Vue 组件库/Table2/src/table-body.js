import TableColumn from './table-column'
import { isIOS } from '@/utils/utils'

export default {
  name: 'TableBody',

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
      const handleSlotValue = this.handleSlot('op', row)
      if (handleSlotValue) {
        this.$emit('change-showOp', index)
      }
      if (isIOS()) {
        return (
          handleSlotValue &&
          <div class="table-op-iOS border-bottom">
            <div class="table-op-iOS-box">{handleSlotValue}</div>
          </div>
        )
      }
      return (
        handleSlotValue && <div class="table-op border-bottom">{handleSlotValue}</div>
      )
    }
  },

  render () {
    return (
      <tbody class="table-tbody">
        {this.data.map((row, index) => {
          return [<TableColumn
            columns={this.columns}
            row={row}
            index={index}
            showIndex={this.showIndex}
            scopedSlots={this.$scopedSlots}
            on={{ ...this.$listeners, 'on-index': this.handleIndex }} />, this.handleOp(row, index)]
        })}
      </tbody>
    )
  }
}
