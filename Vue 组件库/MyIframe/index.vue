<template>
  <div class="dy-iframe" v-if="show">
    <iframe :src="url" id="dy-iframe"></iframe>
  </div>
</template>

<script>
export default {
  name: 'MyIframe',
  data () {
    return {
      show: false,
      url: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.dy-iframe {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: calc(100vh - var(--sat));
  z-index: 99;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
