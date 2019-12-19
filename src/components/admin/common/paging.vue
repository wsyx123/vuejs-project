<template>
<div>
  <div class='paging'>
    <div>
      每页显示
      <select>
        <option>20</option>
        <option>50</option>
        <option>100</option>
      </select>
      共<span>{{total}}</span>条记录
    </div>
    <div class='p-action'>
      <span class='page-action page-action-backward'><i class="glyphicon glyphicon-step-backward"></i></span>
      <span class='page-action page-action-left'><i class="glyphicon glyphicon-chevron-left"></i></span>
      <span class='page-number'>1</span>/<span class='page-total'>1</span>
      <span class='page-action page-action-right'><i class="glyphicon glyphicon-chevron-right"></i></span>
      <span class='page-action page-action-forward'><i class="glyphicon glyphicon-step-forward"></i></span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props:['total']

}
</script>

<style scoped>
.label-warning,.label-normal {
    padding: .25em .6em;
    color: white;
    border-radius: .25em;
    font-size: 12px;
}
.label-warning{
  background-color: #ff8c19;
}
.label-normal{
  background-color: #33FF33;
}
.paging div{
  margin: 20px;
  display: inline-block;
}

.p-action{
  margin-left: 725px;
}
.page-action{
  display: inline-block;
  padding: 5px;
  margin: 0px 5px;
  background-color: #efefef;
  cursor: pointer;
  color: #0099FF;
}
.page-action-backward,.page-action-left{
  cursor: not-allowed;
}
.page-number{
  color: #0099FF;
}
</style>
