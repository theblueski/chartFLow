<template>
  <IconFont
      :type="type"
      :style="{ fontSize: `${size}px`, color: color, ...styles}"
  />
</template>

<script>
import { Icon } from 'ant-design-vue'
import { iconfontUrl } from '@/constants'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: iconfontUrl
})
export default {
  name: 'myIcon',
  components: {
    IconFont
  },
  props: {
    type: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 12
    },
    color: {
      type: String
    },
    styles: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="less" >

</style>
