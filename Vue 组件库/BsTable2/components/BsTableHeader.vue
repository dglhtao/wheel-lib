<template>
  <thead class="bs-table2-thead">
    <tr class="no-wrap">
      <th
        v-for="(item, index) in column" :key="index"
        class="pos-rel" style="left: 0"
        :class="{'fix-left': item.fixed === 'left', 'align-left': item.align === 'left'}"
        @click="(!settingBtn || !item.fixed !== 'left') && clickSortBtn(item.slot)"
      >
        <span @click="settingBtn && item.fixed === 'left' &&
            clickSortBtn(item.slot)">{{ item.label }}</span>
        <div v-if="sortColumn.show && isWhite" class="icon-table-sortbtn">
          <JZSvg v-if="sortColumn.slot !== item.slot" iconClass="icon-table-nosort" class="icon-table-sort" />
          <JZSvg v-else-if="sortColumn.dir === 'down'" iconClass="icon-table-sortdown" class="icon-table-sort" />
          <JZSvg v-else iconClass="icon-table-sortdown" class="icon-table-sort icon-table-sortup" />
        </div>
        <div v-else-if="sortColumn.show && !isWhite" class="icon-table-sortbtn">
          <JZSvg v-if="sortColumn.slot !== item.slot" iconClass="icon-table-nosort-black" class="icon-table-sort" />
          <JZSvg v-else-if="sortColumn.dir === 'down'" iconClass="icon-table-sortdown-black" class="icon-table-sort" />
          <JZSvg v-else iconClass="icon-table-sortdown-black" class="icon-table-sort icon-table-sortup" />
        </div>
        <i v-if="settingBtn && item.fixed === 'left'" class="jzicon icon-shezhi1 right-part" @click="clickSettingBtn" />
      </th>
    </tr>
  </thead>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BsTableHeader',
  props: {
    column: {
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
  }
}
</script>
