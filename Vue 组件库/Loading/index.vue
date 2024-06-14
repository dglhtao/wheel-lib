<template>
  <div class="dy-loading" v-if="show">
    <div class="loading-box">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      show: false
    }
  }
}
</script>

<style lang="scss" scoped>
.dy-loading {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .loading-box {
    margin: 100px auto;
    width: 40px;
    height: 40px;
    animation-name: spinner;
    animation-duration: 1s;
    animation-delay: 0;
    animation-timing-function: steps(12);
    animation-iteration-count: infinite;
    animation-play-state: running;
    .dot {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: #333333;
      &::before {
        content: '';
        display: block;
        margin: 0 auto;
        width: 2px;
        height: 25%;
        background: currentColor;
        border-radius: 40%;
      }
    }
    @for $i from 1 through 12 {
      .dot:nth-child(#{$i}) {
        transform: rotate(30deg * $i);
        opacity: 1 - 0.0625 * $i;
      }
    }
    @keyframes spinner {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(1turn);
      }
    }
  }
}
</style>
