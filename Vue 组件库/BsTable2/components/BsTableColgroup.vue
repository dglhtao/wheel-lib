<template>
  <colgroup style="pointer-events: auto">
    <col v-for="(item, index) in column" :key="index" :style="{ width: item.width }">
  </colgroup>
</template>
<script>
export default {
  name: 'BsTableColgroup',
  props: {
    column: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>
