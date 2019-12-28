<template>
<div>
  <div id="right-main-title">
    <div id="host-title">日志接入</div>
    <div class='menu-button'>
      <div class='action-button'><button class="action-button-publish">接入</button></div>
      <div class='action-button'><button class="action-button-restart">启动</button></div>
      <div class='action-button'><button class="action-button-scale">停止</button></div>
      <div class='action-button'><button class="action-button-delete">删除</button></div>
      <div id="store-search">
        <div class="input-group">
          <input type="text" class="form-control">
          <span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>
        </div>
      </div>
    </div>
  </div>
  <div id="right-main-content">
      <div class="cluster-list">
        <table class="table">
          <thead>
            <tr>
              <td ><input @click="chose_cancel_all" type="checkbox"></td>
              <td >主机地址</td>
              <td >备注</td>
              <td >采集代理</td>
              <td >采集文件数</td>
              <td >流量大小/每分</td>
              <td >接入时间</td>
              <td >启动时间</td>
              <td >采集器状态</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cluster in clusters">
              <td><input type="checkbox" ref="mybox"></td>
              <td><router-link :to="{ name: 'app_detail', params: {'name':'web01'} }">{{cluster.ID}}</router-link></td>
              <td>{{cluster.name}}</td>
              <td>filebeat</td>
              <td>{{cluster.nodes}}</td>
              <td>{{cluster.nodes}}KB</td>
              <td>{{cluster.createtime}}</td>
              <td>{{cluster.createtime}}</td>
              <td v-if="cluster.status == 'running'"><span class="running">运行中</span></td>
              <td v-else><span class="unknown">已停止</span></td>
            </tr>
          </tbody>
        </table>
    </div>
    <paging></paging>
  </div>

</div>

</template>

<script>
import paging from './common/paging'
let clusters = [
{ID:'172.16.149.10',name:'DBM前端',createtime:'2018-05-01 14:36:49',nodes:'3',status:'running'},
{ID:'172.16.149.11',name:'Portal门户',createtime:'2018-05-01 14:36:49',nodes:'3',status:'unknown'},
        ]
export default {
  name: 'dashboard',
  components:{
    paging,
  },
  data () {
    return {
      name:'yangxu',
      clusters:clusters,
    }
  },
  methods:{
    chose_cancel_all:function(event){
      let els = (this.$refs.mybox)
      for (let i = 0; i < els.length; i++) {
        if(event.currentTarget.checked){
          els[i].checked = true
        }else{
          els[i].checked = false
        }
      }
    }
  }
}
</script>

<style scoped>
@import './common/table.css';
a{
  color:#333;
  text-decoration: underline;
}

#content-menu{
  position: fixed;
  top: 78px;
  height:60px;
  left: 220px;
  right: 0;
  background-color: #fff;
  border-bottom: 1px solid #e1e1e1;
  font-size: 18px;
  z-index: 5;
}
.menu-button,.action-button,#host-title,#store-search{
  display: inline-block;
}
#host-title{
  margin:17px 30px;
  font-size:20px;
  font-weight: 600;
}

.menu-button{
  margin-left: 468px;
}
.action-button{
  margin-right:10px;
}
.action-button button{
  border: none;
  font-size: 16px;
  color: white;
}
.action-button-publish,.action-button-restart,.action-button-scale{
  background-color: #3497DA;
}
.action-button-delete{
  background-color: #f26c4b;
}

#cluster{
  position: fixed;
  top: 138px;
  left: 220px;
  right: 0;
  background-color: #fff;
  border-bottom: 1px solid #e1e1e1;
  z-index: 5;
}
.cluster-list{
  margin: 20px;
}

#store-search{
  width:250px;
  vertical-align: middle;
  margin-left: 10px;
}
#store-search input{
  height: 30px;
}

input[type=checkbox]{
    cursor: pointer;
    height: 1em;
    line-height: 1.25em;
    width: 1.25em;
}

.status-active{
  background-color: #e6f9ee;
  border: 1px solid #87e3ae;
  padding: 1px 5px;
  color:#27AA5E;;
}
.status-failed{
  background-color: #F15354;
  border: 1px solid #F15354;
  padding: 1px 5px;
  color:white;
}
.running,.unknown{
  color: white;
  padding: .25em .6em;
  font-size: 12px;
  font-weight: 400;
  border-radius: .25em;
}
.running{
  background-color: #5cb85c;
}
.unknown{
  background-color: #ddd;
}
</style>
