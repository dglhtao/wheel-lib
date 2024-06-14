<template>
  <div class="date-picker">
    <div class="timing flex">
      <div class="flex" @click="showCalendar = true">
        <div
          :class="['select', showCalendar ? 'select-active' : '']"
          @click="showCalendar = true"
        >
          <span>{{dateText || '选择日期'}}</span>
        </div>
      </div>
    </div>

    <van-calendar
      v-model="showCalendar"
      :default-date="defaultDate"
      type="range"
      :show-mark="false"
      :show-title="false"
      color="#fd263f"
      @confirm="onConfirm"
      :minDate="new Date(2015, 0, 1)"
      :maxDate="new Date(2025, 0, 31)"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'DatePicker',

  props: {
    onDatePicker: {
      type: Function,
      default: null
    },
    defaultDate: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      date: '',
      showCalendar: false
    }
  },

  computed: {
    dateText () {
      return `${dayjs(this.defaultDate[0]).format('YYYY-MM-DD')} - ${dayjs(this.defaultDate[1]).format('YYYY-MM-DD')}`
    }
  },

  methods: {
    onConfirm (date) {
      const [start, end] = date

      if (this.onDatePicker) { this.onDatePicker(date) }

      this.showCalendar = false
      this.date = `${dayjs(start).format('YYYY-MM-DD')} - ${dayjs(end).format('YYYY-MM-DD')}`
    }
  }
}
</script>

<style lang="scss">
  .date-picker {
    .van-popup {
      background-color: var(--color8);
    }
    .van-calendar {
      background-color: var(--color11);
      color: var(--color1);
      box-shadow: none;
    }
    .van-calendar__header-subtitle {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .van-calendar__footer {
      padding: 0 30px;
    }

    .van-button {
      height: 96px;
      border-radius: 8px;
    }
  }

  .timing {
    height: 80px;
    // background-color: #fff;
    background-color: var(--color8);
    color: var(--color1);
  }

  .select {
    position: relative;
    height: 80px;
    padding-right: 50px;
    font-size: 28px;
    text-align: right;
    font-weight: 500;
    // line-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::after {
      content: '';
      position: absolute;
      top: 34px;
      right: 0;
      display: block;
      width: 0;
      border: 12px solid;
      border-color: var(--color2) transparent transparent transparent;
    }
  }

  .select-active::after {
    content: '';
    position: absolute;
    right: 0;
    top: 22px;
    display: block;
    width: 0;
    border: 12px solid;
    border-color: transparent transparent var(--color2) transparent;
  }
</style>
