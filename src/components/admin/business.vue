<template>
<div>
  <div id="right-main-title">
    <div id="host-title">业务管理</div>
    <div class='menu-button'>
      <div class='action-button'><button class="action-button-publish">新增</button></div>
      <div class='action-button'><button class="action-button-scale">编辑</button></div>
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
              <td width="40"><input @click="chose_cancel_all" type="checkbox"></td>
              <td >业务名称</td>
              <td>业务简称</td>
              <td >业务运维人</td>
              <td >创建时间</td>
              <td >生命周期</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(business,index) in businesses">
              <td><input type="checkbox" ref="mybox"></td>
              <td>{{business.name}}</td>
              <td>{{business.shortname}}</td>
              <td><span v-for="(user,index) in business.users" class="label label-default">{{user.username}}</span></td>
              <td>{{business.create_time}}</td>
              <td v-if="business.life_cycle == 1"><span class="label label-primary">测试</span></td>
              <td v-if="business.life_cycle == 2"><span class="label label-success">上线</span></td>
              <td v-if="business.life_cycle == 3"><span class="label label-default">下线</span></td>
            </tr>
          </tbody>
        </table>
    </div>
    <paging :total="total"></paging>
  </div>

</div>

</template>

<script>
import paging from '@/components/common/paging'
import {getAPItoken} from '@/utils/api'
export default {
  components:{
      paging
  },
  data () {
    return {
      businesses: [],
      total : 0
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
  },
  mounted(){
    const token = sessionStorage.getItem('token');
    const bpromise = getAPItoken(API.businessAPI,token);
    bpromise.then((data) =>{
      this.businesses = data;
      this.total = data.length;
    })
  }
}
</script>

<style scoped>
@import '../common/table.css';
a{
  color:#333;
  text-decoration: underline;
}

#content-menu{
  top: 78px;
  height:60px;
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
</style>
