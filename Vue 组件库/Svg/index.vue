<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return `svg-icon${this.className}`
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style scoped>
  .svg-icon {
    overflow: hidden;
    width: 100%;
    height: 100%;
    fill: currentColor;
    vertical-align: -0.15em;
  }
</style>
