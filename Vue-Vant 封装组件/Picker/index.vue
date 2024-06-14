<template>
  <van-popup v-model="show" round position="bottom">
    <van-picker
      show-toolbar
      value-key="label"
      :default-index="defaultIndex"
      :columns="columns"
      @cancel="handleCancel"
      @confirm="handleConfirm"
    />
  </van-popup>
</template>

<script>
export default {
  name: 'Picker',

  props: {
    value: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    current: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Number | String,
      default: 0
    }
  },

  computed: {
    show: {
      get () {
        return this.value
      },
      set (e) {
        this.$emit('input', e)
      }
    },
    defaultIndex () {
      return this.columns.findIndex(item => item.value === this.current)
    }
  },

  methods: {
    handleCancel () {
      this.$emit('cancel')
    },

    handleConfirm (e) {
      this.$emit('confirm', e)
    }
  }
}
</script>
