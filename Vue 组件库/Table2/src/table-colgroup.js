export default {
  name: 'TableColgroup',

  props: {
    columns: {
      type: Array,
      default: () => ([])
    }
  },

  render () {
    return (
      <colgroup>
        {this.columns.map(column => <col style={{ width: column.width }} />)}
      </colgroup>
    )
  }
}
