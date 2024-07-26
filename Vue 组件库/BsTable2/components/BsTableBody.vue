<template>
  <tbody class="bs-table2-tbody">
    <tr style="position: absolute;" v-for="(row, index) in dataPart" :key="index" @click="handleClick(index, row)">
      <td v-for="(item, index2) in column" :key="index2" :style="{'left': 0, 'width': item.width, 'max-width': item.width}"
        :class="{'fix-left': item.fixed === 'left', 'align-left': item.align === 'left'}"
      >
        <slot :name="item.slot" v-bind="row"></slot>
      </td>
    </tr>
    <div style="position: absolute;" v-if="showIndex !== -1" class="bs-table2-op">
      <slot name="op" v-bind="showRow"></slot>
    </div>
    <div style="position: absolute;bottom: 0;" v-if="data.length !== 0 && haveSafeLine" class="td-height"></div>
    <div class="table-content-height" :style="{'height': (this.dataLen + 1) * itemHeight + 'px', }"></div>
  </tbody>
</template>
<script>
export default {
  name: 'BsTableBody',
  props: {
    column: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    haveSafeLine: {
      type: Boolean,
      default: true
    },
    startIndex: {
      type: Number,
      default: 0
    },
    showLen: {
      type: Number,
      default: 100
    },
    itemHeight: {
      type: Number,
      default: 60
    }
  },
  data () {
    return {
      showIndex: -1,
      startIndexSnap: 0,
      showRow: {},
      tableDom: null,
      advNum: 5
    }
  },
  computed: {
    dataLen () {
      return this.data.length
    },
    dataPart () {
      return this.data.slice(
        Math.max(0, this.startIndex - this.advNum),
        Math.min(this.data.length, this.startIndex + this.showLen + this.advNum)
      )
    }
  },
  watch: {
    startIndex () {
      this.render()
    }
  },
  mounted () {
    console.log('itemHeight', this.itemHeight)
    this.tableDom = document.querySelector('.bs-table2-tbody')
    this.render()
  },
  methods: {
    render () {
      const startIndex = Math.max(0, this.startIndex - this.advNum)
      const opHeight = document.querySelector('.bs-table2-op')?.clientHeight || 0
      Array.prototype.slice.call(
        this.tableDom.children,
        0,
        this.tableDom.children.length - 1
      ).forEach((item, index) => {
        const exp = (this.showIndex === -1) || (this.showIndex !== -1 && startIndex + index <= this.startIndexSnap + this.showIndex) ? 0 : 1
        item.style.top = (startIndex + index) * this.itemHeight + exp * opHeight + 'px'
      })
      if (document.querySelector('.bs-table2-op')) {
        document.querySelector('.bs-table2-op').style.top = (this.startIndexSnap + this.showIndex + 1) * this.itemHeight + 'px'
        document.querySelector('.bs-table2-op').style.transform = this.tableDom.children[0].children[0].style.transform
      }
    },
    handleClick (index, row) {
      if (this.showIndex === index) {
        this.showIndex = -1
      } else {
        this.startIndexSnap = Math.max(0, this.startIndex - this.advNum)
        this.showIndex = index
        this.showRow = row
      }
      this.$nextTick(() => {
        this.render()
      })
    }
  }
}
</script>
