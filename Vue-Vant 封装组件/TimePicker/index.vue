<template>
  <div class="TimePicker">
    <van-picker
      ref="TimePicker"
      show-toolbar
      :title="'选择时间'"
      :columns="columns"
      @cancel="cancel"
      @confirm="confirm"
    />
  </div>
</template>

<script>
import { second2Time, time2Second } from '@/utils/filters'
export default {
  name: 'TimePicker',

  props: {
    time: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      columns: [
        {
          values: ['09', '10', '11', '12', '13', '14', '15'],
          defaultIndex: 0
        },
        {
          values: [
            '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14',
            '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
            '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44',
            '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'
          ],
          defaultIndex: 0
        },
        {
          values: [
            '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14',
            '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
            '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44',
            '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'
          ],
          defaultIndex: 0
        }
      ]
    }
  },

  mounted () {
    this.initDefault()
  },
  methods: {
    initDefault (time2 = this.time) {
      let time = time2
      if (time2 < 34200) { time = 34200 } else
      if (time2 > 53999) { time = 53999 }
      const indexArr = second2Time(time).split(':').map(item => Number(item))
      indexArr[0] -= 9
      this.$refs.TimePicker.setIndexes(indexArr)
      console.log('indexArr', indexArr)
      const valueArr = this.columns.map((item, index) => item.values[indexArr[index]])
      return valueArr
    },
    cancel (e) {
      this.$emit('cancel', e)
      this.initDefault()
    },
    confirm (e) {
      const e2 = this.initDefault(time2Second(e.join(':')))
      this.$emit('confirm', e2)
    }
  }
}
</script>
