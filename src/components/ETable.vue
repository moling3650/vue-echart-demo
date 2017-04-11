<template>
  <div class="e-table">
    <table class="table">
      <thead>
        <tr>
          <th>工单</th>
          <th>成品</th>
          <th>计划</th>
          <th>达成</th>
          <th>达成率</th>
          <th>直通率</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>A001</td>
          <td>负极极片</td>
          <td>10000</td>
          <td>7600</td>
          <td>76%</td>
          <td>97%</td>
        </tr>
        <tr>
          <td>A001</td>
          <td>正极极片</td>
          <td>10000</td>
          <td>8000</td>
          <td>80%</td>
          <td>99%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'ETable'
  }
</script>

<style lang="css" scoped>
  /* Border styles */
  table {
    font-family: arial;
    max-width: 100%;
    background-color: transparent;
    border-collapse: collapse;
    border-spacing: 0;
  }

  .table {
    width: 100%;
    margin-bottom: 20px;
    border: 1px solid #aaa;
  }

  .table th,
  .table td {
    font-weight: normal;
    font-size: 12px;
    padding: 5px 15px;
    line-height: 20px;
    text-align: left;
    vertical-align: middle;
    border-top: 1px solid #aaa;
  }

  .table th:not(:last-child),
  .table td:not(:last-child) {
    border-right: 1px solid  #aaa;
  }

  .table thead th {
    font-weight: bold;
    background: #bfdbff;
    vertical-align: bottom;
  }
  .table tbody > tr:nth-child(even) > td,
  .table tbody > tr:nth-child(even) > th {
    background-color: #f9f9f9;
  }
  .table .t-small {
    width: 5%;
  }
  .table .t-medium {
    width: 15%;
  }
  .table .t-status {
    font-weight: bold;
  }
  .table .t-active {
    color: #46a546;
  }
  .table .t-inactive {
    color: #e00300;
  }
  .table .t-draft {
    color: #f89406;
  }
  .table .t-scheduled {
    color: #049cdb;
  }

  .table th:nth-child(n), .table td:nth-child(n) {
    width: 20%;
  }

  .table th:nth-child(n+3), .table td:nth-child(n+3) {
    width: 15%;
    text-align: center;
  }
</style>
