<template>
  <div id="app">
    <div>
      <e-bar width="50%" height="200px"></e-bar>
      <e-table></e-table>
    </div>
    <div>
      <e-line width="50%" height="200px" title="车间NPH推移" api="GetNPH"></e-line>
      <e-line width="50%" height="200px" title="车间不良推移" api="GetDrate"></e-line>
    </div>
    <div>
      <bar width="40%" height="200px" title="不良现象分布" api="GetNgCode"></bar>
      <bar width="40%" height="200px" title="不良原因分布" api="GetReasonCode"></bar>
      <e-pie width="20%" height="200px"></e-pie>
    </div>
  </div>
</template>

<script>
import Bar from './components/Bar'
import ETable from './components/ETable'
import ELine from './components/ELine'
import EPie from './components/EPie'
import EBar from './components/EBar'

export default {
  name: 'app',
  components: {
    Bar,
    ETable,
    ELine,
    EPie,
    EBar
  }
}
</script>

<style>
  #app {
    font-size: 0;
  }

  .e-bar {
    display: inline-block;
  }

  .e-table {
    float: right;
    display: inline-block;
    vertical-align: top;
  }

  .e-line {
    display: inline-block;
  }

  .bar {
    display: inline-block;
  }

  .e-pie {
    display: inline-block;
  }
</style>
