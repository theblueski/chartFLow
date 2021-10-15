<template>
  <div id="app">
    <FlowChart />
  </div>
</template>

<script>
import FlowChart from './components/flowChart'

export default {
  name: 'app',
  components: {
    FlowChart
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
  height: 100%;
}
</style>
