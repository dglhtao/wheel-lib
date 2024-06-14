<template>
  <div class="empty">
    <div v-if="isWhite" class="empty-image">
      <img v-if="type === 'cfplan'" src="~@/assets/images/empty/cfplan-empty.png" alt="数据为空～" :class="{'half-size': halfSize}">
      <img v-else-if="type === 'hold'" src="~@/assets/images/empty/hold-empty.png" alt="数据为空～" :class="{'half-size': halfSize}">
      <img v-else-if="type === 'newSecu'" src="~@/assets/images/empty/newSecu-empty.png" alt="数据为空～" :class="{'half-size': halfSize}">
      <img v-else-if="type === 'plan'" src="~@/assets/images/empty/plan-empty.png" alt="数据为空～" :class="{'half-size': halfSize}">
      <img v-else src="~@/assets/images/empty/normal-empty.png" alt="数据为空～" :class="{'half-size': halfSize}">
      <!-- <img v-if="type === 'search'" src="~@/assets/images/empty/search-empty.png" alt="暂无搜索内容～"> -->
      <!-- <img v-else src="~@/assets/images/empty/default-empty.png" alt="数据为空～" :class="{'half-size': halfSize}"> -->
    </div>
    <div v-else class="empty-image">
      <img v-if="type === 'cfplan'" src="~@/assets/images/empty/cfplan-empty-black.png" alt="数据为空～" :class="{'half-size': halfSize}">
      <img v-else-if="type === 'hold'" src="~@/assets/images/empty/hold-empty-black.png" alt="数据为空～" :class="{'half-size': halfSize}">
      <img v-else-if="type === 'newSecu'" src="~@/assets/images/empty/newSecu-empty-black.png" alt="数据为空～" :class="{'half-size': halfSize}">
      <img v-else-if="type === 'plan'" src="~@/assets/images/empty/plan-empty-black.png" alt="数据为空～" :class="{'half-size': halfSize}">
      <img v-else src="~@/assets/images/empty/normal-empty-black.png" alt="数据为空～" :class="{'half-size': halfSize}">
      <!-- <img v-if="type === 'search'" src="~@/assets/images/empty/search-empty.png" alt="暂无搜索内容～"> -->
      <!-- <img v-else src="~@/assets/images/empty/default-empty.png" alt="数据为空～" :class="{'half-size': halfSize}"> -->
    </div>
    <div v-if="maintext !==''" class="empty-maintext flex f32c1 m-bottom-16">{{maintext}}</div>
    <div class="empty-description">
      <p class="description">{{description}}</p>
    </div>
    <div v-if="showEmptyPlan" class="m-top-48 flex">
      <div class="emptyPlan-btn flex m-left-16" :class="{'emptyPlan-btn-wgjy': ['网格交易', '追踪条件单'].includes(i.label)}" v-for="i in emptyPlan" :key="i.label" @click="handleClick(i)">
        <Svg v-if="i.label.indexOf('网格交易') !== -1" iconClass="icon-plan-fire" class="icon-plan-fire m-right-8" />
        {{i.label}}
      </div>
    </div>
  </div>
</template>

<script>
import { handlePlan } from '@/service/base'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'Empty',

  props: {
    type: {
      type: String,
      require: false,
      default: ''
    },
    maintext: {
      type: String,
      require: false,
      default: ''
    },
    description: {
      type: String,
      require: false,
      default: '数据为空～'
    },
    halfSize: {
      type: Boolean,
      require: false,
      default: false
    },
    showEmptyPlan: {
      type: Boolean,
      require: false,
      default: false
    }
  },

  data () {
    return {
      emptyPlan: [
        {
          icon: 'icon-plan-wgjy',
          label: '网格交易',
          isNew: false,
          isHot: true,
          tips: '区间买卖，波段套利',
          path: '/plan/create',
          triggerCond: 22,
          orderDirection: '0S'
        },
        {
          icon: 'icon-plan-zyzs',
          label: '止盈止损',
          isNew: false,
          isHot: false,
          tips: '给持仓设定止盈止损',
          path: '/plan/create',
          triggerCond: 13,
          orderDirection: '0S'
        },
        {
          icon: 'icon-plan-zzmr',
          label: '追踪条件单',
          isNew: false,
          isHot: true,
          tips: '追踪阶段底部',
          path: '/plan/create',
          triggerCond: 8,
          orderDirection: '0B'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      isWhite: 'baseInfo/isWhite'
    })
  },

  methods: {
    ...mapMutations({
      setIsAgainOrder: 'plan/setIsAgainOrder',
      setOrderId: 'planConfig/setOrderId'
    }),
    handleClick (item) {
      this.setOrderId('')
      this.setIsAgainOrder(true)
      handlePlan(() => {
        // this.updateLastUse(item)
        this.$router.push({
          path: item.path,
          query: {
            triggerCond: item.triggerCond,
            orderDirection: item.orderDirection
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
.empty {
  // position: relative;
  // top: 50%;
  // transform: translateY(-50%);
  // width: 100%;
  // height: fit-content;
  // // min-height: 450px;
  // align-content: center;

  .empty-image {
    width: 100%;

    img {
      width: 202px;
      margin: 0 auto;
    }
    img.half-size {
      width: 202px;
      margin: 0 auto;
    }
  }

  .empty-maintext {
    width: 100%;
  }

  .empty-description {
    width: 100%;

    .description {
      // margin: 22px 0;
      // margin-top: 40px;
      font-size: 28px;
      text-align: center;
      line-height: 40px;
      color: var(--color3);
    }
  }
  .emptyPlan-btn {
    width: 152px;
    height: 60px;
    color: var(--color2);
    background: var(--color9);
    border-radius: 30px;
    .icon-plan-fire {
      width: 32px;
      height: 32px;
    }
  }
  .emptyPlan-btn-wgjy {
    width: 176px;
  }
}
</style>
