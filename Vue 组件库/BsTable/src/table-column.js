export default {
  name: 'BsTableColumn',

  props: {
    columns: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    row: {
      type: Object,
      required: true
    },
    showIndex: {
      type: Number,
      required: true
    }
  },

  methods: {
    handleSlot (slotName, row) {
      const slot = this.$scopedSlots[slotName]
      if (slot) {
        return slot(row)
      }
      return row[slotName]
    },
    handleClick (index, row) {
      if (this.showIndex === index) {
        this.$emit('on-index', -1)
      } else {
        this.$emit('on-index', index)
      }
      this.$emit('on-click', row)
    }
  },

  render () {
    return (
      <tr onclick={() => this.handleClick(this.index, this.row)}>
        {this.columns.map(column => {
          const classStr = column.fixed === 'left' ? 'fix-left' : ''

          const styles = { left: 0 }
          return (
            <td class={classStr} style={styles}>
              {this.handleSlot(column.slot, this.row)}
            </td>
          )
        })}
      </tr>
    )
  }
}
